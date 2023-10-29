import { Component } from 'react';
import { ErrorComponentProps } from '../interfaces/interfaces';

export class ErrorComponent extends Component<ErrorComponentProps> {
  handleResetError = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <div className="error-boundary-block">
        <h2 className="error-boundary-title">Something went wrong</h2>
        <button onClick={this.props.onReload}>Reload</button>
      </div>
    );
  }
}
