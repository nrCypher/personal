import type { CvGroup, CvPage, CvSection, Lang } from "../types";
import { routeByKey } from "../routes";
import { profile } from "../profile";
import { L, t } from "./labels";
import { byDateDesc, fundingEntry, roleEntry, workEntry, range } from "../helpers";
import { phdEntries, phdSummary } from "../supervision";
import type { Funding, Role, Work } from "../helpers";
import worksJson from "../orcid/works.json";
import fundingsJson from "../orcid/fundings.json";
import employmentsJson from "../orcid/employments.json";
import educationJson from "../orcid/education.json";
import activitiesJson from "../orcid/activities.json";

const works = (worksJson as Work[]).filter((w) => !w.hidden);
const fundings = fundingsJson as Funding[];
const employments = employmentsJson as Role[];
const education = educationJson as Role[];
const activities = activitiesJson as Role[];

const byType = (...types: string[]) => works.filter((w) => types.includes(w.type)).sort(byDateDesc);
const lectures = works.filter((w) => w.type === "lecture-speech");
const lecturesAt = (fragment: string) =>
  lectures.filter((w) => (w.venue ?? "").toLowerCase().includes(fragment.toLowerCase())).sort(byDateDesc);

function page(key: string, lang: Lang, subtitle: string, title: string, sections: CvSection[]): CvPage {
  const route = routeByKey(key)!;
  return {
    lang,
    slug: route[lang].slug,
    translationOf: route[lang === "pt" ? "en" : "pt"].slug,
    title,
    subtitle,
    docsFolder: key,
    sections,
  };
}

/** PhD students (with thesis titles) and MSc co-supervision, shared by the scientific and pedagogical pages. */
function supervisionBase(lang: Lang, idPrefix: string): CvGroup[] {
  return [
    { id: `${idPrefix}-1`, title: lang === "pt" ? "Doutoramento" : "PhD", entries: phdEntries(lang) },
    {
      id: `${idPrefix}-2`,
      title: lang === "pt" ? "Mestrado" : "MSc",
      entries: [
        { text: lang === "pt" ? "Coorientação de várias dissertações de mestrado concluídas." : "Co-supervision of several concluded MSc theses." },
      ],
    },
  ];
}

/* ---------------------------------------------------------------- summary */

function summary(lang: Lang): CvPage {
  const ongoing = employments.filter((e) => !e.end).sort(byDateDesc);
  const past = employments.filter((e) => e.end).sort(byDateDesc);
  return page("summary", lang, t(L.summarySub, lang), t(L.summaryTitle, lang), [
    {
      id: "s1", code: "1", title: t(L.profile, lang),
      subsections: [
        { id: "s1-1", code: "1.1", title: t(L.biography, lang), entries: profile.bio[lang].map((p) => ({ text: p })) },
        { id: "s1-2", code: "1.2", title: t(L.researchAreas, lang), entries: profile.keywords.map((k) => ({ text: k })) },
      ],
    },
    {
      id: "s2", code: "2", title: t(L.keyFigures, lang),
      subsections: [
        {
          id: "s2-1", code: "2.1", title: t(L.bibliometrics, lang),
          entries: profile.metrics[lang].map((m) => ({ text: m.label, meta: m.value })),
        },
      ],
    },
    {
      id: "s3", code: "3", title: t(L.academicBackground, lang),
      subsections: [
        {
          id: "s3-1", code: "3.1", title: t(L.degrees, lang),
          entries: education.filter((e) => e.kind === "education").sort(byDateDesc).map((e) => roleEntry(e, lang)),
        },
        {
          id: "s3-2", code: "3.2", title: t(L.furtherTraining, lang),
          entries: education.filter((e) => e.kind === "qualification").map((e) => roleEntry(e, lang)),
        },
      ],
    },
    {
      id: "s4", code: "4", title: t(L.careerPath, lang),
      subsections: [
        { id: "s4-1", code: "4.1", title: t(L.currentPositions, lang), entries: ongoing.map((e) => roleEntry(e, lang)) },
        { id: "s4-2", code: "4.2", title: t(L.previousPositions, lang), entries: past.map((e) => roleEntry(e, lang)) },
      ],
    },
  ]);
}

/* ------------------------------------------------------------- scientific */

