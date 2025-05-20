import PropTypes from 'prop-types';
import { Project } from './Project';
import ProjectCard from './ProjectCard';

type ProjectListProps = {
  projects: Project[];
};

function ProjectList({ projects }: ProjectListProps) {
  const items = projects.map(project => (
    <div key={project.id} className="cols-sm">      
      <ProjectCard project={project} />
    </div>
  ));
  return <div className="row">{items}</div>;

}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired
};

export default ProjectList;