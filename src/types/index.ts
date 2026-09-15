export const PUBLICATION_CATEGORIES = [
  { value: "journal", label: "Journal Articles" },
  { value: "conference", label: "Conference Papers" },
  { value: "book_chapter", label: "Book Chapters" },
  { value: "edited_book", label: "Edited Books" },
] as const;

export const STUDENT_CATEGORIES = [
  { value: "phd", label: "PhD Students" },
  { value: "msc", label: "MSc Students" },
  { value: "postdoc", label: "Postdoctoral Researchers" },
] as const;

export const ACADEMIC_PATH_CATEGORIES = [
  { value: "degree", label: "Academic Degree" },
  { value: "habilitation", label: "Habilitation" },
  { value: "career", label: "Career Milestone" },
  { value: "award", label: "Award / Distinction" },
] as const;

export const STUDENT_STATUSES = [
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "dropped", label: "Dropped" },
] as const;

export type PublicationCategory = (typeof PUBLICATION_CATEGORIES)[number]["value"];
export type StudentCategory = (typeof STUDENT_CATEGORIES)[number]["value"];
export type AcademicPathCategory = (typeof ACADEMIC_PATH_CATEGORIES)[number]["value"];
export type StudentStatus = (typeof STUDENT_STATUSES)[number]["value"];

export function categoryLabel<T extends { value: string; label: string }>(
  list: readonly T[], value: string
): string {
  return list.find((c) => c.value === value)?.label ?? value;
}

export function yearRange(start: number, end?: number | null): string {
  if (!end || end === start) return String(start);
  return `${start} – ${end}`;
}

export function yearRangeOrPresent(start: number, end?: number | null): string {
  if (!end) return `${start} – Present`;
  if (end === start) return String(start);
  return `${start} – ${end}`;
}
