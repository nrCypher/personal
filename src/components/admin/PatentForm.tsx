import type { Patent } from "@prisma/client";
import Link from "next/link";
import { Field, TextInput, TextArea } from "./FormField";

export default function PatentForm({ action, patent, submitLabel }: { action: (formData: FormData) => Promise<void> | void; patent?: Patent; submitLabel: string }) {
  return (
    <form action={action} className="card space-y-5 max-w-3xl">
      <Field label="Authors / Inventors" htmlFor="authors" required><TextInput name="authors" defaultValue={patent?.authors} required /></Field>
      <Field label="Title" htmlFor="title" required><TextInput name="title" defaultValue={patent?.title} required /></Field>
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Patent Number" htmlFor="patentNumber" required><TextInput name="patentNumber" defaultValue={patent?.patentNumber} required /></Field>
        <Field label="Country" htmlFor="country"><TextInput name="country" defaultValue={patent?.country} /></Field>
        <Field label="Date" htmlFor="date" required><TextInput name="date" defaultValue={patent?.date} required /></Field>
      </div>
      <Field label="URL" htmlFor="url"><TextInput name="url" type="url" defaultValue={patent?.url} /></Field>
      <Field label="Description" htmlFor="description"><TextArea name="description" defaultValue={patent?.description} /></Field>
      <Field label="Sort Order" htmlFor="sortOrder"><TextInput name="sortOrder" type="number" defaultValue={patent?.sortOrder ?? 0} /></Field>
      <div className="flex items-center justify-end gap-3"><Link href="/admin/patents" className="btn-secondary">Cancel</Link><button type="submit" className="btn-primary">{submitLabel}</button></div>
    </form>
  );
}
