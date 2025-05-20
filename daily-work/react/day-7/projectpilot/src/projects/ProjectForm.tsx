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

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        onSave(project);
    };

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
    };


    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input id="name" name="name" type="text" placeholder="enter name" autoComplete="off" value={project.name} onChange={handleChange} />

            <label htmlFor="description">Project Description</label>
            <textarea id="description" name="description" placeholder="enter description" autoComplete="off" value={project.description} onChange={handleChange}/>

            <label htmlFor="budget">Project Budget</label>
            <input id="budget" name="budget" type="number" placeholder="enter budget" autoComplete="off" value={project.budget} onChange={handleChange}/>

            <label htmlFor="isActive">Active?</label>
            <input id="isActive" name="isActive" type="checkbox" checked={project.isActive} onChange={handleChange}/>

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button type="button" className="bordered medium" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default ProjectForm;