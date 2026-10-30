"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import PricingCards from "@/components/pricing/PricingCards";
import { gText } from "@/lib/styles";
import { PLANS, type PlanId } from "@/lib/plans";
import { getChatQuota } from "@/lib/quota";
import { createClient } from "@/lib/supabase/client";

export default function PlanesPage() {
  const router = useRouter();
  const supabase = createClient();
  const [currentPlan, setCurrentPlan] = useState<PlanId | undefined>(undefined);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      const token = data.session?.access_token;
      if (!token) return;

      try {
        const quota = await getChatQuota(token);
        if (active) setCurrentPlan(quota.plan);
      } catch {
        if (active) setCurrentPlan("free");
      }
    });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSelect(plan: PlanId) {
    if (plan === "free") return;

    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.push("/iniciar-sesion?next=/planes");
      return;
    }

    setNotice(`Pago próximamente: el plan ${PLANS[plan].name} estará disponible pronto.`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f8ff]">
      <Navbar />
      <main className="flex-1 px-6 pb-16 pt-[170px]">
        <h1 className="mb-2 text-center text-3xl font-bold text-[#1a1a3e]">
          Elegí tu <span style={gText}>plan</span>
        </h1>
        <p className="mb-8 text-center text-sm font-light text-fm-text-muted">
          Más chats con IA para explorar tu futuro. Cada plan incluye todo lo del anterior.
        </p>

        {notice && (
          <div
            role="status"
            className="mx-auto mb-8 max-w-2xl rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-center text-sm font-medium text-fm-purple"
          >
            {notice}
          </div>
        )}

        <PricingCards currentPlan={currentPlan} onSelect={handleSelect} />
      </main>
      <Footer />
    </div>
  );
}
