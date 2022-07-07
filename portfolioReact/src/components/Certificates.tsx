import React from 'react';

class Certificates extends React.Component {
  render() {
    return (
      <div>
        <section className="main-section" id="certificates">
          <div className="main-section-content">
            <h2 className="mb-3">Certificates</h2>
            <div>
              {this.props?.data?.certificates?.map((item) => (
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

export default Certificates;
