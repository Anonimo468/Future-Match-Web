"use client";

export default function OpenEnded({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={5}
      className="w-full resize-none rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-700 placeholder-gray-400 outline-none transition-colors focus:border-violet-500"
    />
  );
}
