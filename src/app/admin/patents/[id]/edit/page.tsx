import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PatentForm from "@/components/admin/PatentForm";
import { updatePatent } from "@/lib/actions/patents";
import { prisma } from "@/lib/prisma";
export default async function EditPatentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const idNum = Number(id);
  const item = await prisma.patent.findUnique({ where: { id: idNum } }); if (!item) notFound();
  async function action(formData: FormData) { "use server"; await updatePatent(idNum, formData); }
  return (<div><AdminPageHeader title="Edit Patent" /><PatentForm action={action} patent={item} submitLabel="Save Changes" /></div>);
}
