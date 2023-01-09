import React from 'react';

function Spinner(props) {
  return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
  );
}

export default Spinner;
