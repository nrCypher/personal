import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { CV_ROUTES } from "@/data/cv/routes";

export const DOCS_ROOT = path.join(process.cwd(), "public", "docs");

export const DOC_FOLDERS = CV_ROUTES.map((r) => r.key);

/** Rejects anything that is not one of the known page folders. */
export function safeFolder(folder: string): string {
  if (!DOC_FOLDERS.includes(folder)) throw new Error(`Unknown document folder: ${folder}`);
  return folder;
}

/**
 * Keeps uploads inside their folder: no separators, no traversal, no dotfiles.
 * Spaces and accents collapse to a plain ASCII-ish slug so URLs stay clean.
 */
export function safeFileName(name: string): string {
  const base = path.basename(name).normalize("NFKD").replace(/[̀-ͯ]/g, "");
  const cleaned = base.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^[.-]+/, "").replace(/-+/g, "-");
  if (!cleaned || cleaned === "." || cleaned === "..") throw new Error("Invalid file name");
  return cleaned.slice(0, 120);
}

export type CvDocument = { name: string; size: number; folder: string; url: string };

export async function listDocuments(folder: string): Promise<CvDocument[]> {
  const dir = path.join(DOCS_ROOT, safeFolder(folder));
  let names: string[];
  try {
    names = await readdir(dir);
  } catch {
    return [];
  }
  const files = await Promise.all(
    names
      .filter((n) => !n.startsWith(".") && n !== "README.md")
      .map(async (name) => {
        const info = await stat(path.join(dir, name));
        return info.isFile() ? { name, size: info.size, folder, url: `/docs/${folder}/${name}` } : null;
      })
  );
  return files.filter((f): f is CvDocument => f !== null).sort((a, b) => a.name.localeCompare(b.name));
}

export const formatSize = (bytes: number) =>
  bytes < 1024 ? `${bytes} B` : bytes < 1024 ** 2 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 ** 2).toFixed(1)} MB`;
