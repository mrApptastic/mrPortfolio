import React from 'react';
import * as rect from '../functions/RectAngular';
import * as cpt from '../functions/CaptainCanvas';

class Fun extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      new rect.RectAngular('rectDemo');
      new cpt.CaptainCanvas('cptDemo', 'toolBox');
    }, 400);
  }

  render() {
    return (
      <div>
        <section className="main-section" id="fun">
          <div className="main-section-content">
            <h2 className="mb-3">Fun stuff</h2>
            <div>
              <canvas id="rectDemo"></canvas>
            </div>
            <div className="row">
              <div className="col-md-9">
                <canvas id="cptDemo"></canvas>
              </div>
              <div className="col-md-3">
                <div id="toolBox"></div>
              </div>
            </div>
          </div>
        </section>
        <hr className="m-0" />
      </div>
    );
  }
}

export default Fun;
