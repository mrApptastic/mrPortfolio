import React from 'react';
import * as helpers from '../functions/Helpers';

class Experience extends React.Component {
  render() {
    return (
      <div>
        <section className="main-section" id="experience">
          <div className="main-section-content">
            <h2 className="mb-3">Experience</h2>
            <p className="lead mb-3">
              I have {helpers.calculateAge('2016-06-15')} years of professional
              developer experience. On a hobby basis, I have been working with
              web development since 2005.
            </p>
            <p className="lead mb-3">
              Previously, I have worked as a profesional soldier and as a
              slaughterhouse worker.
            </p>
            <div>
              {this.props?.data?.experiences?.map((item) => (
                <div
                  key={item?.name}
                  className="d-flex flex-column flex-md-row justify-content-between mb-3"
                >
                  <div className="flex-shrink-0">
                    <img src={item?.imageUrl} alt={item?.name} />
                  </div>
                  <div className="flex-grow-1">
                    <h3 className="mb-0">{item?.name}</h3>
                    <div className="subheading mb-3">{item?.place}</div>
                    <p
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    ></p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-primary">
                      {helpers.formatYear(item?.from, item?.to)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <hr className="m-0" />
      </div>
    );
  }
}

export default Experience;
