"use client";

import Image from "next/image";
import { gText } from "@/lib/styles";
import Boton from "./Boton";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="w-full overflow-hidden"
      style={{ background: "linear-gradient(140deg,#f9f8ff 0%,#ede9fe 45%,#ddd6fe 100%)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-[1fr_1.1fr] gap-4 items-center py-14">
        <div className="pr-4">
          <h1 className="text-[2.55rem] font-extrabold leading-tight text-[#1a1a3e] mb-5">
            Descubre tu camino.
            <br />
            Decide <span style={gText}>tu futuro.</span>
          </h1>
          <p className="text-gray-500 text-[0.92rem] leading-relaxed mb-8 max-w-[400px] font-light">
            Future Match usa inteligencia artificial para orientarte vocacionalmente y ayudarte a
            tomar decisiones más acertadas sobre tu futuro académico y profesional
          </p>
          <div className="flex flex-wrap gap-3">
            <Boton href="/cuestionario">Comenzar ahora</Boton>
            <Boton href="#como-funciona" variant="outline">Conocer Más</Boton>
          </div>
        </div>

        <div className="flex justify-center items-end">
          <div className="relative w-full max-w-[580px] aspect-[3/2]">
            <Image
              src="/images/hero-mockup.webp"
              alt="Estudiante con aplicación Future Match mostrando 92% de compatibilidad"
              fill
              className="object-contain"
              priority
              sizes="(min-width: 768px) 580px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
