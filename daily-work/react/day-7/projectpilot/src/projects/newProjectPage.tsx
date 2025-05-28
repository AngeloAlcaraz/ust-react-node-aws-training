import { useState } from "react";
import ProjectForm from "./ProjectForm";
import { Project } from "./Project";
import { ProjectAPI } from "./ProjectAPI";
import { useNavigate } from "react-router";

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
    }
  };

  const handleCancel = () => {
    setProject(createEmptyProject());   
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <ProjectForm
        project={project}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default NewProjectPage;
