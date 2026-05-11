import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import './AppNavigation.css';

export const AppNavigation = () => {
  const { t } = useTranslation();

  return (
    <nav className="app-navigation" aria-label={t('navigation.label')}>
      <div className="app-navigation__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? 'app-navigation__link app-navigation__link--active'
              : 'app-navigation__link'
          }
        >
          {t('navigation.dashboard')}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? 'app-navigation__link app-navigation__link--active'
              : 'app-navigation__link'
          }
        >
          {t('navigation.settings')}
        </NavLink>
      </div>
      <LanguageSwitcher />
    </nav>
  );
};
