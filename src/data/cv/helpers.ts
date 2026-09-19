import type { CvEntry, CvLink, Lang } from "./types";

export type Work = {
  title: string; year?: string; type: string; venue?: string;
  meta?: string; url?: string; doi?: string;
  /** File name inside the page's folder under public/docs/. */
  file?: string;
  authors?: string[];
  links?: CvLink[];
  /** Why this work is kept out of the CV (e.g. misattributed by Scopus). */
  hidden?: string;
};
export type Funding = {
  title: string; org: string; start?: string; end?: string; type: string;
  grant?: string; url?: string; scope: "international" | "national";
  role: "coordination" | "participation";
  file?: string;
  links?: CvLink[];
};
export type Role = {
  org: string; location?: string; start?: string; end?: string;
  role?: string; department?: string; url?: string; kind?: string;
  file?: string;
  links?: CvLink[];
};

/** "2015-09" → "2015"; undefined-safe. */
export const yearOf = (d?: string) => (d ? d.slice(0, 4) : undefined);

/** "2018-10" + "2021-09" → "2018–2021"; open-ended ranges keep the dash. */
export function range(start?: string, end?: string, lang: Lang = "en"): string {
  const s = yearOf(start);
  const e = yearOf(end);
  if (s && e) return s === e ? s : `${s}–${e}`;
  if (s) return `${s}–${lang === "pt" ? "atual" : "present"}`;
  return e ?? "";
}

/** Newest first; works without a date sink to the bottom. */
export const byDateDesc = <T extends { year?: string; start?: string }>(a: T, b: T) =>
  (b.year ?? b.start ?? "").localeCompare(a.year ?? a.start ?? "");

export function workEntry(w: Work): CvEntry {
  const meta = [w.venue, w.meta].filter(Boolean).join(" · ");
  return {
    text: w.title, year: yearOf(w.year), meta: meta || undefined, url: w.url, file: w.file,
    authors: w.authors?.length ? formatAuthors(w.authors) : undefined,
    links: w.links,
  };
}

export function fundingEntry(f: Funding, lang: Lang): CvEntry {
  const meta = [f.org, f.grant].filter(Boolean).join(" · ");
  return { text: f.title, year: range(f.start, f.end, lang), meta, url: f.url, file: f.file, links: f.links };
}

export function roleEntry(r: Role, lang: Lang): CvEntry {
  const meta = [r.org, r.department, r.location].filter(Boolean).join(" · ");
  return { text: r.role ?? r.org, year: range(r.start, r.end, lang), meta, url: r.url, file: r.file, links: r.links };
}

/** Full list up to 8 authors; longer lists keep the first 6, "…", and the last. */
export function formatAuthors(authors: string[]): string {
  if (authors.length <= 8) return authors.join(", ");
  return [...authors.slice(0, 6), "…", authors[authors.length - 1]].join(", ");
}
