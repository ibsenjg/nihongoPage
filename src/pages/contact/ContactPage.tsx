import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PageHero } from "../../common/components/page-hero/PageHero";

const ContactSection = styled.section.attrs({
  className: "section contact-section",
})``;

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        description={t("contact.description")}
        variant="community"
      />
      <ContactSection>
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">{t("footer.contact")}</span>
            <h2>{t("contact.sectionTitle")}</h2>
            <p>{t("contact.formDescription")}</p>
            <a href="mailto:hola@nihongo.local">hola@nihongo.local</a>
          </div>
          {sent ? (
            <div className="form-success large" role="status">
              {t("contact.success")}
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="contact-name">
                {t("common.name")}
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                />
              </label>
              <label htmlFor="contact-email">
                {t("common.email")}
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label htmlFor="contact-message">
                {t("contact.message")}
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                />
              </label>
              <button className="button button-red" type="submit">
                {t("contact.submit")} <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </ContactSection>
    </>
  );
}
