import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PositionForm from "@/components/admin/PositionForm";
import { updatePosition } from "@/lib/actions/positions";
import { prisma } from "@/lib/prisma";
export default async function EditPositionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const idNum = Number(id);
  const item = await prisma.position.findUnique({ where: { id: idNum } }); if (!item) notFound();
  async function action(formData: FormData) { "use server"; await updatePosition(idNum, formData); }
  return (<div><AdminPageHeader title="Edit Position" /><PositionForm action={action} position={item} submitLabel="Save Changes" /></div>);
}
