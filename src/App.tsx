import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell/AppShell';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { GlobalErrorHandler } from './components/GlobalErrorHandler/GlobalErrorHandler';
import { ChartVisibilityProvider } from './context/ChartVisibilityContext';
import { ToastProvider } from './context/ToastContext';
import { Dashboard } from './screens/Dashboard/Dashboard';
import { Settings } from './screens/Settings/Settings';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export const App = () => {
  return (
    <ToastProvider>
      <ChartVisibilityProvider>
        <GlobalErrorHandler />
        <BrowserRouter>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </BrowserRouter>
      </ChartVisibilityProvider>
    </ToastProvider>
  );
};
