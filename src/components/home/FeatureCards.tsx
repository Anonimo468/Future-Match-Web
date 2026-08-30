"use client";

import Image from "next/image";

const CARDS = [
  { img: "/images/icon-ai.webp", title: "Inteligencia Artificial Avanzada", desc: "Modelos de lenguaje analizan tus datos para ofrecerte orientación precisa." },
  { img: "/images/icon-target.webp", title: "Recomendaciones personalizadas", desc: "Recibe sugerencias de carreras y áreas alineadas con tu perfil único." },
  { img: "/images/icon-chart.webp", title: "Decisiones informadas", desc: "Toma decisiones informadas sobre tu futuro académico y profesional" },
  { img: "/images/icon-rocket.webp", title: "Herramientas de acompañamiento", desc: "Herramientas que te acompañan en cada paso de tu camino" },
];

export default function FeatureCards() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          className="rounded-2xl border border-gray-100 p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ boxShadow: "0 2px 24px rgba(124,58,237,.07)" }}
        >
          {CARDS.map(({ img, title, desc }, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="relative w-14 h-14 shrink-0">
                <Image src={img} alt="" fill className="object-contain" sizes="56px" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1a1a3e] mb-1.5 leading-snug">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
