"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS, PLAN_ORDER, formatPrice, type PlanId } from "@/lib/plans";
import { gBtn, gText } from "@/lib/styles";

interface Props {
  /** Plan actual del usuario (se marca como "Plan actual"). */
  currentPlan?: PlanId;
  /** Se llama al elegir un plan de pago (aquí conectarás el checkout). */
  onSelect?: (plan: PlanId) => void;
}

export default function PricingCards({ currentPlan, onSelect }: Props) {
  return (
    <div className="mx-auto grid max-w-5xl gap-5 px-6 md:grid-cols-3">
      {PLAN_ORDER.map((id) => {
        const p = PLANS[id];
        const isCurrent = currentPlan === id;
        return (
          <div
            key={id}
            className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm ${
              p.highlighted ? "border-fm-purple ring-1 ring-fm-purple" : "border-violet-100"
            }`}
          >
            {p.highlighted && (
              <span className="absolute -top-3 left-6 rounded-full bg-fm-purple px-3 py-0.5 text-xs font-semibold text-white">
                Más popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-[#1a1a3e]">{p.name}</h3>
            <p className="mt-2 text-3xl font-bold" style={gText}>
              {formatPrice(p.price)}
              {p.price > 0 && <span className="text-sm font-normal text-fm-text-muted"> /mes</span>}
            </p>
            <p className="mt-1 text-sm font-medium text-fm-purple">{p.chats} chats con IA</p>

            <ul className="my-5 flex-1 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm font-light text-fm-text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-fm-purple" />
                  {f}
                </li>
              ))}
            </ul>

            {isCurrent ? (
              <span className="rounded-lg bg-violet-50 py-3 text-center text-sm font-semibold text-fm-purple">
                Plan actual
              </span>
            ) : id === "free" ? (
              <Link
                href="/cuestionario"
                className="rounded-lg border border-fm-purple py-3 text-center text-sm font-semibold text-fm-purple"
              >
                Empezar gratis
              </Link>
            ) : (
              <button
                onClick={() => onSelect?.(id)}
                className="rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={gBtn}
              >
                Elegir {p.name}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
