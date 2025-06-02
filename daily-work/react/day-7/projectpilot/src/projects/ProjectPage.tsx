import { useEffect, useState } from 'react';
import { ProjectAPI } from './projectAPI';
import ProjectDetail from './ProjectDetail';
import { Project } from './Project';
import { useParams } from 'react-router';

function ProjectPage() {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    ProjectAPI
      .find(id)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <>
        <h1>Project Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        <div className="row">
          {error && (
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span> {error}
                </p>
              </section>
            </div>
          )}
        </div>

        {project && (
          <div className="center-content">
            <ProjectDetail project={project} />
          </div>
        )}
      </>
    </div>
  );
}

export default ProjectPage;