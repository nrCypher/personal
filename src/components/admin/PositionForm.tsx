import type { Position } from "@prisma/client";
import Link from "next/link";
import { Field, TextInput, TextArea, Checkbox } from "./FormField";

export default function PositionForm({ action, position, submitLabel }: { action: (formData: FormData) => Promise<void> | void; position?: Position; submitLabel: string }) {
  return (
    <form action={action} className="card space-y-5 max-w-3xl">
      <Field label="Title" htmlFor="title" required><TextInput name="title" defaultValue={position?.title} required /></Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Institution" htmlFor="institution" required><TextInput name="institution" defaultValue={position?.institution} required /></Field>
        <Field label="Department" htmlFor="department"><TextInput name="department" defaultValue={position?.department} /></Field>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Start Year" htmlFor="startYear" required><TextInput name="startYear" type="number" defaultValue={position?.startYear} required /></Field>
        <Field label="End Year" htmlFor="endYear" hint="Leave empty if current"><TextInput name="endYear" type="number" defaultValue={position?.endYear ?? ""} /></Field>
      </div>
      <Checkbox name="isCurrent" defaultChecked={position?.isCurrent} label="This is a current position" />
      <Field label="Description" htmlFor="description"><TextArea name="description" defaultValue={position?.description} /></Field>
      <Field label="Sort Order" htmlFor="sortOrder"><TextInput name="sortOrder" type="number" defaultValue={position?.sortOrder ?? 0} /></Field>
      <div className="flex items-center justify-end gap-3"><Link href="/admin/positions" className="btn-secondary">Cancel</Link><button type="submit" className="btn-primary">{submitLabel}</button></div>
    </form>
  );
}
