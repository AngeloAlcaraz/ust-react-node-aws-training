import ProjectList from './ProjectList';
import { Project } from "./Project";
import { useState, useEffect } from "react";
import { ProjectAPI } from "./ProjectAPI";

const PAGE_SIZE = 20;

function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const handleMoreClick = () => {
        const nextCount = visibleCount + PAGE_SIZE;

        if (nextCount <= projects.length) {
            setVisibleCount(nextCount);
        } else {
            setCurrentPage((prev) => prev + 1);
            setVisibleCount(nextCount);
        }
    };

    const saveProject = async (project: Project): Promise<Project> => {
        try {
            const updatedProject = await ProjectAPI.put(project);
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
            await ProjectAPI.delete(projectId);
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
                const data = await ProjectAPI.get(currentPage, PAGE_SIZE);
                setError('');

                if (data.length < PAGE_SIZE) {
                    setHasMore(false);
                }

                setProjects((prev) => {
                    const existingIds = new Set(prev.map((p) => p._id));
                    const newProjects = data.filter((p) => !existingIds.has(p._id));
                    return [...prev, ...newProjects];
                });
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
                projects={projects.slice(0, visibleCount)}
                onSave={saveProject}
                onDelete={handleDelete}
            />

            {!loading && hasMore && visibleCount < projects.length && (
                <div className="row">
                    <div className="col-sm-12">
                        <button
                            className="button default fluid"
                            onClick={handleMoreClick}
                            disabled={loading}
                            style={{ width: '100%' }}
                        >
                            More...
                        </button>
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
