import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PageHero } from "../../common/components/page-hero/PageHero";
import { Placeholder } from "../../common/components/placeholder/Placeholder";

const AboutSection = styled.section.attrs({
  className: "section about-story",
})``;

export function AboutPage() {
  const { t } = useTranslation();
  const values = [
    [
      "01",
      t("about.values.clarity.title"),
      t("about.values.clarity.description"),
    ],
    [
      "02",
      t("about.values.consistency.title"),
      t("about.values.consistency.description"),
    ],
    [
      "03",
      t("about.values.closeness.title"),
      t("about.values.closeness.description"),
    ],
  ];

  return (
    <>
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        description={t("about.description")}
        variant="teacher"
      />
      <AboutSection>
        <div className="container split-section reverse-mobile">
          <Placeholder variant="teacher" label={t("about.image")} />
          <div>
            <span className="eyebrow">{t("about.methodEyebrow")}</span>
            <h2>{t("about.methodTitle")}</h2>
            <p>{t("about.methodDescription")}</p>
            <p>{t("about.mvpDescription")}</p>
          </div>
        </div>
      </AboutSection>
      <section className="values-section">
        <div className="container values-grid">
          {values.map(([number, title, description]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
