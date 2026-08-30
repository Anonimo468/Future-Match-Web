"use client";

import Image from "next/image";
import { gText, gBtn } from "@/lib/styles";

const STEPS = [
  { n: "1", title: "Responde evaluaciones", desc: "Tests inteligentes sobre tus intereses, habilidades, valores y personalidad." },
  { n: "2", title: "Analizamos tu perfil", desc: "Nuestra IA procesa la información y encuentra patrones clave." },
  { n: "3", title: "Recibe recomendaciones", desc: "Te mostramos carreras y profesiones que mejor se adaptan a ti." },
  { n: "4", title: "Explora y compara", desc: "Conoce más sobre cada opción y compara tu nivel de compatibilidad." },
  { n: "5", title: "Decide tu futuro", desc: "Tú eliges el camino. Nosotros te acompañamos." },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[1.85rem] font-bold text-center text-[#1a1a3e] mb-14">
          ¿Cómo funciona <span style={gText}>Future Match</span>?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {STEPS.map(({ n, title, desc }) => (
            <div key={n} className="flex flex-col items-center text-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3 shadow-md"
                style={gBtn}
              >
                {n}
              </div>
              <div className="relative w-[60px] h-[60px] mb-3">
                <Image src="/images/icon-user-star.webp" alt="" fill className="object-contain" sizes="60px" />
              </div>
              <h4 className="text-sm font-semibold text-[#1a1a3e] mb-2">{title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
