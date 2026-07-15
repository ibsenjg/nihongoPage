import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PageHero } from "../../common/components/page-hero/PageHero";
import { Placeholder } from "../../common/components/placeholder/Placeholder";
import { SimpleCta } from "../../common/components/simple-cta/SimpleCta";
import { getCourseCards } from "./courseData";

const CourseSection = styled.section.attrs({ className: "section" })``;

export function CoursesPage() {
  const { t } = useTranslation();
  const courses = getCourseCards(t);

  return (
    <>
      <PageHero
        eyebrow={t("courses.page.eyebrow")}
        title={t("courses.page.title")}
        description={t("courses.page.description")}
        variant="annual"
      />
      <CourseSection>
        <div className="container course-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.title}>
              <Placeholder
                variant={course.variant}
                label={`${t("common.pendingImage")} ${course.title}`}
              />
              <div className="course-card-copy">
                <span className="eyebrow">{course.eyebrow}</span>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <Link className="button button-blue" to={course.to}>
                  {t("courses.page.explore")} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </CourseSection>
      <SimpleCta />
    </>
  );
}
