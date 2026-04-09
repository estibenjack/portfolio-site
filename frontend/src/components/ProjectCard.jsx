const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="tech-badges">
        {project.techs.map((tech) => (
          <p className="tech-badge" key={tech}>
            {tech}
          </p>
        ))}
      </div>
      {(project.github || project.link) && (
        <div className="project-links">
          {project.github && <a href={project.github}>GitHub</a>}
          {project.link && <a href={project.link}>Live Demo</a>}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
