import ProjectList from './ProjectList';
import { Project } from "./Project";
import { useState, useEffect } from "react";
import { projectAPI } from './projectAPI';

function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const saveProject = async (project: Project): Promise<Project> => {
        try {
            console.log('Sending to API:', project);            // Qué envías
            const updatedProject = await projectAPI.put(project);
            console.log('Response from API:', updatedProject);  // Qué recibes

            const updatedProjects = projects.map((p: Project) =>
                p._id === project._id ? updatedProject : p
            );
            setProjects(updatedProjects);
            return updatedProject;
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            throw e;
        }
    };


    const handleDelete = async (projectId: string): Promise<void> => {
        try {
            await projectAPI.delete(projectId);
            setProjects((prev) => prev.filter((p) => p._id !== projectId));
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            throw e;
        }
    };

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(currentPage);
                setError('');
                if (currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects((prev) => [...prev, ...data]);
                }
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, [currentPage]);

    return (
        <>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse "></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}

            <ProjectList
                projects={projects}
                onSave={saveProject}
                onDelete={handleDelete}
            />

            {!loading && !error && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group fluid">
                            <button className="button default" onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
        </>
    );
}

export default ProjectsPage;
