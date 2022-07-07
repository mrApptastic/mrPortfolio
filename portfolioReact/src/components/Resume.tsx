import React from 'react';
import ProfileImage from './ProfileImage';
import * as helpers from '../functions/Helpers';

class Resume extends React.Component {
  render() {
    return (
      <div>
        <section className="main-section" id="resume">
          <div className="main-section-content">
            <div>
              <span className="d-flex justify-content-center">
                <ProfileImage></ProfileImage>
              </span>
            </div>
            <h1 className="mb-0">
              Henrik
              <span className="text-primary">Beske</span>
            </h1>
            <div className="subheading mb-3">
              <a href="tel:+4524497555">+45 24 49 75 55</a>
              <br />
              <a href="'mailto:henrikbeske@gmail.com">henrikbeske@gmail.com</a>
            </div>
            <div className="social-icons mb-3">
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
            <p className="lead mb-3">
              I am a developer with a versatile profile and a broad knowledge
              outside a developer's typical field of activity.
            </p>
            <p className="lead mb-3">
              As a person, I am calm and forthright. I am good at collaborating
              with others, and my focus is on solving the challenges that arise
              in everyday work. My approach to tasks contains both creative and
              analytical qualities.
            </p>
            <p className="lead mb-3">
              I am passionate about developing complete solutions, which make a
              difference for people using them. In my world, software needs to
              be obvious and well thought out.
            </p>
            <p className="lead mb-3">
              I am {helpers.calculateAge('1981-04-23')} years old, happily
              married, and have children aged between{' '}
              {helpers.calculateAge('2009-10-08')}-
              {helpers.calculateAge('2000-12-24')} years. During my leisure
              time, I perform i.a. board and leadership work in a local sports
              club as well as at a free school that my youngest child attends.
            </p>
            <p className="lead mb-3">
              Additionally, I collect coins, play old computer games, code on my
              hobby projects and read books. I am a distinct knowledge collector
              and constantly like to build upon my knowledge.
            </p>
          </div>
        </section>
        <hr className="m-0" />
      </div>
    );
  }
}

export default Resume;