function scientific(lang: Lang): CvPage {
  const coordination = fundings.filter((f) => f.role === "coordination");
  const participation = fundings.filter((f) => f.role === "participation");
  const scoped = (list: Funding[], scope: Funding["scope"]) =>
    list.filter((f) => f.scope === scope).sort(byDateDesc).map((f) => fundingEntry(f, lang));

  const supervisionGroups = [
    ...supervisionBase(lang, "a3-1"),
    {
      id: "a3-1-3",
      title: lang === "pt" ? "Bolseiros e investigadores" : "Grantees and researchers",
      entries: [
        lang === "pt"
          ? { text: "Responsável pelo programa de trabalhos de bolseiros e investigadores do grupo DAE (DTx)." }
          : { text: "Responsible for the work programme of grantees and researchers of the DAE group at DTx." },
      ],
    },
  ];

  const committeeNote = lang === "pt"
    ? [{ text: "Presidente da Comissão Científica ou Organizadora de várias conferências e workshops internacionais." }]
    : [{ text: "Chair of the Scientific or Organizing Committee of several international conferences and workshops." }];

  const ifac = lang === "pt"
    ? { text: "Membro do Comité Técnico da IFAC", meta: "IFAC" }
    : { text: "Member of the IFAC Technical Committee", meta: "IFAC" };

  return page("scientific", lang, t(L.scientificSub, lang), t(L.scientificTitle, lang), [
    {
      id: "a1", code: "A1", title: t(L.scientificProduction, lang),
      subsections: [
        { id: "a1-1", code: "A1.1", title: t(L.journalArticles, lang), entries: byType("journal-article").map(workEntry) },
        { id: "a1-2", code: "A1.2", title: t(L.booksChapters, lang), entries: byType("book", "book-chapter").map(workEntry) },
        { id: "a1-3", code: "A1.3", title: t(L.conferencePapers, lang), entries: byType("conference-paper").map(workEntry) },
        { id: "a1-4", code: "A1.4", title: t(L.preprints, lang), entries: byType("preprint").map(workEntry) },
        { id: "a1-5", code: "A1.5", title: t(L.datasetsSoftware, lang), entries: byType("data-set", "software").map(workEntry) },
      ],
    },
    {
      id: "a2", code: "A2", title: t(L.scientificProjects, lang),
      subsections: [
        {
          id: "a2-1", code: "A2.1", title: t(L.projectCoordination, lang),
          groups: [
            { id: "a2-1-1", title: t(L.international, lang), entries: scoped(coordination, "international") },
            { id: "a2-1-2", title: t(L.national, lang), entries: scoped(coordination, "national") },
          ],
        },
        {
          id: "a2-2", code: "A2.2", title: t(L.projectParticipation, lang),
          groups: [
            { id: "a2-2-1", title: t(L.international, lang), entries: scoped(participation, "international") },
            { id: "a2-2-2", title: t(L.national, lang), entries: scoped(participation, "national") },
          ],
        },
      ],
    },
    {
      id: "a3", code: "A3", title: t(L.scientificTeams, lang),
      subsections: [
        { id: "a3-1", code: "A3.1", title: t(L.supervision, lang), intro: phdSummary(lang), groups: supervisionGroups },
        {
          id: "a3-2", code: "A3.2", title: t(L.researchUnits, lang),
          entries: activities.filter((a) => a.kind === "membership").sort(byDateDesc).map((a) => roleEntry(a, lang)),
        },
      ],
    },
    {
      id: "a4", code: "A4", title: t(L.scientificRecognition, lang),
      subsections: [
        {
          id: "a4-1", code: "A4.1", title: t(L.technicalCommittees, lang),
          entries: [
            ifac,
            ...activities
              .filter((a) => a.kind === "membership" && a.org.startsWith("IEEE"))
              .map((a) => roleEntry(a, lang)),
          ],
        },
        { id: "a4-2", code: "A4.2", title: t(L.conferenceCommittees, lang), entries: committeeNote },
        {
          id: "a4-3", code: "A4.3", title: t(L.awards, lang),
          entries: activities.filter((a) => a.kind === "distinction").map((a) => roleEntry(a, lang)),
        },
      ],
    },
  ]);
}

/* ------------------------------------------------------------ pedagogical */

function pedagogical(lang: Lang): CvPage {
  return page("pedagogical", lang, t(L.pedagogicalSub, lang), t(L.pedagogicalTitle, lang), [
    {
      id: "b1", code: "B1", title: t(L.teachingActivity, lang),
      subsections: [
        {
          id: "b1-1", code: "B1.1", title: "Universidade Católica Portuguesa",
          entries: lecturesAt("Católica").map(workEntry),
        },
        {
          id: "b1-2", code: "B1.2", title: "Universidade da Maia / ISMAI",
          entries: [...lecturesAt("Maia"), ...lecturesAt("ISMAI")].sort(byDateDesc).map(workEntry),
        },
        {
          id: "b1-3", code: "B1.3", title: "Instituto Politécnico de Bragança",
          entries: lecturesAt("Bragança").map(workEntry),
        },
      ],
    },
    {
      id: "b2", code: "B2", title: t(L.teachingPositions, lang),
      subsections: [
        {
          id: "b2-1", code: "B2.1", title: t(L.currentPositions, lang),
          entries: activities.filter((a) => a.kind === "invited-position").sort(byDateDesc).map((a) => roleEntry(a, lang)),
        },
        {
          id: "b2-2", code: "B2.2", title: t(L.previousPositions, lang),
          entries: employments
            .filter((e) => /Professor|Assistente/i.test(e.role ?? "") && e.end)
            .sort(byDateDesc)
            .map((e) => roleEntry(e, lang)),
        },
      ],
    },
    {
      id: "b3", code: "B3", title: t(L.pedagogicalSupervision, lang),
      subsections: [
        { id: "b3-1", code: "B3.1", title: t(L.supervision, lang), intro: phdSummary(lang), groups: supervisionBase(lang, "b3-1") },
      ],
    },
    {
      id: "b4", code: "B4", title: t(L.trainingReceived, lang),
      subsections: [
        {
          id: "b4-1", code: "B4.1", title: t(L.furtherTraining, lang),
          entries: education.filter((e) => e.kind === "qualification").map((e) => roleEntry(e, lang)),
        },
      ],
    },
  ]);
}

