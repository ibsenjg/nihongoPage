import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Logo } from "../logo/Logo";
import { supportedLanguages } from "../../../i18n/config";
import type { Language } from "../../../i18n/config";

const HeaderRoot = styled.header`
  .topbar {
    color: var(--white);
    background: var(--blue);
    font-size: 0.84rem;
    font-weight: 600;
  }

  .topbar-inner,
  .topbar-links,
  .nav-inner {
    display: flex;
    align-items: center;
  }

  .topbar-inner {
    min-height: 38px;
    justify-content: space-between;
  }

  .topbar-links {
    gap: 24px;
  }

  .topbar a {
    color: var(--white);
  }

  .login-later {
    color: #fff3c4;
  }

  .language-toggle {
    display: inline-flex;
    min-height: 28px;
    padding: 3px 10px;
    align-items: center;
    gap: 6px;
    color: var(--blue-dark);
    background: var(--white);
    border: 0;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 800;
    cursor: pointer;
    transition:
      color 180ms ease,
      background 180ms ease,
      transform 180ms ease;
  }

  .language-toggle:hover {
    color: var(--ink);
    background: var(--yellow);
    transform: translateY(-1px);
  }

  .main-nav {
    position: sticky;
    z-index: 20;
    top: 0;
    background: rgba(255, 255, 255, 0.96);
    border-bottom: 1px solid rgba(17, 110, 229, 0.1);
    backdrop-filter: blur(14px);
  }

  .nav-inner {
    min-height: 82px;
    justify-content: space-between;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .nav-link {
    position: relative;
    padding: 29px 0 27px;
    color: var(--ink);
    font-size: 0.95rem;
    font-weight: 650;
    text-decoration: none;
  }

  .nav-link::after {
    position: absolute;
    right: 0;
    bottom: 21px;
    left: 0;
    height: 3px;
    content: "";
    background: var(--red);
    border-radius: 999px;
    transform: scaleX(0);
    transition: transform 180ms ease;
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    transform: scaleX(1);
  }

  .menu-toggle {
    display: none;
    width: 46px;
    height: 46px;
    padding: 11px;
    background: var(--soft-blue);
    border: 0;
    border-radius: 12px;
  }

  .menu-toggle span {
    display: block;
    height: 2px;
    margin: 5px 0;
    background: var(--ink);
  }

  @media (max-width: 920px) {
    .topbar-inner > span {
      display: none;
    }

    .topbar-inner {
      justify-content: flex-end;
    }

    .menu-toggle {
      display: block;
    }

    .nav-links {
      position: absolute;
      top: 82px;
      right: 20px;
      left: 20px;
      display: none;
      padding: 14px 22px;
      align-items: stretch;
      flex-direction: column;
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: var(--shadow);
      gap: 0;
    }

    .nav-links.open {
      display: flex;
    }

    .nav-link {
      padding: 16px 2px;
      border-bottom: 1px solid var(--border);
    }

    .nav-link:last-child {
      border: 0;
    }

    .nav-link::after {
      bottom: 10px;
      width: 45px;
    }
  }

  @media (max-width: 650px) {
    .topbar-links {
      gap: 12px;
      font-size: 0.72rem;
    }

    .login-later {
      display: none;
    }

    .nav-inner {
      min-height: 72px;
    }

    .nav-links {
      top: 73px;
      right: 15px;
      left: 15px;
    }
  }
`;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as Language;
  const closeMenu = () => setOpen(false);
  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <HeaderRoot>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>{t("navigation.tagline")}</span>
          <div className="topbar-links">
            <Link to="/?section=newsletter">{t("common.newsletter")}</Link>
            <span className="login-later" title={t("navigation.futureFeature")}>
              {t("navigation.schoolAccess")}
            </span>
            <select
              className="language-toggle"
              aria-label={t("common.language")}
              autoComplete="language"
              value={language}
              onChange={(event) => void i18n.changeLanguage(event.target.value)}
            >
              {supportedLanguages.map((locale) => (
                <option key={locale} value={locale} lang={locale}>
                  {t(`common.languages.${locale}`)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="main-nav">
        <div className="container nav-inner">
          <Logo />
          <button
            className="menu-toggle"
            type="button"
            aria-label={t(
              open ? "navigation.closeMenu" : "navigation.openMenu",
            )}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            className={open ? "nav-links open" : "nav-links"}
            aria-label={t("navigation.main")}
          >
            <NavLink className={navClass} to="/courses" onClick={closeMenu}>
              {t("navigation.courses")}
            </NavLink>
            <NavLink className={navClass} to="/books" onClick={closeMenu}>
              {t("navigation.books")}
            </NavLink>
            <NavLink className={navClass} to="/materials" onClick={closeMenu}>
              {t("navigation.materials")}
            </NavLink>
            <NavLink className={navClass} to="/learn-free" onClick={closeMenu}>
              {t("navigation.learnFree")}
            </NavLink>
            <NavLink className={navClass} to="/about" onClick={closeMenu}>
              {t("navigation.about")}
            </NavLink>
          </nav>
        </div>
      </div>
    </HeaderRoot>
  );
}
