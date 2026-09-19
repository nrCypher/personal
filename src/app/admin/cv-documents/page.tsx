import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { CV_ROUTES, pageHref } from "@/data/cv/routes";
import { formatSize, listDocuments } from "@/lib/cv-documents";
import { deleteCvDocument, uploadCvDocument } from "@/lib/actions/cv-documents";

export const metadata = { title: "CV Documents" };

const ERRORS: Record<string, string> = {
  empty: "Choose a file before uploading.",
  size: "That file is larger than the 25 MB limit.",
};

export default async function CvDocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ folder?: string; ok?: string; deleted?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const route = CV_ROUTES.find((r) => r.key === sp.folder) ?? CV_ROUTES[0];
  const files = await listDocuments(route.key);

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title="CV Documents"
        description="Attach PDFs to CV entries. Files live in public/docs/<folder>/ and are shared by the Portuguese and English versions of the page."
      />

      {sp.ok && <div className="mb-5 rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">Uploaded <strong>{sp.ok}</strong>.</div>}
      {sp.deleted && <div className="mb-5 rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">Deleted <strong>{sp.deleted}</strong>.</div>}
      {sp.error && <div className="mb-5 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{ERRORS[sp.error] ?? "Upload failed."}</div>}

      <nav className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {CV_ROUTES.map((r) => (
          <Link
            key={r.key}
            href={`/admin/cv-documents?folder=${r.key}`}
            className={`rounded-full px-3 py-1.5 text-sm no-underline ${
              r.key === route.key ? "bg-primary-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-primary-50"
            }`}
          >
            {r.en.label}
          </Link>
        ))}
      </nav>

      <div className="card mb-6">
        <h2 className="mb-1 text-base font-semibold text-slate-900">{route.en.label}</h2>
        <p className="mb-4 text-sm text-slate-600">
          Folder <code className="rounded bg-slate-100 px-1">public/docs/{route.key}/</code> ·{" "}
          <Link href={pageHref("en", route.en.slug)} target="_blank">view page</Link>
        </p>
        <form action={uploadCvDocument} className="flex flex-wrap items-center gap-3">
          <input type="hidden" name="folder" value={route.key} />
          <input type="file" name="file" required className="text-sm file:mr-3 file:rounded file:border-0 file:bg-primary-700 file:px-3 file:py-1.5 file:text-sm file:text-white" />
          <button type="submit" className="btn-primary">Upload</button>
        </form>
      </div>

      {files.length === 0 ? (
        <p className="text-sm text-slate-500">No documents in this folder yet.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="py-2">File</th>
              <th className="py-2">Size</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.name} className="border-b border-slate-100">
                <td className="py-2">
                  <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                  <div className="text-xs text-slate-400">
                    Reference it as <code className="rounded bg-slate-100 px-1">file: &quot;{file.name}&quot;</code>
                  </div>
                </td>
                <td className="py-2 text-slate-500">{formatSize(file.size)}</td>
                <td className="py-2 text-right">
                  <form action={deleteCvDocument}>
                    <input type="hidden" name="folder" value={file.folder} />
                    <input type="hidden" name="name" value={file.name} />
                    <button type="submit" className="btn-danger">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
