"use client";

import { gText } from "@/lib/styles";
import Boton from "./Boton";

function AreaIconSocial() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="13" cy="13" r="4" stroke="#7c3aed" strokeWidth="2" />
      <path d="M5 29c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
      <circle cx="25" cy="11" r="3" stroke="#7c3aed" strokeWidth="1.8" opacity=".7" />
      <path d="M20 27c0-3.3 2.2-6 5-6.4" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}
function AreaIconComm() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M6 10a3 3 0 013-3h18a3 3 0 013 3v10a3 3 0 01-3 3H10l-4 4V10z" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 16h12M12 21h7" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function AreaIconPsych() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 8c-5.5 0-9 3.5-9 8 0 2.5 1.2 4.7 3 6.1V25a1 1 0 001 1h10a1 1 0 001-1v-2.9c1.8-1.4 3-3.6 3-6.1 0-4.5-3.5-8-9-8z" stroke="#ec4899" strokeWidth="2" />
      <path d="M15 18h6M18 15v6" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function AreaIconTech() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="5" y="9" width="26" height="17" rx="2" stroke="#0ea5e9" strokeWidth="2" />
      <path d="M13 30h10M18 26v4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 19l4-4 3 3 4-5 4 3" stroke="#0ea5e9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function AreaIconHealth() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 28S7 21.5 7 14a6 6 0 0111-3.4A6 6 0 0129 14c0 7.5-11 14-11 14z" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 17h8M18 13v8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const AREAS = [
  { bg: "#f3f0ff", icon: <AreaIconSocial />, name: "Ciencias Sociales", desc: "Comprende a las personas y genera impacto positivo en la sociedad." },
  { bg: "#eff6ff", icon: <AreaIconComm />, name: "Comunicación", desc: "Informa, conecta y transforma ideas en mensajes poderosos." },
  { bg: "#fdf2f8", icon: <AreaIconPsych />, name: "Psicología", desc: "Entiende la mente humana y ayuda a otros a crecer y desarrollarse." },
  { bg: "#f0f9ff", icon: <AreaIconTech />, name: "Ingeniería y Tecnología", desc: "Crea soluciones innovadoras y transforma el mundo con tecnología..." },
  { bg: "#fff1f2", icon: <AreaIconHealth />, name: "Salud", desc: "Mejora la calidad de vida y promueve el bienestar de las personas." },
];

export default function ExploreAreas() {
  return (
    <section id="explorar" className="py-20" style={{ background: "#f8f7ff" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[1.85rem] font-bold text-center text-[#1a1a3e] mb-3">
          Explora nuestras <span style={gText}>áreas</span>
        </h2>
        <p className="text-center text-gray-500 text-sm mb-12 font-light">
          Descubre las áreas de conocimiento y encuentra la que mejor va contigo.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
          {AREAS.map(({ bg, icon, name, desc }) => (
            <div
              key={name}
              className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              style={{ boxShadow: "0 2px 14px rgba(124,58,237,.07)" }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: bg }}>
                {icon}
              </div>
              <h4 className="text-sm font-semibold text-[#1a1a3e] mb-2">{name}</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-3 font-light">{desc}</p>
              <a href="#" className="text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors">
                Explorar
              </a>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Boton href="#">Ver todas las áreas</Boton>
        </div>
      </div>
    </section>
  );
}
