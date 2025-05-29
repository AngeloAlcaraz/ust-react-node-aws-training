import { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import Swal from 'sweetalert2';


interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
  onDelete: (projectId: string) => void;
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
      const isUpdate = !!projectBeingEdited?._id;

      await onSave(project);
      setProjectBeingEdited(null);

      Swal.fire({
        icon: 'success',
        title: isUpdate ? 'Project Updated' : 'Project Saved',
        text: `The project has been ${isUpdate ? 'updated' : 'created'} successfully!`,
        confirmButtonText: 'OK',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not save the project. Please try again.',
      });
      console.error(error);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      await onDelete(projectId);
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

  return <div className="row justify-content-center">{items}</div>;
}

export default ProjectList;