import React from 'react';
import * as helpers from '../functions/Helpers';

class Education extends React.Component {
  render() {
    return (
      <div>
        <section className="main-section" id="projects">
          <div className="main-section-content">
            <h2 className="mb-3">Projects</h2>
            <p className="lead mb-3">
              The list below contains a number of projects that I have worked on
              either professionally or on a hobby basis.
            </p>
            <div>
              <ul className="timeline">
                {this.props?.data?.projects?.map((item, index) => (
                  <li
                    key={item?.name}
                    className={index % 2 === 1 ? 'timeline-inverted' : ''}
                  >
                    <a>
                      <div className="timeline-image">
                        <img
                          className="rounded-circle img-fluid"
                          src={item?.imageUrl}
                          alt={item?.name}
                        />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <h4>{helpers.formatYear(item?.from, item?.to)}</h4>
                          <h4 className="subheading">
                            {item?.name}, {item?.place}
                          </h4>
                        </div>
                        <div className="timeline-body">
                          <p
                            className="text-muted"
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                          ></p>
                          <div className="d-flex justify-content-around">
                            {item?.demoUrl ? (
                              <a
                                className="btn btn-primary"
                                href={item.demoUrl}
                                target="_blank"
                              >
                                <i className="fas fa-wand-sparkles"></i>&nbsp;
                                Demo
                              </a>
                            ) : null}
                            {item?.docUrl ? (
                              <a
                                className="btn btn-primary"
                                href={item.docUrl}
                                target="_blank"
                              >
                                <i className="fas fa-book"></i>&nbsp; Doc
                              </a>
                            ) : null}
                            {item?.sourceUrl ? (
                              <a
                                className="btn btn-primary"
                                href={item.sourceUrl}
                                target="_blank"
                              >
                                <i className="fab fa-github"></i>&nbsp; Source
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <hr className="m-0" />
      </div>
    );
  }
}

export default Education;
