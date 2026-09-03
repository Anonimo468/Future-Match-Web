"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

function IconLaptopTeal() {
  return (
    <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: "#e0fafa" }}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect x="4" y="7" width="22" height="14" rx="2" stroke="#0ea5e9" strokeWidth="1.8" />
        <path d="M1 23h28" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 17l3-3 3 3 4-5" stroke="#0ea5e9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function IconChatBlue() {
  return (
    <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: "#eff6ff" }}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M25 8a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h5l-2 4 8-4h3a2 2 0 002-2V8z" stroke="#3b82f6" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 13h10M10 17h6" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ImageIcon({ src }: { src: string }) {
  return (
    <div className="relative w-14 h-14 shrink-0">
      <Image src={src} alt="" fill className="object-contain" sizes="56px" />
    </div>
  );
}

interface TestimonialData {
  cardIcon: ReactNode;
  text: string;
  name: string;
  role: string;
}

function TestimonialCard({ cardIcon, text, name, role }: TestimonialData) {
  return (
    <div
      className="rounded-2xl border border-gray-100 p-6 flex flex-col justify-between h-full"
      style={{ boxShadow: "0 2px 16px rgba(124,58,237,.08)" }}
    >
      <div className="flex items-start gap-4 mb-5">
        {cardIcon}
        <p className="text-gray-700 text-sm leading-relaxed font-light">{text}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 shrink-0">
          <Image src="/images/icon-user-avatar.webp" alt="usuario" fill className="object-contain" sizes="44px" />
        </div>
        <div>
          <div className="text-sm font-semibold text-[#1a1a3e]">{name}</div>
          <div className="text-xs text-gray-400 font-light">{role}</div>
        </div>
      </div>
    </div>
  );
}

const ALL: TestimonialData[] = [
  { cardIcon: <ImageIcon src="/images/icon-heart-ekg.webp" />, text: "Future Match me ayudó a entender mis fortalezas y descubrir una carrera que realmente me apasiona.", name: "Nickol Ramírez", role: "Estudiante de Bachillerato" },
  { cardIcon: <ImageIcon src="/images/icon-brain-testimonial.webp" />, text: "Las recomendaciones fueron súper acertadas. Ahora tengo más claridad sobre mi futuro.", name: "Alexander Flores", role: "Estudiante Universitario" },
  { cardIcon: <IconLaptopTeal />, text: "La plataforma es muy completa y fácil de usar. Me sentí acompañado en todo el proceso.", name: "Meybel Escobar", role: "Estudiante de Bachillerato" },
  { cardIcon: <IconChatBlue />, text: "Estoy estudiando mi carrera actual gracias a Future Match, es increíble.", name: "Daniela Martínez", role: "Estudiante Universitario" },
  { cardIcon: <ImageIcon src="/images/icon-heart-ekg.webp" />, text: "Increíble herramienta. Me dio la orientación que necesitaba en el momento indicado.", name: "Sofía Mendoza", role: "Recién graduada" },
];

const SLIDES = [[ALL[0], ALL[1]], [ALL[2], ALL[3]], [ALL[4]]];

const SWIPE_THRESHOLD = 50;

export default function Testimonials() {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = SLIDES[slide];
  const touchStartX = useRef<number | null>(null);

  function goTo(i: number) {
    setDirection(i > slide ? 1 : -1);
    setSlide(i);
  }

  function goPrev() {
    setDirection(-1);
    setSlide((slide - 1 + SLIDES.length) % SLIDES.length);
  }

  function goNext() {
    setDirection(1);
    setSlide((slide + 1) % SLIDES.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
    touchStartX.current = null;
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[1.85rem] font-bold text-center text-[#1a1a3e] mb-12">
          Lo que dicen nuestros usuarios
        </h2>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={goPrev}
            aria-label="Testimonio anterior"
            className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-violet-300 hover:text-violet-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            className={`overflow-hidden mx-auto mb-0 ${current.length === 1 ? "max-w-[380px]" : "max-w-[780px]"}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              key={slide}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`grid gap-6 ${current.length === 1 ? "grid-cols-1" : "md:grid-cols-2"}`}
            >
              {current.map((t, i) => (
                <TestimonialCard key={i} {...t} />
              ))}
            </motion.div>
          </div>

          <button
            onClick={goNext}
            aria-label="Siguiente testimonio"
            className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-violet-300 hover:text-violet-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${slide === i ? "w-6 bg-violet-700" : "w-2.5 bg-violet-200"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
