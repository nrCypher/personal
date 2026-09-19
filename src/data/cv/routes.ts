import type { Lang } from "./types";

/** Base path of the whole bilingual CV site inside the main website. */
export const CV_BASE = "/cv-academic";

export type CvRoute = {
  /** Stable key shared by both languages — also the documents folder name. */
  key: string;
  order: number;
  pt: { slug: string; label: string };
  en: { slug: string; label: string };
};

/**
 * Same sitemap as the reference site: Portuguese at the root of the section,
 * English under `/en/`.
 */
export const CV_ROUTES: CvRoute[] = [
  { key: "summary", order: 1,
    pt: { slug: "resumo-do-cvrricvlvm-vitae", label: "Resumo do Curriculum Vitae" },
    en: { slug: "cvrricvlvm-vitae-short-summary", label: "Summary" } },
  { key: "scientific", order: 2,
    pt: { slug: "vertente-merito-cientifico", label: "Vertente — Mérito Científico" },
    en: { slug: "scientific-merits", label: "Scientific Merit" } },
  { key: "pedagogical", order: 3,
    pt: { slug: "vertente-merito-pedagogico", label: "Vertente — Mérito Pedagógico" },
    en: { slug: "pedagogical-merits", label: "Pedagogical Merit" } },
  { key: "other", order: 4,
    pt: { slug: "outras-atividades-relevantes", label: "Outras Atividades Relevantes" },
    en: { slug: "further-relevant-activities", label: "Merit in other Relevant Activities" } },
  { key: "contacts", order: 5,
    pt: { slug: "contactos", label: "Contactos" },
    en: { slug: "contacts", label: "Contacts" } },
];

/** `/cv-academic` for PT, `/cv-academic/en` for EN. */
export const homeHref = (lang: Lang) => (lang === "pt" ? CV_BASE : `${CV_BASE}/en`);

export const pageHref = (lang: Lang, slug: string) => `${homeHref(lang)}/${slug}`;

export const routeBySlug = (lang: Lang, slug: string) => CV_ROUTES.find((r) => r[lang].slug === slug);

export const routeByKey = (key: string) => CV_ROUTES.find((r) => r.key === key);

/** Equivalent page in the other language — never falls back to the homepage. */
export function alternateHref(lang: Lang, slug?: string): string {
  const other: Lang = lang === "pt" ? "en" : "pt";
  if (!slug) return homeHref(other);
  const route = routeBySlug(lang, slug);
  return route ? pageHref(other, route[other].slug) : homeHref(other);
}
