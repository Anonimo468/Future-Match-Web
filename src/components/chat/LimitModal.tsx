"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import Link from "next/link";
import { PLANS, type PlanId } from "@/lib/plans";
import { gBtn } from "@/lib/styles";

interface Props {
  open: boolean;
  onClose: () => void;
  plan?: PlanId; // plan actual (por defecto, gratuito)
}

const NEXT: Record<PlanId, string> = {
  free: "Mejorá a Pro (7 chats) o Plus (12 chats) para seguir conversando.",
  pro: "Mejorá a Plus para tener hasta 12 chats.",
  plus: "Ya tenés el máximo de chats del plan Plus.",
};

export default function LimitModal({ open, onClose, plan = "free" }: Props) {
  const limit = PLANS[plan].chats;
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
              Alcanzaste tu límite de {limit} chats
            </h2>
            <p className="mb-8 text-center text-sm font-light leading-relaxed text-gray-600">
              Tu plan {PLANS[plan].name} incluye hasta {limit} chats. {NEXT[plan]} Podés seguir revisando los que
              ya tenés guardados desde el panel lateral.
            </p>
            {plan !== "plus" && (
              <Link
                href="/planes"
                className="mb-3 w-full rounded-lg py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={gBtn}
              >
                Ver planes
              </Link>
            )}
            <button onClick={onClose} className="text-sm text-gray-500 transition-colors hover:text-gray-700">
              Entendido
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
