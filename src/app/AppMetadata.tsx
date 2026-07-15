import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { getRouteTitleKey } from "./routeMetadata";

export function AppMetadata() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    const pageName = t(getRouteTitleKey(pathname));
    document.title = t("meta.pageTitle", { page: pageName });
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("meta.description"));
  }, [i18n.resolvedLanguage, pathname, t]);

  return null;
}
