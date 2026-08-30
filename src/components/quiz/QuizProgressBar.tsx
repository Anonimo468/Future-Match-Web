"use client";

import { motion } from "framer-motion";

export default function QuizProgressBar({ current, total }: { current: number; total: number }) {
  const percent = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-[700px] items-center justify-between px-6 pb-2 text-xs font-medium text-gray-500">
        <span>
          Pregunta {current} de {total}
        </span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-1.5 w-full bg-violet-100">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg,#6d28d9,#a78bfa)" }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
