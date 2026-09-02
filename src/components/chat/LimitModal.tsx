"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function LimitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-2xl"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">
              <Lock className="h-10 w-10 text-fm-purple" />
            </div>

            <h2 className="mb-3 text-center text-xl font-bold text-[#1a1a3e]">
              Alcanzaste tu límite de 3 chats
            </h2>

            <p className="mb-8 text-center text-sm font-light leading-relaxed text-gray-600">
              Tu cuenta gratuita incluye hasta 3 chats. Ya usaste los tuyos — podés seguir
              revisando los que ya tenés guardados desde el panel lateral.
            </p>

            <button
              onClick={onClose}
              className="mb-3 w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
            >
              Entendido
            </button>

            <Link
              href="/"
              className="text-sm text-gray-500 transition-colors hover:text-gray-700"
            >
              Volver al inicio
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
