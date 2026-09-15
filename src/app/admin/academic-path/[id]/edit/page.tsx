import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AcademicPathForm from "@/components/admin/AcademicPathForm";
import { updateAcademicPathEntry } from "@/lib/actions/academic-path";
import { prisma } from "@/lib/prisma";

export default async function EditAcademicPathEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idNum = Number(id);
  const entry = await prisma.academicPathEntry.findUnique({ where: { id: idNum } });
  if (!entry) notFound();
  async function action(formData: FormData) { "use server"; await updateAcademicPathEntry(idNum, formData); }
  return (<div><AdminPageHeader title="Edit Academic Path Entry" /><AcademicPathForm action={action} entry={entry} submitLabel="Save Changes" /></div>);
}
