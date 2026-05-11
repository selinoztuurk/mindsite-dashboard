import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell/AppShell';
import { ChartVisibilityProvider } from './context/ChartVisibilityContext';
import { Dashboard } from './screens/Dashboard/Dashboard';
import { Settings } from './screens/Settings/Settings';
import './App.css';

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
    <ChartVisibilityProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChartVisibilityProvider>
  );
};
