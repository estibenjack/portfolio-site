import { projects } from '../data/data';
import ProjectCard from '../components/ProjectCard';
const Projects = () => {
  return (
    <div className="section" id="projects">
      <h3 className="section-title heading-gradient">Projects</h3>
      <p className="section-text">These are some of my recent projects:</p>
      <div className="project-cards-wrapper">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
