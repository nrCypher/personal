import Link from "next/link";

export default function AdminPageHeader({ title, description, action }: { title: string; description?: string; action?: { href: string; label: string } }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
      </div>
      {action && <Link href={action.href} className="btn-primary">{action.label}</Link>}
    </div>
  );
}
