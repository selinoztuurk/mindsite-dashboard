import { Outlet } from 'react-router-dom';
import { AppNavigation } from '../AppNavigation/AppNavigation';

export const AppShell = () => {
  return (
    <div className="app">
      <AppNavigation />
      <Outlet />
    </div>
  );
};
