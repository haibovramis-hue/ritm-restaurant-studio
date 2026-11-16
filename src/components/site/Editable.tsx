import { useEffect, useState } from "react";
/** Owner-editable value stored in this browser (demo). */
export function EditableInput({ id, placeholder, className = "", width = "w-20" }: { id: string; placeholder: string; className?: string; width?: string }) {
  const [v, setV] = useState("");
  useEffect(() => { setV(localStorage.getItem(`zp-${id}`) ?? ""); }, [id]);
  return (
    <input aria-label={placeholder} value={v} placeholder={placeholder}
      onChange={(e) => { setV(e.target.value); localStorage.setItem(`zp-${id}`, e.target.value); }}
      className={`${width} rounded border border-transparent bg-transparent px-1 py-0.5 text-center font-semibold placeholder:text-current placeholder:opacity-80 hover:border-dashed hover:border-current/30 focus:border-solid focus:border-current/40 focus:outline-none ${className}`} />
  );
}
export function EditableText({ id, text, className = "" }: { id: string; text: string; className?: string }) {
  const [saved, setSaved] = useState<string | null>(null);
  useEffect(() => { setSaved(localStorage.getItem(`zp-${id}`)); }, [id]);
  return (
    <p contentEditable suppressContentEditableWarning className={`rounded outline-none focus:ring-1 focus:ring-primary/50 ${className}`}
      onBlur={(e) => localStorage.setItem(`zp-${id}`, e.currentTarget.textContent ?? "")}>{saved ?? text}</p>
  );
}
