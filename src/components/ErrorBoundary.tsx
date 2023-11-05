import { Component, ErrorInfo } from 'react';
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '../interfaces/interfaces';
import ErrorComponent from './ErrorComponent';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorComponent onReload={this.resetError} />;
    }
    return this.props.children;
  }
}
