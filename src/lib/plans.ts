/** Planes de Future Match. Fuente única para precios y límite de chats (frontend). */
export type PlanId = "free" | "pro" | "plus";

export interface Plan {
  id: PlanId;
  name: string;
  price: number; // USD por mes; 0 = gratis
  chats: number; // límite de chats del plan
  features: string[];
  highlighted?: boolean;
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: "free",
    name: "Estándar",
    price: 0,
    chats: 3,
    features: ["3 chats con IA (límite del plan)", "Cuestionario vocacional", "Recomendaciones de carreras"],
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 4.99,
    chats: 7,
    highlighted: true,
    features: ["Todo lo del Estándar", "7 chats con IA en total", "Comparador de carreras", "Historial de conversaciones"],
  },
  plus: {
    id: "plus",
    name: "Plus",
    price: 9.99,
    chats: 12,
    features: ["Todo lo del Pro", "12 chats con IA en total", "Plan de estudios personalizado", "Orientación prioritaria"],
  },
};

export const PLAN_ORDER: PlanId[] = ["free", "pro", "plus"];

export function formatPrice(price: number): string {
  return price === 0 ? "Gratis" : `$${price.toFixed(2)}`;
}
