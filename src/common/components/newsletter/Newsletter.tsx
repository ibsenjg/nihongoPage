import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Placeholder } from "../placeholder/Placeholder";

const NewsletterSection = styled.section.attrs({
  className: "newsletter",
})``;

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (searchParams.get("section") === "newsletter") {
      headingRef.current?.focus();
    }
  }, [location.key, searchParams]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <NewsletterSection id="newsletter" aria-labelledby="newsletter-heading">
      <div className="container split-section newsletter-inner">
        <Placeholder variant="free" label={t("newsletter.image")} compact />
        <div>
          <span className="eyebrow">{t("newsletter.eyebrow")}</span>
          <h2 id="newsletter-heading" ref={headingRef} tabIndex={-1}>
            {t("newsletter.title")}
          </h2>
          <p>{t("newsletter.description")}</p>
          {submitted ? (
            <div className="form-success" role="status">
              {t("newsletter.success")}
            </div>
          ) : (
            <form className="signup-form" onSubmit={handleSubmit}>
              <label htmlFor="newsletter-name">
                <span>{t("common.name")}</span>
                <input
                  id="newsletter-name"
                  name="name"
                  autoComplete="name"
                  placeholder={t("common.namePlaceholder")}
                  required
                />
              </label>
              <label htmlFor="newsletter-email">
                <span>{t("common.email")}</span>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("common.emailPlaceholder")}
                  required
                />
              </label>
              <button className="button button-red" type="submit">
                {t("newsletter.submit")} <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </NewsletterSection>
  );
}
