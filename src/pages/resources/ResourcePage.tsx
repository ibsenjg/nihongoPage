import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Newsletter } from "../../common/components/newsletter/Newsletter";
import { PageHero } from "../../common/components/page-hero/PageHero";
import { Placeholder } from "../../common/components/placeholder/Placeholder";
import type { PlaceholderVariant } from "../../common/components/placeholder/Placeholder";
import { SimpleCta } from "../../common/components/simple-cta/SimpleCta";

export type ResourceKind = "books" | "materials" | "free";

const ResourceSection = styled.section.attrs({ className: "section" })``;

const resourceVariants: Record<ResourceKind, PlaceholderVariant> = {
  books: "book",
  materials: "materials",
  free: "free",
};

export function ResourcePage({ kind }: { kind: ResourceKind }) {
  const { t } = useTranslation();
  const items = t(`resources.${kind}.items`, {
    returnObjects: true,
  }) as string[];
  const eyebrow = t(`resources.${kind}.eyebrow`);
  const title = t(`resources.${kind}.title`);
  const description = t(`resources.${kind}.description`);
  const variant = resourceVariants[kind];

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        variant={variant}
      />
      <ResourceSection>
        <div className="container resource-grid">
          {items.map((item, index) => (
            <article className="resource-card" key={item}>
              <Placeholder
                variant={variant}
                label={`${t("common.pendingImage")} ${item}`}
                compact
              />
              <span className="eyebrow">
                {t("resources.itemLabel", {
                  number: String(index + 1).padStart(2, "0"),
                })}
              </span>
              <h2>{item}</h2>
              <p>{t("resources.sampleDescription")}</p>
              <button
                className="text-link disabled-link"
                type="button"
                disabled
              >
                {t("common.availableLater")}
              </button>
            </article>
          ))}
        </div>
      </ResourceSection>
      {kind === "free" ? <Newsletter /> : <SimpleCta />}
    </>
  );
}
