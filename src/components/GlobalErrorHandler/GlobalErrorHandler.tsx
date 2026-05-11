import { useEffect } from 'react';
import { showErrorToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../utils/errorMessage';

export const GlobalErrorHandler = () => {
  useEffect(() => {
    const handleWindowError = (event: ErrorEvent) => {
      showErrorToast(getErrorMessage(event.error ?? event.message));
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      showErrorToast(getErrorMessage(event.reason));
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
};
