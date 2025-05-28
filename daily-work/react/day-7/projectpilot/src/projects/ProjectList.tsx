import { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;        // No async/Promise
  onDelete: (projectId: string) => void;     // No async/Promise
}

function ProjectList({ projects, onSave, onDelete }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const cancelEditing = () => {
    setProjectBeingEdited(null);
  };

  const handleSaveLocal = async (project: Project) => {
    try {
      await onSave(project);      // Aunque el tipo no es async, usas await para permitir que onSave devuelva Promise si quiere
      setProjectBeingEdited(null); // Cierra el formulario después de guardar
    } catch (error) {
      alert('Could not save the project. Please try again.');
      console.error(error);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      await onDelete(projectId);
      // Opcional: si el proyecto que se está editando fue eliminado, cancelamos edición
      if (projectBeingEdited?._id === projectId) {
        setProjectBeingEdited(null);
      }
    } catch (error) {
      alert('Could not delete the project. Please try again.');
      console.error(error);
    }
  };

  const items = projects.map(project => {
    console.log('Rendering ProjectCard for:', project);
    return (
      <div key={project._id} className="cols-sm">
        {projectBeingEdited && project._id === projectBeingEdited._id ? (
          <ProjectForm
            project={projectBeingEdited}
            onSave={handleSaveLocal}
            onCancel={cancelEditing}
          />
        ) : (
          <ProjectCard
            project={project}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    );
  });


  return <div className="row">{items}</div>;
}

export default ProjectList;
