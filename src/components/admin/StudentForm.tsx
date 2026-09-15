import type { Student } from "@prisma/client";
import Link from "next/link";
import { Field, TextInput, Select } from "./FormField";
import { STUDENT_CATEGORIES, STUDENT_STATUSES } from "@/types";

export default function StudentForm({ action, student, submitLabel }: { action: (formData: FormData) => Promise<void> | void; student?: Student; submitLabel: string }) {
  return (
    <form action={action} className="card space-y-5 max-w-3xl">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Name" htmlFor="name" required><TextInput name="name" defaultValue={student?.name} required /></Field>
        <Field label="Category" htmlFor="category" required><Select name="category" defaultValue={student?.category} options={STUDENT_CATEGORIES} required /></Field>
      </div>
      <Field label="Thesis / Research Title" htmlFor="thesisTitle"><TextInput name="thesisTitle" defaultValue={student?.thesisTitle} /></Field>
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Start Year" htmlFor="startYear" required><TextInput name="startYear" type="number" defaultValue={student?.startYear} required /></Field>
        <Field label="End Year" htmlFor="endYear" hint="Leave empty if ongoing"><TextInput name="endYear" type="number" defaultValue={student?.endYear ?? ""} /></Field>
        <Field label="Status" htmlFor="status"><Select name="status" defaultValue={student?.status ?? "ongoing"} options={STUDENT_STATUSES} /></Field>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Co-Supervisor" htmlFor="coSupervisor"><TextInput name="coSupervisor" defaultValue={student?.coSupervisor} /></Field>
        <Field label="Institution" htmlFor="institution"><TextInput name="institution" defaultValue={student?.institution} /></Field>
      </div>
      <Field label="Sort Order" htmlFor="sortOrder"><TextInput name="sortOrder" type="number" defaultValue={student?.sortOrder ?? 0} /></Field>
      <div className="flex items-center justify-end gap-3"><Link href="/admin/students" className="btn-secondary">Cancel</Link><button type="submit" className="btn-primary">{submitLabel}</button></div>
    </form>
  );
}
