import React from 'react';
import * as helpers from '../functions/Helpers';

class Education extends React.Component {
  render() {
    return (
      <div>
        <section className="main-section" id="education">
          <div className="main-section-content">
            <h2 className="mb-3">Education</h2>
            <p className="lead mb-3">
              I have a somewhat diverse educational background and regard myself
              as self-taught in many senses. As I see it, there is so much is
              happening in web development at the moment that education has to
              be a constant process.
            </p>
            <p className="lead mb-3">
              In my distant past, I have finished gymnasium (linguistic) which I
              have supplemented up with math and physics. In addition, I have
              unfinished university studies in English and History.
            </p>
            <div>
              {this.props?.data?.educations?.map((item) => (
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

export default Education;
