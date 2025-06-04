import { useState } from "react";
import ProjectForm from "./ProjectForm";
import { Project } from "../../models/Project";
import { ProjectAPI } from "../../services/project-service";
import { useNavigate } from "react-router-dom";

const createEmptyProject = () => new Project({
  id: 0,
  name: "",
  description: "",
  budget: 0,
  isActive: false,
});

function NewProjectPage() {
  const [project, setProject] = useState(createEmptyProject());
  const navigate = useNavigate();

  const handleSave = async (savedProject: Project) => {
    try {
      const createdProject = await ProjectAPI.post(savedProject);

      console.log(`Project saved successfully: ${createdProject.name}`);
      navigate('/projects');

      setProject(createEmptyProject());
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  };

  const handleCancel = () => {
    setProject(createEmptyProject());
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <div className="form-container">
        <ProjectForm
          project={project}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}

export default NewProjectPage;
