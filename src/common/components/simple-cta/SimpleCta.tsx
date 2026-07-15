import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getSwappedAccentLanguage, type Language } from "../../../i18n/config";

const CtaSection = styled.section.attrs({ className: "simple-cta" })``;

export function SimpleCta() {
  const { t, i18n } = useTranslation();
  const accentLanguage = getSwappedAccentLanguage(
    i18n.resolvedLanguage as Language,
  );

  return (
    <CtaSection>
      <div className="container">
        <span className="japanese-kicker" lang={accentLanguage}>
          {t("cta.eyebrow")}
        </span>
        <h2>{t("cta.title")}</h2>
        <Link className="button button-red" to="/learn-free">
          {t("cta.action")} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </CtaSection>
  );
}
