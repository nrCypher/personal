"use client";
import { useTransition } from "react";

export default function DeleteButton({ action, label = "Delete", confirmMessage = "Are you sure you want to delete this item? This cannot be undone." }: { action: () => Promise<void>; label?: string; confirmMessage?: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button type="button" disabled={isPending} onClick={() => { if (confirm(confirmMessage)) { startTransition(async () => { await action(); }); } }} className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50">
      {isPending ? "Deleting…" : label}
    </button>
  );
}
