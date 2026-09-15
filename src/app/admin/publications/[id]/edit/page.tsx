import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PublicationForm from "@/components/admin/PublicationForm";
import { updatePublication } from "@/lib/actions/publications";
import { prisma } from "@/lib/prisma";
export default async function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const idNum = Number(id);
  const item = await prisma.publication.findUnique({ where: { id: idNum } }); if (!item) notFound();
  async function action(formData: FormData) { "use server"; await updatePublication(idNum, formData); }
  return (<div><AdminPageHeader title="Edit Publication" /><PublicationForm action={action} publication={item} submitLabel="Save Changes" /></div>);
}
