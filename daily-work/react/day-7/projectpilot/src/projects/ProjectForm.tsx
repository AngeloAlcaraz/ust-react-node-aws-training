import { useState, useEffect, type SyntheticEvent } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

function ProjectForm({ project: initialProject, onSave, onCancel }: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    budget: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setProject(initialProject);
    setErrors({ name: '', description: '', budget: '' });
    setIsSubmitted(false);
  }, [initialProject]);

  const validate = (project: Project) => {
    const errors = { name: '', description: '', budget: '' };

    if (project.name.length === 0) {
      errors.name = 'Name is required';
    } else if (project.name.length < 3) {
      errors.name = 'Name needs to be at least 3 characters.';
    }

    if (project.description.length === 0) {
      errors.description = 'Description is required.';
    }

    if (project.budget === 0) {
      errors.budget = 'Budget must be more than $0.';
    }

    return errors;
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitted(true);

    const validationErrors = validate(project);
    setErrors(validationErrors);

    if (!Object.values(validationErrors).every(e => e === '')) {
      return; 
    }

    onSave(project);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { type, name, value } = event.target;

    let updatedValue: string | number | boolean;
    if (type === "checkbox") {
      const target = event.target as HTMLInputElement;
      updatedValue = target.checked;
    } else if (type === "number") {
      updatedValue = Number(value);
    } else {
      updatedValue = value;
    }

    const updatedProject = new Project({ ...project, [name]: updatedValue });
    setProject(updatedProject);
    
    if (isSubmitted) {
      setErrors(validate(updatedProject));
    }
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="enter name"
        autoComplete="off"
        value={project.name}
        onChange={handleChange}
      />
      {isSubmitted && errors.name && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor="description">Project Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="enter description"
        autoComplete="off"
        value={project.description}
        onChange={handleChange}
      />
      {isSubmitted && errors.description && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}

      <label htmlFor="budget">Project Budget</label>
      <input
        id="budget"
        name="budget"
        type="number"
        placeholder="enter budget"
        autoComplete="off"
        value={project.budget}
        onChange={handleChange}
      />
      {isSubmitted && errors.budget && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}

      <label htmlFor="isActive">Active?</label>
      <input
        id="isActive"
        name="isActive"
        type="checkbox"
        checked={project.isActive}
        onChange={handleChange}
      />

      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span></span>
        <button type="button" className="bordered medium" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;