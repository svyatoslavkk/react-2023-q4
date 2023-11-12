import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="dot-spinner">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          data-testid="spinner"
          className="dot-spinner__dot"
        ></div>
      ))}
    </div>
  );
};

export default Spinner;
