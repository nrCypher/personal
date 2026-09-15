import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PublicationForm from "@/components/admin/PublicationForm";
import { createPublication } from "@/lib/actions/publications";

export default function NewPublicationPage() {
  return (<div><AdminPageHeader title="New Publication" /><PublicationForm action={createPublication} submitLabel="Create" /></div>);
}
