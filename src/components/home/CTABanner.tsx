"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          className="rounded-3xl overflow-hidden relative flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-8"
          style={{ background: "linear-gradient(135deg,#5b21b6 0%,#7c3aed 60%,#a78bfa 100%)" }}
        >
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

          <motion.div
            animate={{ rotate: [0, -6, 6, -6, 0], y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            className="relative z-10 shrink-0 -mb-8 md:mb-0 md:-mt-8 self-end md:self-auto w-28 md:w-36 aspect-square"
          >
            <Image
              src="/images/robot-mascot.webp"
              alt="Robot mascota Future Match"
              fill
              className="object-contain drop-shadow-lg"
              sizes="144px"
            />
          </motion.div>

          <div className="flex-1 relative z-10 text-center md:text-left">
            <h2 className="text-2xl md:text-[1.7rem] font-bold text-white mb-2">
              ¿Listo para descubrir tu camino?
            </h2>
            <p className="text-violet-100 text-sm leading-relaxed font-light">
              Únete a miles de jóvenes que ya están construyendo su futuro con Future Match.
            </p>
          </div>

          <div className="flex flex-col gap-3 relative z-10 shrink-0 w-full md:w-auto min-w-[170px]">
            <a href="/cuestionario" className="w-full text-center bg-white text-violet-800 font-semibold py-3 px-8 rounded-full text-sm hover:bg-violet-50 transition-colors">
              Comenzar ahora
            </a>
            <a href="#como-funciona" className="w-full text-center border-2 border-white text-white font-semibold py-3 px-8 rounded-full text-sm hover:bg-white/10 transition-colors">
              Conocer Más
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
