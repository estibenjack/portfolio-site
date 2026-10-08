import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/data';
import ProjectCard from '../components/ProjectCard';
const filters = [
  'All projects',
  ...new Set(projects.map((project) => project.type))
];

export default function Projects() {
  const [filter, setFilter] = useState('All projects');
  const visibleProjects = projects.filter(
    (project) => filter === 'All projects' || project.type === filter
  );
  return (
    <section
      className="section projects-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-heading-row">
        <div>
          <h2 id="projects-title">Projects</h2>
        </div>
        <a
          className="text-link"
          href="https://github.com/estibenjack"
          target="_blank"
          rel="noopener noreferrer"
        >
          More on GitHub <ArrowUpRight size={17} />
        </a>
      </div>
      <p className="section-intro">
        A selection of my personal, academy and university projects.
      </p>
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? 'active' : ''}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
            {item === 'All projects' && (
              <span>{projects.length}</span>
            )}
          </button>
        ))}
      </div>
      <div className="project-cards-wrapper">
        {visibleProjects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </section>
  );
}
