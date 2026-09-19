"use server";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, reqStr } from "./helpers";
import { DOCS_ROOT, safeFileName, safeFolder } from "@/lib/cv-documents";

const MAX_BYTES = 25 * 1024 * 1024;

export async function uploadCvDocument(formData: FormData) {
  await requireAdmin();
  const folder = safeFolder(reqStr(formData, "folder"));
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) redirect(`/admin/cv-documents?folder=${folder}&error=empty`);
  if (file.size > MAX_BYTES) redirect(`/admin/cv-documents?folder=${folder}&error=size`);

  const name = safeFileName(file.name);
  const dir = path.join(DOCS_ROOT, folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  revalidatePath("/admin/cv-documents");
  redirect(`/admin/cv-documents?folder=${folder}&ok=${encodeURIComponent(name)}`);
}

export async function deleteCvDocument(formData: FormData) {
  await requireAdmin();
  const folder = safeFolder(reqStr(formData, "folder"));
  const name = safeFileName(reqStr(formData, "name"));
  await unlink(path.join(DOCS_ROOT, folder, name)).catch(() => {});

  revalidatePath("/admin/cv-documents");
  redirect(`/admin/cv-documents?folder=${folder}&deleted=${encodeURIComponent(name)}`);
}
