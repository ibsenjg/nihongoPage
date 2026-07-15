import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getRouteTitleKey } from "../../../app/routeMetadata";
import { SiteFooter } from "../site-footer/SiteFooter";
import { SiteHeader } from "../site-header/SiteHeader";

const SkipLink = styled.a`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 16px;
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.blueDark};
  border-radius: 0 0 12px 12px;
  font-weight: 800;
  transform: translateY(-120%);
  transition: transform 150ms ease;

  &:focus {
    transform: translateY(0);
  }
`;

const Main = styled.main``;

const RouteStatus = styled.p`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export function SiteLayout() {
  const mainRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const skipToMain = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    mainRef.current?.focus();
  };

  return (
    <>
      <ScrollToTop />
      <SkipLink href="#main-content" onClick={skipToMain}>
        {t("navigation.skipToContent")}
      </SkipLink>
      <RouteStatus role="status" aria-live="polite" aria-atomic="true">
        {t("navigation.routeAnnouncement", {
          page: t(getRouteTitleKey(pathname)),
        })}
      </RouteStatus>
      <SiteHeader />
      <Main id="main-content" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </Main>
      <SiteFooter />
    </>
  );
}
