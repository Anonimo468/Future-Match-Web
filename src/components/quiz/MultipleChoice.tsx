"use client";

import { motion } from "framer-motion";

export default function MultipleChoice({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const selected = value === option;
        return (
          <motion.button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-colors ${
              selected
                ? "border-violet-600 bg-violet-50 text-violet-800"
                : "border-gray-200 bg-white text-gray-700 hover:border-violet-300"
            }`}
          >
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}
