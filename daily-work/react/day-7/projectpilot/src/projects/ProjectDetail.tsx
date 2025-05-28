import { Project } from './Project';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  console.log('project:', project);

  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card large">
          {project.imageUrl ? (
            <img
              className="rounded"
              src={project.imageUrl}
              alt={project.name}
            />
          ) : (
            <div className="no-image-placeholder">No image available</div>
          )}
          <section className="section dark">
            <h3 className="strong">
              <strong>{project.name}</strong>
            </h3>
            <p>{project.description}</p>
            <p>
              Budget: {project.budget.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
            </p>
            <p>
              Signed: {new Date(project.contractSignedOn).toLocaleDateString()}
            </p>
            <p>
              <mark className="active">
                {project.isActive ? 'active' : 'inactive'}
              </mark>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
