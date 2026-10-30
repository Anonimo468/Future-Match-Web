import type { PlanId } from "@/lib/plans";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface ChatQuota {
  plan: PlanId;
  limit: number;
  used: number;
}

/** Plan del usuario, límite de chats y cuántos lleva usados (lo calcula el backend). */
export async function getChatQuota(accessToken: string): Promise<ChatQuota> {
  const res = await fetch(`${API_URL}/api/chats/quota`, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("No se pudo cargar tu plan");
  return res.json();
}
