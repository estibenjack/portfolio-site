export default function About() {
  return (
    <section
      className="section about-section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="section-heading">
        <h2 id="about-title">About me</h2>
      </div>
      <div className="about-content">
        <p className="lead">
          I’m an AI & Data Consultant at EY, bringing together a passion for
          technology and a curiosity about how it can help people.
        </p>
        <p>
          My background spans software development, technical support and
          product education in SaaS. That experience shapes how I approach
          problems: understanding the people using a system matters as much as
          the code behind it.
        </p>
        <p>
          Alongside my role, I’m completing a part-time MSc in Software
          Development at Queen’s University Belfast. My current project explores
          how a VR courtroom simulator can help criminology students experience
          trials from different perspectives.
        </p>
        <p>
          Away from the keyboard, you’ll find me keeping up my Spanish,
          Portuguese and French.
        </p>
        <div className="experience-card">
          <span className="ey-logo">
            EY
            <span />
          </span>
          <div>
            <span className="eyebrow">CURRENT ROLE</span>
            <h3>AI & Data Consultant</h3>
            <p>Ernst & Young</p>
          </div>
          <span className="experience-date">Sept 2026 – present</span>
        </div>
      </div>
    </section>
  );
}
