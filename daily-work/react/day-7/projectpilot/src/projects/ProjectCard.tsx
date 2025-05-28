import { Project } from './Project';
import { Link } from 'react-router';

function formatDescription(description: string) {
  return description.substring(0, 60) + '...';
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

function ProjectCard(props: ProjectCardProps) {
  const { project, onEdit, onDelete } = props;

  const handleEditClick = (projectBeingEdited: Project) => {
    onEdit(projectBeingEdited);
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete ${project.name}?`)) {
      console.log(project._id );      
      onDelete(project._id || '');
    }
  };

  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <Link to={'/projects/' + project._id}>
          <h5 className="strong">
            <strong>{project.name}</strong>
          </h5>
          <p>{formatDescription(project.description)}</p>
          <p>Budget : {project.budget.toLocaleString()}</p>
        </Link>
        <button
          className="bordered"
          onClick={() => handleEditClick(project)}
          style={{
            marginLeft: '8px',            
            border: '1px solid red',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          <span className="icon-edit"></span>
          Edit
        </button>
        <button
          className="button-danger"
          onClick={handleDeleteClick}
          style={{
            marginLeft: '8px',
            color: 'white',
            backgroundColor: 'darkred',
            border: '1px solid red',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          aria-label={`Delete project ${project.name}`}
        >
          🗑️ Delete
        </button>
      </section>
    </div>
  );
}

export default ProjectCard;
