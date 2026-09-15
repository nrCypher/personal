import type { ReactNode } from "react";

export function Field({ label, htmlFor, hint, children, required }: { label: string; htmlFor: string; hint?: string; required?: boolean; children: ReactNode }) {
  return (<div><label htmlFor={htmlFor} className="label">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>{children}{hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}</div>);
}

export function TextInput({ name, defaultValue, required, type = "text", placeholder }: { name: string; defaultValue?: string | number | null; required?: boolean; type?: string; placeholder?: string }) {
  return <input id={name} name={name} type={type} required={required} defaultValue={defaultValue ?? undefined} placeholder={placeholder} className="input" />;
}

export function TextArea({ name, defaultValue, required, rows = 4, placeholder }: { name: string; defaultValue?: string | null; required?: boolean; rows?: number; placeholder?: string }) {
  return <textarea id={name} name={name} required={required} rows={rows} defaultValue={defaultValue ?? undefined} placeholder={placeholder} className="textarea" />;
}

export function Select({ name, defaultValue, required, options }: { name: string; defaultValue?: string | null; required?: boolean; options: readonly { value: string; label: string }[] }) {
  return (<select id={name} name={name} required={required} defaultValue={defaultValue ?? undefined} className="input bg-white"><option value="">—</option>{options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>);
}

export function Checkbox({ name, defaultChecked, label }: { name: string; defaultChecked?: boolean; label: string }) {
  return (<label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer"><input id={name} name={name} type="checkbox" defaultChecked={defaultChecked} className="rounded border-slate-300 text-primary-700 focus:ring-primary-500" />{label}</label>);
}
