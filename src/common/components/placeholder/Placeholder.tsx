import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getSwappedAccentLanguage, type Language } from "../../../i18n/config";

export type PlaceholderVariant =
  | "teacher"
  | "calendar"
  | "desk"
  | "materials"
  | "community"
  | "annual"
  | "thematic"
  | "book"
  | "free";

type PlaceholderProps = {
  variant: PlaceholderVariant;
  label: string;
  compact?: boolean;
};

const PlaceholderRoot = styled.div``;

export function Placeholder({
  variant,
  label,
  compact = false,
}: PlaceholderProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as Language;

  return (
    <PlaceholderRoot
      className={`placeholder placeholder-${variant}${compact ? " placeholder-compact" : ""}`}
      role="img"
      aria-label={label}
    >
      <span className="sun" />
      <span className="cloud cloud-one" />
      <span className="cloud cloud-two" />
      <span
        className={`placeholder-glyph${language === "ja" ? " placeholder-glyph-latin" : ""}`}
        lang={getSwappedAccentLanguage(language)}
      >
        {t(`placeholder.glyphs.${variant}`)}
      </span>
      <span className="placeholder-label">{t("common.sampleImage")}</span>
    </PlaceholderRoot>
  );
}
