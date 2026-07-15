import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Logo } from "../logo/Logo";

const FooterRoot = styled.footer.attrs({ className: "footer" })``;

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <FooterRoot>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>{t("footer.description")}</p>
          <div
            className="socials"
            role="group"
            aria-label={t("footer.socials")}
          >
            <span>ig</span>
            <span>yt</span>
            <span>in</span>
          </div>
        </div>
        <div>
          <h3>{t("footer.startHere")}</h3>
          <Link to="/courses">{t("footer.japaneseCourses")}</Link>
          <Link to="/learn-free">{t("navigation.learnFree")}</Link>
          <Link to="/materials">{t("footer.teachingMaterials")}</Link>
        </div>
        <div>
          <h3>{t("footer.aboutUs")}</h3>
          <Link to="/about">{t("footer.project")}</Link>
          <Link to="/contact">{t("footer.contact")}</Link>
          <span>{t("footer.faq")}</span>
        </div>
        <div>
          <h3>{t("footer.mvpStatus")}</h3>
          <p>{t("footer.mvpScope")}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t("footer.copyright")}</span>
        <span>{t("footer.legal")}</span>
      </div>
    </FooterRoot>
  );
}
