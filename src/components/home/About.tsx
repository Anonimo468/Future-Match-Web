"use client";

import { gText } from "@/lib/styles";
import Boton from "./Boton";

export default function About() {
  return (
    <section
      id="nosotros"
      className="py-16"
      style={{ background: "linear-gradient(135deg,#ede9fe 0%,#ddd6fe 55%,#c4b5fd 100%)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-[1.85rem] font-bold text-[#1a1a3e] mb-5">
            Sobre <span style={gText}>Future Match</span>
          </h2>
          <p className="text-gray-700 text-[0.9rem] leading-relaxed mb-7 font-light">
            Somos una plataforma digital de orientación vocacional impulsada por inteligencia
            artificial, creada para ayudar a los jóvenes a descubrir su carrera y tomar decisiones
            más acertadas sobre su futuro académico y profesional.
          </p>
          <Boton href="#nosotros">Más Sobre Nosotros</Boton>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=640&h=420&fit=crop&auto=format&q=80"
            alt="Jóvenes estudiantes colaborando con laptops"
            className="w-full h-[280px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
