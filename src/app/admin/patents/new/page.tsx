import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PatentForm from "@/components/admin/PatentForm";
import { createPatent } from "@/lib/actions/patents";

export default function NewPatentPage() {
  return (<div><AdminPageHeader title="New Patent" /><PatentForm action={createPatent} submitLabel="Create" /></div>);
}
