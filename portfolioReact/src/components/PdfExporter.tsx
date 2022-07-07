import React from 'react';
import * as pdf from '../functions/PdfExport';

class PdfExporter extends React.Component {
  export(items) {
    pdf.ExportPDF(items);
  }

  render() {
    return (
      <div className="container-fluid mt-4 mt-lg-5 pt-lg-3 d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={() => {
            this.export(this.props?.data);
          }}
        >
          <i className="fas fa-file-pdf"></i>
          &nbsp; Save as PDF
        </button>
      </div>
    );
  }
}

export default PdfExporter;
