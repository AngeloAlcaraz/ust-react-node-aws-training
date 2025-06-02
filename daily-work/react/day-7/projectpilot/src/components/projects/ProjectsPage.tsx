import ProjectList from './ProjectList';
import { Project } from '../../models/Project';
import { useState, useEffect } from "react";
import { ProjectAPI } from '../../services/project-service';

const PAGE_SIZE = 21;

type ProjectsPageProps = {
    searchText: string;
};

function ProjectsPage({ searchText }: ProjectsPageProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const handleMoreClick = () => {
        if (loading) return;

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
            setError('');
            return updatedProject;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            if (e.response?.data?.message && Array.isArray(e.response.data.message)) {
                throw e;
            }
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

    useEffect(() => {
        if (currentPage === 1) {
            setVisibleCount(PAGE_SIZE);
            setHasMore(true);
        }
    }, [currentPage]);

    const filteredProjects = projects.filter((project) => {
        const typedText = searchText.toLowerCase();

        const nameMatch = project.name?.toLowerCase().includes(typedText);
        const descriptionMatch = project.description?.toLowerCase().includes(typedText);
        const budgetMatch = project.budget?.toString().includes(typedText);

        return nameMatch || descriptionMatch || budgetMatch;
    });

    const errorMessage = searchText && filteredProjects.length === 0
        ? `No projects found for "${searchText}"`
        : undefined;
    const projectsToDisplay = searchText
        ? filteredProjects
        : filteredProjects.slice(0, visibleCount);

    return (
        <>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>                               
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="row">
                    <div className="card message-large">
                        <section>
                            <p>
                                <span className="icon icon-alert"></span>
                                {errorMessage}
                            </p>
                        </section>
                    </div>
                </div>
            )}

            <ProjectList
                projects={projectsToDisplay}
                onSave={saveProject}
                onDelete={handleDelete}
            />

            {!loading && hasMore && !searchText && visibleCount < filteredProjects.length && (
                <div className="row">
                    <div className="col-sm-12">
                        <button
                            className="button default fluid"
                            onClick={handleMoreClick}
                            disabled={loading}
                            style={{ width: '1030px' }}
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
