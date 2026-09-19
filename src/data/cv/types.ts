export type Lang = "pt" | "en";

export type CvLinkKind =
  | "doi" | "publisher" | "repository" | "preprint" | "dataset"
  | "project" | "proceedings" | "cordis" | "archive" | "free" | "other";

/** A secondary link rendered as a small chip under the entry. */
export type CvLink = { kind: CvLinkKind; url: string };

/** One line of the CV: a publication, a project, a position… */
export type CvEntry = {
  text: string;
  /** Year or date shown before the text. */
  year?: string;
  /** Venue, journal, organisation, grant number… */
  meta?: string;
  /** External link (DOI, project site, Scopus record). */
  url?: string;
  /** Author list, already formatted. */
  authors?: string;
  /** Extra links: DOI, publisher page, repository record, project site… */
  links?: CvLink[];
  /**
   * File attached to this entry, relative to the page's document folder:
   * `public/docs/<pageSlug>/<file>`. Rendered as a download button.
   */
  file?: string;
};

/** Third level: the numbered groups ("1. INTERNATIONAL", "2. NATIONAL"). */
export type CvGroup = { id: string; title: string; entries: CvEntry[] };

/** Second level: A1.2, A1.3… Either a flat list or numbered groups. */
export type CvSubsection = {
  id: string;
  code: string;
  title: string;
  intro?: string;
  entries?: CvEntry[];
  groups?: CvGroup[];
};

/** First level: A1, A2… */
export type CvSection = { id: string; code: string; title: string; subsections: CvSubsection[] };

export type CvPage = {
  lang: Lang;
  slug: string;
  /** Slug of the same page in the other language, for the language switcher. */
  translationOf: string;
  title: string;
  subtitle?: string;
  /** Folder under public/docs/ holding this page's attachments. */
  docsFolder: string;
  sections: CvSection[];
};
