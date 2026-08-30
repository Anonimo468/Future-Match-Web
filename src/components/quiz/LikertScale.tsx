"use client";

import { motion } from "framer-motion";

export default function LikertScale({
  value,
  onChange,
  scaleLabels,
}: {
  value: number | null;
  onChange: (value: number) => void;
  scaleLabels: [string, string, string, string, string];
}) {
  return (
    <div className="flex flex-col gap-3">
      {scaleLabels.map((label, i) => {
        const optionValue = i + 1;
        const selected = value === optionValue;
        return (
          <motion.button
            key={optionValue}
            type="button"
            onClick={() => onChange(optionValue)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
              selected
                ? "border-violet-600 bg-violet-50"
                : "border-gray-200 bg-white hover:border-violet-300"
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                selected ? "border-violet-600 bg-violet-600 text-white" : "border-gray-300 text-gray-400"
              }`}
            >
              {optionValue}
            </span>
            <span className={`text-sm font-medium ${selected ? "text-violet-800" : "text-gray-700"}`}>
              {label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
