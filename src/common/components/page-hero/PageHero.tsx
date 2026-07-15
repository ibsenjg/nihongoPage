import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getSwappedAccentLanguage, type Language } from "../../../i18n/config";
import { Placeholder } from "../placeholder/Placeholder";
import type { PlaceholderVariant } from "../placeholder/Placeholder";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  variant: PlaceholderVariant;
};

const HeroSection = styled.section.attrs({ className: "page-hero" })``;

export function PageHero({
  eyebrow,
  title,
  description,
  variant,
}: PageHeroProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as Language;

  return (
    <HeroSection>
      <div className="container page-hero-grid">
        <div>
          <span
            className="japanese-kicker"
            lang={getSwappedAccentLanguage(language)}
          >
            {eyebrow}
          </span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <Placeholder
          variant={variant}
          label={`${t("common.pendingImage")} ${title}`}
          compact
        />
      </div>
    </HeroSection>
  );
}
