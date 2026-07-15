import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Newsletter } from "../../common/components/newsletter/Newsletter";
import { Placeholder } from "../../common/components/placeholder/Placeholder";
import type { PlaceholderVariant } from "../../common/components/placeholder/Placeholder";
import { SectionTitle } from "../../common/components/section-title/SectionTitle";
import { getSwappedAccentLanguage, type Language } from "../../i18n/config";
import { getCourseCards } from "../courses/courseData";

const HeroSection = styled.section.attrs({ className: "hero-section" })``;
const ContentSection = styled.section.attrs({ className: "section" })``;

export function HomePage() {
  const { t, i18n } = useTranslation();
  const accentLanguage = getSwappedAccentLanguage(
    i18n.resolvedLanguage as Language,
  );
  const courses = getCourseCards(t);
  const features: [PlaceholderVariant, string, string][] = [
    [
      "calendar",
      t("home.method.features.pace.title"),
      t("home.method.features.pace.description"),
    ],
    [
      "desk",
      t("home.method.features.classroom.title"),
      t("home.method.features.classroom.description"),
    ],
    [
      "materials",
      t("home.method.features.resources.title"),
      t("home.method.features.resources.description"),
    ],
  ];
  const testimonials = [
    [t("home.testimonials.first.quote"), t("home.testimonials.first.author")],
    [t("home.testimonials.second.quote"), t("home.testimonials.second.author")],
    [t("home.testimonials.third.quote"), t("home.testimonials.third.author")],
  ];

  return (
    <>
      <HeroSection>
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="japanese-kicker" lang={accentLanguage}>
              {t("home.hero.eyebrow")}
            </span>
            <h1>{t("home.hero.title")}</h1>
            <p>{t("home.hero.description")}</p>
            <div className="button-row">
              <Link className="button button-red" to="/courses">
                {t("home.hero.primaryAction")} <span aria-hidden="true">→</span>
              </Link>
              <Link className="text-link" to="/about">
                {t("home.hero.secondaryAction")}
              </Link>
            </div>
          </div>
          <Placeholder variant="teacher" label={t("home.hero.image")} />
        </div>
        <div className="wave wave-white" />
      </HeroSection>

      <ContentSection className="section intro-section">
        <div className="container narrow">
          <SectionTitle eyebrow={t("home.method.eyebrow")}>
            {t("home.method.title")}
          </SectionTitle>
          <p className="lead centered">{t("home.method.description")}</p>
        </div>
        <div className="container feature-grid">
          {features.map(([variant, title, description]) => (
            <article className="feature-card" key={title}>
              <Placeholder
                variant={variant}
                label={`${t("common.pendingImage")} ${title}`}
                compact
              />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <section className="stats-section">
        <div className="wave wave-yellow" />
        <div className="container stats-grid">
          <div>
            <strong>10+</strong>
            <span>{t("home.stats.years")}</span>
          </div>
          <div>
            <strong>5.000</strong>
            <span>{t("home.stats.students")}</span>
          </div>
          <div>
            <strong>20+</strong>
            <span>{t("home.stats.courses")}</span>
          </div>
        </div>
      </section>

      <ContentSection className="section courses-section">
        <div className="container">
          <SectionTitle eyebrow={t("home.courseSection.eyebrow")}>
            {t("home.courseSection.title")}
          </SectionTitle>
          <div className="course-grid">
            {courses.map((course) => (
              <article className="course-card" key={course.title}>
                <Placeholder
                  variant={course.variant}
                  label={`${t("common.pendingImage")} ${course.title}`}
                />
                <div className="course-card-copy">
                  <span className="eyebrow">{course.eyebrow}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <Link className="button button-blue" to={course.to}>
                    {t("home.courseSection.view")}{" "}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ContentSection>

      <section className="blue-story">
        <div className="container split-section">
          <div>
            <span className="japanese-kicker" lang={accentLanguage}>
              {t("home.community.eyebrow")}
            </span>
            <h2>{t("home.community.title")}</h2>
            <p>{t("home.community.description")}</p>
            <Link className="button button-red" to="/about">
              {t("home.community.action")} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Placeholder variant="community" label={t("home.community.image")} />
        </div>
      </section>

      <Newsletter />

      <ContentSection className="section testimonials">
        <div className="container">
          <SectionTitle eyebrow={t("home.testimonials.eyebrow")}>
            {t("home.testimonials.title")}
          </SectionTitle>
          <div className="testimonial-grid">
            {testimonials.map(([quote, author]) => (
              <blockquote key={author}>
                <span aria-hidden="true">“</span>
                <p>{quote}</p>
                <cite>{author}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </ContentSection>
    </>
  );
}
