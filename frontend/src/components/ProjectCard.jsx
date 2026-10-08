import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Sparkles,
  Search,
  Database,
  Cloud,
  Radio,
  ScanLine,
  Scale
} from 'lucide-react';

function ProjectVisual({ variant }) {
  return (
    <div className={`project-visual ${variant}`} aria-hidden="true">
      <span className="visual-label">CONCEPT PREVIEW</span>
      {variant === 'pipeline' && (
        <div className="pipeline-demo">
          <p>TRANSPORT FOR LONDON</p>
          <h4>
            A city in motion.
            <br />
            <span>Data in flow.</span>
          </h4>
          <div className="pipeline-nodes">
            <span>
              <Radio size={24} />
              TfL data
            </span>
            <ArrowRight size={20} />
            <span>
              <Cloud size={24} />
              Azure
            </span>
            <ArrowRight size={20} />
            <span>
              <Database size={24} />
              Pipeline
            </span>
          </div>
          <span className="demo-footnote">
            NETWORK STATUS / DATA ENGINEERING
          </span>
        </div>
      )}
      {variant === 'agent' && (
        <div className="agent-demo">
          <div className="agent-orbit">
            <ScanLine size={42} strokeWidth={1} />
            <span className="orbit-dot" />
          </div>
          <span className="demo-kicker">FOLLOW THE SIGNAL</span>
          <h4>
            From patterns
            <br />
            to perspective.
          </h4>
          <span className="demo-footnote">SINGLE AGENT / DATABRICKS</span>
        </div>
      )}
      {variant === 'courtroom' && (
        <div className="courtroom-demo">
          <Scale size={45} strokeWidth={1} />
          <h4>
            One courtroom.
            <br />
            Different perspectives.
          </h4>
          <div className="demo-categories">
            <span>Immersive learning</span>
            <span>VR</span>
          </div>
        </div>
      )}
      {variant === 'language' && (
        <div className="flashcard-demo">
          <div className="demo-top">
            <span>StreetScript</span>
            <Sparkles size={16} />
          </div>
          <span className="demo-kicker">A LITTLE LANGUAGE, EVERY DAY</span>
          <strong>sobremesa</strong>
          <span className="demo-pronunciation">/ so·bre·me·sa /</span>
          <p>
            The time spent at the table after a meal, talking with the people
            you shared it with.
          </p>
          <div className="demo-bottom">
            <span>ES → EN</span>
            <span>Made for curious minds ↗</span>
          </div>
        </div>
      )}
      {variant === 'directory' && (
        <div className="directory-demo">
          <div className="demo-top">
            <strong>
              sole traders<span>.</span>
            </strong>
            <span>Find your person ↗</span>
          </div>
          <h4>
            Good people.
            <br />
            Great work.
          </h4>
          <div className="demo-search">
            <Search size={14} />
            <span>What do you need a hand with?</span>
            <ArrowUpRight size={14} />
          </div>
          <div className="demo-categories">
            <span>Design</span>
            <span>Home & garden</span>
            <span>Photography</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({ project }) {
  return (
    <article
      className={`project-card ${project.featured ? 'project-featured' : ''}`}
    >
      <ProjectVisual variant={project.visual} />
      <div className="project-details">
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="tech-badges">
          {project.techs.map((tech) => (
            <span className="tech-badge" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Code2 size={16} /> View source <ArrowUpRight size={16} />
              <span className="sr-only"> for {project.title}</span>
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Live demo <ArrowUpRight size={16} />
            </a>
          )}
          {project.note && <span className="project-note">{project.note}</span>}
        </div>
      </div>
    </article>
  );
}
