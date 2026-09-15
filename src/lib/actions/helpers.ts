import { auth } from "@/lib/auth";

export async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export function str(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export function reqStr(fd: FormData, key: string): string {
  const v = str(fd, key);
  if (!v) throw new Error(`Missing required field: ${key}`);
  return v;
}

export function numOpt(fd: FormData, key: string): number | null {
  const v = str(fd, key);
  if (!v) return null;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`Invalid number: ${key}`);
  return Math.trunc(n);
}

export function reqNum(fd: FormData, key: string): number {
  const n = numOpt(fd, key);
  if (n === null) throw new Error(`Missing required number: ${key}`);
  return n;
}

export function bool(fd: FormData, key: string): boolean {
  const v = fd.get(key);
  return v === "on" || v === "true" || v === "1";
}
