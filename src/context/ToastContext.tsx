import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import './ToastContext.css';

const TOAST_DURATION_MS = 6000;

type Toast = {
  id: string;
  message: string;
};

type ToastContextValue = {
  showErrorToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const pendingErrorToasts: string[] = [];
let globalShowErrorToast: ((message: string) => void) | null = null;

const flushPendingErrorToasts = (): void => {
  if (!globalShowErrorToast) {
    return;
  }

  while (pendingErrorToasts.length > 0) {
    const message = pendingErrorToasts.shift();

    if (message) {
      globalShowErrorToast(message);
    }
  }
};

export const showErrorToast = (message: string): void => {
  if (globalShowErrorToast) {
    globalShowErrorToast(message);
    return;
  }

  pendingErrorToasts.push(message);
};

type ToastProviderProps = {
  children: ReactNode;
};

const ToastCloseIcon = () => (
  <svg
    aria-hidden="true"
    className="toast__dismiss-icon"
    viewBox="0 0 24 24"
    focusable="false"
  >
    <path
      d="M6 6l12 12M18 6L6 18"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastTimeoutsRef = useRef<Map<string, number>>(new Map());

  const dismissToast = useCallback((toastId: string) => {
    const timeoutId = toastTimeoutsRef.current.get(toastId);

    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
      toastTimeoutsRef.current.delete(toastId);
    }

    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId)
    );
  }, []);

  const showErrorToastMessage = useCallback(
    (message: string) => {
      const trimmedMessage = message.trim();

      if (!trimmedMessage) {
        return;
      }

      const toastId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      setToasts((currentToasts) => [...currentToasts, { id: toastId, message: trimmedMessage }]);

      const timeoutId = window.setTimeout(() => {
        dismissToast(toastId);
      }, TOAST_DURATION_MS);

      toastTimeoutsRef.current.set(toastId, timeoutId);
    },
    [dismissToast]
  );

  useEffect(() => {
    globalShowErrorToast = showErrorToastMessage;
    flushPendingErrorToasts();

    return () => {
      globalShowErrorToast = null;
      toastTimeoutsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      toastTimeoutsRef.current.clear();
    };
  }, [showErrorToastMessage]);

  const value = useMemo(
    () => ({
      showErrorToast: showErrorToastMessage,
    }),
    [showErrorToastMessage]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-viewport" aria-live="assertive" aria-relevant="additions">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast toast--error" role="alert">
            <p className="toast__message">{toast.message}</p>
            <button
              type="button"
              className="toast__dismiss"
              aria-label="Close"
              onClick={() => dismissToast(toast.id)}
            >
              <ToastCloseIcon />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider.');
  }

  return context;
};
