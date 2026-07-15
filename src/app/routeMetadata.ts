export const routeTitleKeys = {
  "/": "meta.routes.home",
  "/courses": "meta.routes.courses",
  "/courses/annual": "meta.routes.annualCourses",
  "/courses/thematic": "meta.routes.thematicCourses",
  "/books": "meta.routes.books",
  "/materials": "meta.routes.materials",
  "/learn-free": "meta.routes.learnFree",
  "/about": "meta.routes.about",
  "/contact": "meta.routes.contact",
} as const;

export type RouteTitleKey =
  (typeof routeTitleKeys)[keyof typeof routeTitleKeys] | "meta.routes.notFound";

export function getRouteTitleKey(pathname: string): RouteTitleKey {
  return (
    routeTitleKeys[pathname as keyof typeof routeTitleKeys] ??
    "meta.routes.notFound"
  );
}