/* --------------------------------------------------------------- other */

function other(lang: Lang): CvPage {
  const coordinationRoles = employments
    .filter((e) => /Coordinator|Principal Investigator/i.test(e.role ?? ""))
    .sort(byDateDesc)
    .map((e) => roleEntry(e, lang));

  const industry = fundings.filter((f) => f.type === "salary-award").sort(byDateDesc).map((f) => fundingEntry(f, lang));
  const hubs = fundings.filter((f) => /DIH|Innovation Hub|Connect 5/i.test(f.title)).sort(byDateDesc).map((f) => fundingEntry(f, lang));
  const software = works.filter((w) => w.type === "software").map(workEntry);

  const teamNote = lang === "pt"
    ? [{ text: "Coordenação de um grupo multidisciplinar com mais de 42 investigadores e engenheiros de software.", meta: "DTx — Digital Transformation CoLAB" },
       { text: "Responsável por projetos que somam mais de 6 M€ de investimento.", meta: "DTx — Digital Transformation CoLAB" }]
    : [{ text: "Coordination of a multidisciplinary group of over 42 researchers and software developers.", meta: "DTx — Digital Transformation CoLAB" },
       { text: "Responsible for projects exceeding €6M in total investment.", meta: "DTx — Digital Transformation CoLAB" }];

  return page("other", lang, t(L.otherSub, lang), t(L.otherTitle, lang), [
    {
      id: "c1", code: "C1", title: t(L.management, lang),
      subsections: [
        { id: "c1-1", code: "C1.1", title: t(L.groupCoordination, lang), entries: [...coordinationRoles, ...teamNote] },
        { id: "c1-2", code: "C1.2", title: t(L.projectManagement, lang), entries: industry },
      ],
    },
    {
      id: "c2", code: "C2", title: t(L.techTransfer, lang),
      subsections: [
        { id: "c2-1", code: "C2.1", title: t(L.innovationHubs, lang), entries: hubs },
        { id: "c2-2", code: "C2.2", title: t(L.softwareProducts, lang), entries: software },
      ],
    },
    {
      id: "c3", code: "C3", title: t(L.professionalAssoc, lang),
      subsections: [
        {
          id: "c3-1", code: "C3.1", title: t(L.memberships, lang),
          entries: activities.filter((a) => a.kind === "membership").sort(byDateDesc).map((a) => roleEntry(a, lang)),
        },
      ],
    },
    {
      id: "c4", code: "C4", title: t(L.distinctions, lang),
      subsections: [
        {
          id: "c4-1", code: "C4.1", title: t(L.awards, lang),
          entries: activities.filter((a) => a.kind === "distinction").map((a) => roleEntry(a, lang)),
        },
      ],
    },
  ]);
}

/* ------------------------------------------------------------- contacts */

function contacts(lang: Lang): CvPage {
  const phoneLabel = lang === "pt" ? "Telefone (DTx)" : "Telephone (DTx)";
  // Google Scholar's user token means nothing on its own, so it is not repeated in the label.
  const idRows = profile.ids.map((i) => ({
    label: i.label === "Google Scholar" ? i.label : `${i.label}: ${i.value}`,
    urls: [i.url],
  }));

  return page("contacts", lang, t(L.contactsSub, lang), t(L.contactsTitle, lang), [
    {
      id: "d1", code: "1", title: t(L.contactDetails, lang),
      subsections: [
        {
          id: "d1-1", code: "1.1", title: t(L.institutionalAddress, lang),
          lines: profile.address.map((text) => ({ text })),
        },
        {
          id: "d1-2", code: "1.2", title: t(L.contacts, lang),
          lines: [
            { label: "E-mail", text: profile.email, url: `mailto:${profile.email}` },
            { label: phoneLabel, text: profile.phone, url: `tel:${profile.phone.replace(/\s/g, "")}` },
          ],
        },
        {
          id: "d1-3", code: "1.3", title: t(L.onlineInformation, lang),
          linkTable: {
            head: [t(L.designation, lang), t(L.webpage, lang)],
            rows: [
              ...profile.institutionalPages.map((p) => ({ label: p.label, urls: [p.url] })),
              ...idRows,
              { label: "LinkedIn", urls: [profile.linkedin] },
            ],
          },
        },
      ],
    },
  ]);
}

/* ---------------------------------------------------------------- public */

const BUILDERS: Record<string, (lang: Lang) => CvPage> = {
  summary, scientific, pedagogical, other, contacts,
};

export function buildCvPage(key: string, lang: Lang): CvPage | undefined {
  return BUILDERS[key]?.(lang);
}

export { range };
