import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const SocialLinks = () => {
  return (
    <div className="contact-links">
      <a
        href="https://www.linkedin.com/in/steven-jackson-62b795193/"
        target="_blank"
      >
        <FontAwesomeIcon
          icon={faLinkedin}
          style={{ color: 'rgb(255, 255, 255)' }}
        />
      </a>
      <a href="https://github.com/estibenjack" target="_blank">
        <FontAwesomeIcon
          icon={faGithub}
          style={{ color: 'rgb(255, 255, 255)' }}
        />
      </a>
    </div>
  );
};

export default SocialLinks;
