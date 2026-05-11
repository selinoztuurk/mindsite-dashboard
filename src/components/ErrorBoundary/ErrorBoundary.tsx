import { Component, type ErrorInfo, type ReactNode } from 'react';
import { showErrorToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../utils/errorMessage';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    showErrorToast(getErrorMessage(error));

    if (process.env.NODE_ENV !== 'production') {
      console.error(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}
