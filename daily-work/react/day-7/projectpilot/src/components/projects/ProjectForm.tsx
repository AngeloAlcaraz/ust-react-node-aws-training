import { useState, useEffect, type SyntheticEvent } from "react";
import { Project } from "../../models/Project";
import Swal from 'sweetalert2';

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => Promise<void>;
  onCancel: () => void;
  externalErrors?: { name?: string; description?: string; budget?: string };
}

function ProjectForm({ project: initialProject, onSave, onCancel, externalErrors = {} }: ProjectFormProps) {
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

    if (project.name.trim().length === 0) {
      errors.name = 'Name is required';
    } else if (project.name.trim().length < 3) {
      errors.name = 'Name needs to be at least 3 characters.';
    }

    if (project.description.trim().length === 0) {
      errors.description = 'Description is required.';
    }

    if (project.budget === 0 || isNaN(project.budget)) {
      errors.budget = 'Budget must be more than $0.';
    }

    return errors;
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitted(true);

    const validationErrors = validate(project);
    setErrors(validationErrors);

    if (!Object.values(validationErrors).every(e => e === '')) {
      return;
    }

    try {
      await onSave(project);

      const isUpdate = !!project._id;

      await Swal.fire({
        icon: 'success',
        title: isUpdate ? 'Project Updated' : 'Project Saved',
        text: isUpdate
          ? 'The project has been updated successfully!'
          : 'The project has been added successfully!',
        confirmButtonText: 'OK',
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.message && Array.isArray(error.response.data.message)) {
        const serverErrors: string[] = error.response.data.message;

        const newErrors = { name: '', description: '', budget: '' };
        for (const msg of serverErrors) {
          if (msg.toLowerCase().includes('name')) newErrors.name = msg;
          if (msg.toLowerCase().includes('description')) newErrors.description = msg;
          if (msg.toLowerCase().includes('budget')) newErrors.budget = msg;
        }
        setErrors(newErrors);
        return;
      }      
    }
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

  const combinedErrors = {
    name: errors.name || externalErrors.name || '',
    description: errors.description || externalErrors.description || '',
    budget: errors.budget || externalErrors.budget || '',
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Project Name</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Enter Name"
        autoComplete="off"
        value={project.name}
        onChange={handleChange}
      />
      {isSubmitted && combinedErrors.name && (
        <div className="card error">
          <p>{combinedErrors.name}</p>
        </div>
      )}

      <label htmlFor="description">Project Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Enter Description"
        autoComplete="off"
        value={project.description}
        onChange={handleChange}
      />
      {isSubmitted && combinedErrors.description && (
        <div className="card error">
          <p>{combinedErrors.description}</p>
        </div>
      )}

      <label htmlFor="budget">Project Budget</label>
      <input
        id="budget"
        name="budget"
        type="number"
        placeholder="Enter budget"
        autoComplete="off"
        value={project.budget}
        onChange={handleChange}
      />
      {isSubmitted && combinedErrors.budget && (
        <div className="card error">
          <p>{combinedErrors.budget}</p>
        </div>
      )}

      <div className="checkbox-group">
        <label htmlFor="isActive">Active?</label>
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          checked={project.isActive}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <button className="primary bordered medium" type="submit">Save</button>
        <span></span>
        <button type="button" className="bordered medium" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
