import { useTranslation } from "react-i18next";
import { isSupportedLanguage, supportedLanguages } from "../../i18n";
import "./LanguageSwitcher.css";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (isSupportedLanguage(value)) {
      i18n.changeLanguage(value);
    }
  };

  return (
    <label className="language-switcher">
      <span className="language-switcher__label">
        {t("languageSwitcher.label")}
      </span>
      <select
        className="language-switcher__select"
        value={i18n.resolvedLanguage ?? i18n.language}
        onChange={onLanguageChange}
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
