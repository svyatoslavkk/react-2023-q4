import React from 'react';
import { ErrorComponentProps } from '../interfaces/interfaces';

const ErrorComponent: React.FC<ErrorComponentProps> = (props) => {
  return (
    <div className="error-boundary-block">
      <h2 className="error-boundary-title">Something went wrong</h2>
      <button onClick={props.onReload}>Reload</button>
    </div>
  );
};

export default ErrorComponent;
