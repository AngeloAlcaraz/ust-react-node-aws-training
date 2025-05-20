import { useState } from "react";
import { Project } from "./Project";
import type { SyntheticEvent } from "react";

interface ProjectFormProps {
    project: Project
    onSave: (project: Project) => void;
    onCancel: () => void;
}

function ProjectForm({
    project: initialProject,
    onSave,
    onCancel
}: ProjectFormProps) {

    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: '',
    });

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
        onSave(project);
    };

    function validate(project: Project) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: any = { name: '', description: '', budget: '' };
        if (project.name.length === 0) {
            errors.name = 'Name is required';
        }
        if (project.name.length > 0 && project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters.';
        }
        if (project.description.length === 0) {
            errors.description = 'Description is required.';
        }
        if (project.budget === 0) {
            errors.budget = 'Budget must be more than $0.';
        }
        return errors;
    }
    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        // if input type is checkbox use checked
        // otherwise it's type is text, number etc. so use value
        let updatedValue = type === 'checkbox' ? checked : value;

        //if input type is number convert the updatedValue string to a +number
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };

        let updatedProject: Project;
        // need to do functional update b/c
        // the new project state is based on the previous project state
        // so we can keep the project properties that aren't being edited +like project.id
        // the spread operator (...) is used to
        // spread the previous project properties and the new change
        setProject((p) => {
            updatedProject = new Project({ ...p, ...change });
            return updatedProject;
        });
        setErrors(() => validate(updatedProject));
    };

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input id="name" name="name" type="text" placeholder="enter name" autoComplete="off" value={project.name} onChange={handleChange} />
            {errors.name.length > 0 && (
                <div className="card error">
                    <p>{errors.name}</p>
                </div>
            )}

            <label htmlFor="description">Project Description</label>
            <textarea id="description" name="description" placeholder="enter description" autoComplete="off" value={project.description} onChange={handleChange} />
            {errors.description.length > 0 && (
                <div className="card error">
                    <p>{errors.description}</p>
                </div>
            )}

            <label htmlFor="budget">Project Budget</label>
            <input id="budget" name="budget" type="number" placeholder="enter budget" autoComplete="off" value={project.budget} onChange={handleChange} />
            {errors.budget.length > 0 && (
                <div className="card error">
                    <p>{errors.budget}</p>
                </div>
            )}

            <label htmlFor="isActive">Active?</label>
            <input id="isActive" name="isActive" type="checkbox" checked={project.isActive} onChange={handleChange} />

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button type="button" className="bordered medium" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default ProjectForm;