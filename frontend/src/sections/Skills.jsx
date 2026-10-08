import { Braces, Database, Sparkles, BadgeCheck } from 'lucide-react';
import { skillGroups, certificationLinks } from '../data/data';
import { ArrowUpRight } from 'lucide-react';
const icons = [Database, Braces, Sparkles];

export default function Skills() {
  return (
    <section
      className="section skills-section"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="section-heading-row">
        <div>
          <h2 id="skills-title">Skills & certifications</h2>
        </div>
        <p>
          A growing toolkit across AI,
          <br />
          data and software development.
        </p>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, index) => {
          const Icon = icons[index];
          return (
            <article className="skill-card" key={group.title}>
              <Icon size={24} strokeWidth={1.5} />
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="tech-badges">
                {group.skills.map((skill) => (
                  <span className="tech-badge" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <a
        className="certification"
        href={certificationLinks.databricks}
        target="_blank"
        rel="noopener noreferrer"
      >
        <BadgeCheck size={25} />
        <div>
          <strong>Databricks Certified Generative AI Engineer Associate</strong>
          <p>A milestone in my ongoing learning in generative AI.</p>
        </div>
        <span className="certification-label">Verify credential</span>
        <ArrowUpRight size={18} aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a
        className="certification"
        href={certificationLinks.microsoft}
        target="_blank"
        rel="noopener noreferrer"
      >
        <BadgeCheck size={25} />
        <div>
          <strong>Microsoft Certified: Azure Data Fundamentals</strong>
          <p>DP-900 · Core data concepts and Azure data services.</p>
        </div>
        <span className="certification-label">Verify credential</span>
        <ArrowUpRight size={18} aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </section>
  );
}
