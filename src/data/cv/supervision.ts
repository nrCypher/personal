import type { CvEntry, Lang } from "./types";

type Bi = Record<Lang, string>;

type PhdStudent = {
  name: string;
  /** Thesis title as registered (kept in its original language). Empty until defined. */
  thesis: string;
  programme?: Bi;
  institution?: Bi;
  /** The other supervisors of the thesis. */
  coSupervisors?: string[];
};

const UMINHO: Bi = { pt: "Universidade do Minho", en: "University of Minho" };

/** Ongoing PhD supervisions. The CV counts are derived from this list. */
export const phdStudents: PhdStudent[] = [
  {
    name: "Pedro Nicolau Carvalho",
    thesis: "",
  },
  {
    name: "Ali Abbasi",
    thesis: "AI-Driven Virtual Power Plant Optimization via High-Performance Computing",
    programme: { pt: "Doutoramento em Informática", en: "Doctorate in Informatics" },
    institution: UMINHO,
    coSupervisors: ["João Luís Sobral"],
  },
  {
    name: "Guilherme Sousa Silva Martins",
    thesis: "Mathematical Optimization and Automated Infeasibility Resolution for Scheduling of Complex Industrial Problems",
    programme: {
      pt: "Programa Doutoral em Engenharia Industrial e de Sistemas",
      en: "Doctoral Programme in Industrial and Systems Engineering",
    },
    institution: UMINHO,
    coSupervisors: ["Maria Sameiro Carvalho"],
  },
  {
    name: "Filipe Novais",
    thesis: "",
  },
];

export function phdEntries(lang: Lang): CvEntry[] {
  return phdStudents.map((s) => {
    const where = [s.programme?.[lang], s.institution?.[lang]].filter(Boolean).join(", ");
    const withWhom = s.coSupervisors?.length
      ? `${lang === "pt" ? "Coorientação com" : "Co-supervised with"} ${s.coSupervisors.join(", ")}`
      : "";
    const meta = [where, withWhom].filter(Boolean).join(" · ") || undefined;
    return s.thesis ? { text: s.thesis, authors: s.name, meta } : { text: s.name, meta };
  });
}

export function phdSummary(lang: Lang): string {
  const n = phdStudents.length;
  return lang === "pt"
    ? `Orientação de ${n} doutoramentos em curso.`
    : `Supervision of ${n} PhD students in progress.`;
}
