import { ArrowUpRight } from 'lucide-react';
export default function Contact() {
  return (
    <section
      className="section contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-layout">
        <div>
          <h2 id="contact-title">
            Let’s <span>connect.</span>
          </h2>
          <p>
            Want to talk AI, data or something you’re building?
            <br />
            I’m always up for exchanging ideas.
          </p>
        </div>
        <a
          className="contact-button"
          href="https://www.linkedin.com/in/steven-jackson-62b795193/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect with Steven on LinkedIn"
        >
          <ArrowUpRight size={42} strokeWidth={1.25} />
        </a>
      </div>
      <div className="contact-socials">
        <a
          href="https://www.linkedin.com/in/steven-jackson-62b795193/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn <ArrowUpRight size={16} />
        </a>
        <a
          href="https://github.com/estibenjack"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
