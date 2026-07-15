import type { TFunction } from "i18next";
import type { PlaceholderVariant } from "../../common/components/placeholder/Placeholder";

export type CourseCard = {
  eyebrow: string;
  title: string;
  description: string;
  to: string;
  variant: PlaceholderVariant;
};

export type CatalogItem = [badge: string, title: string, description: string];

export function getCourseCards(t: TFunction): CourseCard[] {
  return [
    {
      eyebrow: t("courses.annual.eyebrow"),
      title: t("courses.annual.title"),
      description: t("courses.annual.description"),
      to: "/courses/annual",
      variant: "annual",
    },
    {
      eyebrow: t("courses.thematic.eyebrow"),
      title: t("courses.thematic.title"),
      description: t("courses.thematic.description"),
      to: "/courses/thematic",
      variant: "thematic",
    },
  ];
}

export function getAnnualCourseItems(t: TFunction): CatalogItem[] {
  return [
    [
      "A1.1",
      t("courses.annual.items.a11.title"),
      t("courses.annual.items.a11.description"),
    ],
    [
      "A1.2",
      t("courses.annual.items.a12.title"),
      t("courses.annual.items.a12.description"),
    ],
    [
      "A2.1",
      t("courses.annual.items.a21.title"),
      t("courses.annual.items.a21.description"),
    ],
    [
      "A2.2",
      t("courses.annual.items.a22.title"),
      t("courses.annual.items.a22.description"),
    ],
    [
      "B1.1",
      t("courses.annual.items.b11.title"),
      t("courses.annual.items.b11.description"),
    ],
    [
      "B1.2",
      t("courses.annual.items.b12.title"),
      t("courses.annual.items.b12.description"),
    ],
  ];
}

export function getThematicCourseItems(t: TFunction): CatalogItem[] {
  return [
    [
      t("courses.thematic.items.travel.badge"),
      t("courses.thematic.items.travel.title"),
      t("courses.thematic.items.travel.description"),
    ],
    [
      t("courses.thematic.items.kana.badge"),
      t("courses.thematic.items.kana.title"),
      t("courses.thematic.items.kana.description"),
    ],
    [
      t("courses.thematic.items.grammar.badge"),
      t("courses.thematic.items.grammar.title"),
      t("courses.thematic.items.grammar.description"),
    ],
    [
      t("courses.thematic.items.reading.badge"),
      t("courses.thematic.items.reading.title"),
      t("courses.thematic.items.reading.description"),
    ],
  ];
}
