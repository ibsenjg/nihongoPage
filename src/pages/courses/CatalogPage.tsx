import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PageHero } from "../../common/components/page-hero/PageHero";
import { SimpleCta } from "../../common/components/simple-cta/SimpleCta";
import { getSwappedAccentLanguage, type Language } from "../../i18n/config";
import { getAnnualCourseItems, getThematicCourseItems } from "./courseData";

export type CatalogType = "annual" | "thematic";

const CatalogSection = styled.section.attrs({
  className: "section catalog-section",
})``;

export function CatalogPage({ type }: { type: CatalogType }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as Language;
  const isAnnual = type === "annual";
  const items = isAnnual ? getAnnualCourseItems(t) : getThematicCourseItems(t);
  const key = isAnnual ? "courses.annual" : "courses.thematic";

  return (
    <>
      <PageHero
        eyebrow={t(`${key}.catalogEyebrow`)}
        title={t(`${key}.catalogTitle`)}
        description={t(`${key}.catalogDescription`)}
        variant={type}
      />
      <CatalogSection>
        <div className="container catalog-grid">
          {items.map(([badge, title, description]) => (
            <article className="catalog-card" key={title}>
              <span
                className={`catalog-badge${language === "ja" && !isAnnual ? " catalog-badge-latin" : ""}`}
                lang={isAnnual ? undefined : getSwappedAccentLanguage(language)}
              >
                {badge}
              </span>
              <h2>{title}</h2>
              <p>{description}</p>
              <button className="button button-outline" type="button" disabled>
                {t("common.detailsSoon")}
              </button>
            </article>
          ))}
        </div>
      </CatalogSection>
      <SimpleCta />
    </>
  );
}
