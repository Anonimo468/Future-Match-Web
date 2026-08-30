"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export default function QuizFooter({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  isLast,
}: {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isLast: boolean;
}) {
  return (
    <div className="w-full border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-[700px] items-center justify-between px-6 py-5">
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-violet-700 disabled:opacity-0"
        >
          <ArrowLeft className="h-4 w-4" />
          Atrás
        </button>

        <motion.button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          whileHover={canGoNext ? { scale: 1.05 } : undefined}
          whileTap={canGoNext ? { scale: 0.97 } : undefined}
          className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-700/30 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
        >
          {isLast ? (
            <>
              Finalizar
              <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
