import { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error in ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  resetError = () => {
    this.setState({ error: null, errorInfo: null });
  };

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="error-boundary-block">
          <h2 className="error-boundary-title">Something went wrong</h2>
          <button onClick={this.resetError}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}
