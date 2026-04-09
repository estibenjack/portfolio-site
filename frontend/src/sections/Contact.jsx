import SocialLinks from '../components/SocialLinks';

const Contact = () => {
  return (
    <div className="section" id="contact">
      <h3 className="section-title heading-gradient">Contact me</h3>
      <div className="contact-wrapper">
        <p>Reach out to me on:</p>

        <SocialLinks />
      </div>
    </div>
  );
};

export default Contact;
