interface ProjectFormProps {
    onCancel: () => void;
}


function ProjectForm({onCancel}: ProjectFormProps ) {
    return (
        <form className="input-group vertical">
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