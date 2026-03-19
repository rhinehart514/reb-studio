"use client";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "url" | "email" | "tel";
}

export function InputField({ label, value, onChange, placeholder, type = "text" }: InputFieldProps) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#141414] border border-[#262626] rounded-md px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-violet-600/50 transition-colors duration-150"
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextAreaField({ label, value, onChange, placeholder, rows = 3 }: TextAreaFieldProps) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-[#141414] border border-[#262626] rounded-md px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-violet-600/50 transition-colors duration-150 resize-none"
      />
    </div>
  );
}

interface SaveBarProps {
  saving: boolean;
  onSave: () => void;
  dirty: boolean;
}

export function SaveBar({ saving, onSave, dirty }: SaveBarProps) {
  if (!dirty && !saving) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-[#262626] px-6 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          {saving ? "Saving..." : "Unsaved changes"}
        </span>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-5 py-2 rounded-md bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 text-sm font-medium text-white transition-colors duration-150"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
