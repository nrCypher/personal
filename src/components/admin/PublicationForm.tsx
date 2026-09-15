import type { Publication } from "@prisma/client";
import Link from "next/link";
import { Field, TextInput, TextArea, Select } from "./FormField";
import { PUBLICATION_CATEGORIES } from "@/types";

export default function PublicationForm({ action, publication, submitLabel }: { action: (formData: FormData) => Promise<void> | void; publication?: Publication; submitLabel: string }) {
  return (
    <form action={action} className="card space-y-5 max-w-3xl">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Category" htmlFor="category" required><Select name="category" defaultValue={publication?.category} options={PUBLICATION_CATEGORIES} required /></Field>
        <Field label="Year" htmlFor="year" required><TextInput name="year" type="number" defaultValue={publication?.year} required /></Field>
      </div>
      <Field label="Authors" htmlFor="authors" required><TextInput name="authors" defaultValue={publication?.authors} required /></Field>
      <Field label="Title" htmlFor="title" required><TextInput name="title" defaultValue={publication?.title} required /></Field>
      <Field label="Venue" htmlFor="venue"><TextInput name="venue" defaultValue={publication?.venue} /></Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Volume" htmlFor="volume"><TextInput name="volume" defaultValue={publication?.volume} /></Field>
        <Field label="Pages" htmlFor="pages"><TextInput name="pages" defaultValue={publication?.pages} /></Field>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="DOI" htmlFor="doi"><TextInput name="doi" defaultValue={publication?.doi} /></Field>
        <Field label="URL" htmlFor="url"><TextInput name="url" type="url" defaultValue={publication?.url} /></Field>
      </div>
      <Field label="Abstract" htmlFor="abstract"><TextArea name="abstract" defaultValue={publication?.abstract} rows={5} /></Field>
      <Field label="Sort Order" htmlFor="sortOrder"><TextInput name="sortOrder" type="number" defaultValue={publication?.sortOrder ?? 0} /></Field>
      <div className="flex items-center justify-end gap-3"><Link href="/admin/publications" className="btn-secondary">Cancel</Link><button type="submit" className="btn-primary">{submitLabel}</button></div>
    </form>
  );
}
