import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PositionForm from "@/components/admin/PositionForm";
import { createPosition } from "@/lib/actions/positions";
export default function NewPositionPage() { return (<div><AdminPageHeader title="New Position" /><PositionForm action={createPosition} submitLabel="Create" /></div>); }
