import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Field, TextInput, TextArea } from "@/components/admin/FormField";
import { updateSettings } from "@/lib/actions/settings";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const settings = await prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
  const sp = await searchParams;
  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Site Settings" description="Edit your personal information, bio, contact details, and social links." />
      {sp.ok && <div className="mb-5 p-3 bg-emerald-50 border border-emerald-200 rounded text-sm text-emerald-700">Settings saved.</div>}
      <form action={updateSettings} className="card space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Full Name" htmlFor="fullName" required><TextInput name="fullName" defaultValue={settings.fullName} required /></Field>
          <Field label="Title" htmlFor="title"><TextInput name="title" defaultValue={settings.title} /></Field>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Institution" htmlFor="institution"><TextInput name="institution" defaultValue={settings.institution} /></Field>
          <Field label="Department" htmlFor="department"><TextInput name="department" defaultValue={settings.department} /></Field>
        </div>
        <Field label="Biography" htmlFor="bio" hint="Use empty lines to separate paragraphs."><TextArea name="bio" defaultValue={settings.bio} rows={8} /></Field>
        <Field label="Profile Photo URL" htmlFor="profilePhotoUrl"><TextInput name="profilePhotoUrl" defaultValue={settings.profilePhotoUrl} type="url" /></Field>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Email" htmlFor="email"><TextInput name="email" defaultValue={settings.email} type="email" /></Field>
          <Field label="Phone" htmlFor="phone"><TextInput name="phone" defaultValue={settings.phone} /></Field>
        </div>
        <Field label="Address" htmlFor="address"><TextArea name="address" defaultValue={settings.address} rows={2} /></Field>
        <Field label="Research Interests" htmlFor="researchInterests" hint="Comma-separated"><TextInput name="researchInterests" defaultValue={settings.researchInterests} /></Field>
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-base font-semibold text-slate-900 mb-3">Social / Academic Profiles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Google Scholar URL" htmlFor="googleScholarUrl"><TextInput name="googleScholarUrl" defaultValue={settings.googleScholarUrl} type="url" /></Field>
            <Field label="ORCID URL" htmlFor="orcidUrl"><TextInput name="orcidUrl" defaultValue={settings.orcidUrl} type="url" /></Field>
            <Field label="ResearchGate URL" htmlFor="researchGateUrl"><TextInput name="researchGateUrl" defaultValue={settings.researchGateUrl} type="url" /></Field>
            <Field label="LinkedIn URL" htmlFor="linkedinUrl"><TextInput name="linkedinUrl" defaultValue={settings.linkedinUrl} type="url" /></Field>
            <Field label="GitHub URL" htmlFor="githubUrl"><TextInput name="githubUrl" defaultValue={settings.githubUrl} type="url" /></Field>
          </div>
        </div>
        <div className="flex justify-end"><button type="submit" className="btn-primary">Save Changes</button></div>
      </form>
    </div>
  );
}
