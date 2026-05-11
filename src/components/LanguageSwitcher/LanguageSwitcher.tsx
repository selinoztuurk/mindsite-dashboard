import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../../i18n';
import { supportedLanguages } from '../../i18n';
import './LanguageSwitcher.css';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  return (
    <label className="language-switcher">
      <span className="language-switcher__label">{t('languageSwitcher.label')}</span>
      <select
        className="language-switcher__select"
        value={i18n.resolvedLanguage ?? i18n.language}
        onChange={(event) => {
          void i18n.changeLanguage(event.target.value as SupportedLanguage);
        }}
      >
        {supportedLanguages.map((language) => (
          <option key={language} value={language}>
            {t(`languageSwitcher.${language}`)}
          </option>
        ))}
      </select>
    </label>
  );
};
