import React from 'react';

class Contact extends React.Component {
  render() {
    return (
      <footer id="contact" className="mainBox contactBox fadeIn mrFadeIn">
        <div>
          <a href="mailto:henrikbeske@gmail.com">henrikbeske@gmail.com</a>
        </div>
        <div className="social-icons">
          <a
            className="social-icon"
            target="_blank"
            href="https://www.linkedin.com/in/henrik-beske-868418233/"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            className="social-icon"
            target="_blank"
            href="https://github.com/mrApptastic"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            className="social-icon"
            target="_blank"
            href="https://codepen.io/mrApptastic"
          >
            <i className="fab fa-codepen"></i>
          </a>
        </div>
        <div>
          <a href="tel:+4524497555">(+45) 24 49 75 55</a>
        </div>
      </footer>
    );
  }
}

export default Contact;
