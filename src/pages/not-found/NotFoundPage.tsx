import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getSwappedAccentLanguage, type Language } from "../../i18n/config";

const NotFoundSection = styled.section.attrs({ className: "not-found" })``;

export function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const accentLanguage = getSwappedAccentLanguage(
    i18n.resolvedLanguage as Language,
  );

  return (
    <NotFoundSection>
      <div className="container">
        <span className="japanese-kicker" lang={accentLanguage}>
          {t("notFound.eyebrow")}
        </span>
        <h1>{t("notFound.title")}</h1>
        <Link className="button button-red" to="/">
          {t("notFound.action")}
        </Link>
      </div>
    </NotFoundSection>
  );
}
