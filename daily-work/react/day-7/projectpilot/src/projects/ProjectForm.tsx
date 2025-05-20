import type { SyntheticEvent } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
    onSave: (project: Project) => void;
    onCancel: () => void;
}

function ProjectForm({ onSave, onCancel }: ProjectFormProps) {

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        onSave(new Project({ name: 'Updated Project' }));
    };

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input id="name" name="name" type="text" placeholder="enter name" autoComplete="off" />

            <label htmlFor="description">Project Description</label>
            <textarea id="description" name="description" placeholder="enter description" autoComplete="off" />

            <label htmlFor="budget">Project Budget</label>
            <input id="budget" name="budget" type="number" placeholder="enter budget" autoComplete="off" />

            <label htmlFor="isActive">Active?</label>
            <input id="isActive" name="isActive" type="checkbox" />

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button type="button" className="bordered medium" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default ProjectForm;