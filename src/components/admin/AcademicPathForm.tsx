import type { AcademicPathEntry } from "@prisma/client";
import Link from "next/link";
import { Field, TextInput, TextArea, Select } from "./FormField";
import { ACADEMIC_PATH_CATEGORIES } from "@/types";

export default function AcademicPathForm({ action, entry, submitLabel }: { action: (formData: FormData) => Promise<void> | void; entry?: AcademicPathEntry; submitLabel: string }) {
  return (
    <form action={action} className="card space-y-5 max-w-3xl">
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Year" htmlFor="year" required><TextInput name="year" type="number" defaultValue={entry?.year} required /></Field>
        <Field label="End Year (optional)" htmlFor="endYear"><TextInput name="endYear" type="number" defaultValue={entry?.endYear ?? ""} /></Field>
        <Field label="Category" htmlFor="category" required><Select name="category" defaultValue={entry?.category} options={ACADEMIC_PATH_CATEGORIES} required /></Field>
      </div>
      <Field label="Title" htmlFor="title" required><TextInput name="title" defaultValue={entry?.title} required /></Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Institution" htmlFor="institution" required><TextInput name="institution" defaultValue={entry?.institution} required /></Field>
        <Field label="Location" htmlFor="location"><TextInput name="location" defaultValue={entry?.location} placeholder="City, Country" /></Field>
      </div>
      <Field label="Description" htmlFor="description"><TextArea name="description" defaultValue={entry?.description} /></Field>
      <Field label="Sort Order" htmlFor="sortOrder"><TextInput name="sortOrder" type="number" defaultValue={entry?.sortOrder ?? 0} /></Field>
      <div className="flex items-center justify-end gap-3"><Link href="/admin/academic-path" className="btn-secondary">Cancel</Link><button type="submit" className="btn-primary">{submitLabel}</button></div>
    </form>
  );
}
