import type { Project } from "@prisma/client";
import Link from "next/link";
import { Field, TextInput, TextArea } from "./FormField";

export default function ProjectForm({ action, project, submitLabel }: { action: (formData: FormData) => Promise<void> | void; project?: Project; submitLabel: string }) {
  return (
    <form action={action} className="card space-y-5 max-w-3xl">
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Acronym" htmlFor="acronym"><TextInput name="acronym" defaultValue={project?.acronym} /></Field>
        <Field label="Start Year" htmlFor="startYear" required><TextInput name="startYear" type="number" defaultValue={project?.startYear} required /></Field>
        <Field label="End Year" htmlFor="endYear" hint="Leave empty if ongoing"><TextInput name="endYear" type="number" defaultValue={project?.endYear ?? ""} /></Field>
      </div>
      <Field label="Title" htmlFor="title" required><TextInput name="title" defaultValue={project?.title} required /></Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Role" htmlFor="role"><TextInput name="role" defaultValue={project?.role} /></Field>
        <Field label="Funder" htmlFor="funder"><TextInput name="funder" defaultValue={project?.funder} /></Field>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Reference" htmlFor="reference"><TextInput name="reference" defaultValue={project?.reference} /></Field>
        <Field label="URL" htmlFor="url"><TextInput name="url" type="url" defaultValue={project?.url} /></Field>
      </div>
      <Field label="Description" htmlFor="description"><TextArea name="description" defaultValue={project?.description} rows={5} /></Field>
      <Field label="Sort Order" htmlFor="sortOrder"><TextInput name="sortOrder" type="number" defaultValue={project?.sortOrder ?? 0} /></Field>
      <div className="flex items-center justify-end gap-3"><Link href="/admin/projects" className="btn-secondary">Cancel</Link><button type="submit" className="btn-primary">{submitLabel}</button></div>
    </form>
  );
}
