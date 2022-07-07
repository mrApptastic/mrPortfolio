import React from 'react';

class Skills extends React.Component {
  render() {
    return (
      <div>
        <section className="main-section" id="skills">
          <div className="main-section-content">
            <h2 className="mb-3">Skills</h2>
            <p className="lead mb-3">
              I am under the impression that I am a complete web developer who
              is able to take care of tasks ranging from design to hosting. I'm
              probably a little better on the client side than on the server
              side, but my goal is to master it all.
            </p>
            <div>
              {this.props?.data?.qualifications?.map((item) => (
                <div
                  className="d-flex flex-column flex-md-row justify-content-between mb-3"
                  key={item?.name}
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

export default Skills;
