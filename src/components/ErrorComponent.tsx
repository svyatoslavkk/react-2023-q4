import { Component } from 'react';
import { ErrorComponentProps } from '../interfaces/interfaces';

export class ErrorComponent extends Component {
  constructor(props: ErrorComponentProps) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleResetError = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <div className="error-boundary-block">
        <h2 className="error-boundary-title">Something went wrong</h2>
        <button onClick={this.handleResetError}>Reload</button>
      </div>
    );
  }
}
