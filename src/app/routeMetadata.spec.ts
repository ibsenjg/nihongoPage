import { expect, test } from "vitest";
import { getRouteTitleKey, routeTitleKeys } from "./routeMetadata";

test("maps every public route to translated metadata", () => {
  expect(Object.keys(routeTitleKeys)).toEqual([
    "/",
    "/courses",
    "/courses/annual",
    "/courses/thematic",
    "/books",
    "/materials",
    "/learn-free",
    "/about",
    "/contact",
  ]);
  expect(getRouteTitleKey("/contact")).toBe("meta.routes.contact");
});

test("uses not-found metadata for unknown routes", () => {
  expect(getRouteTitleKey("/missing-page")).toBe("meta.routes.notFound");
});
