"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="nosotros" className="bg-fm-lavender px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="text-2xl font-bold text-fm-text md:text-3xl">
            Sobre <span className="text-fm-purple">Future Match</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed font-light text-fm-text-muted">
            Somos una plataforma digital de orientación vocacional impulsada
            por inteligencia artificial, creada para ayudar a los jóvenes a
            descubrir su camino y tomar decisiones más acertadas sobre su
            futuro académico y profesional.
          </p>
          <motion.a
            href="#nosotros"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 inline-block rounded-full bg-fm-purple px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fm-purple/30"
          >
            Más sobre nosotros
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative aspect-[4/3] w-full"
        >
          <Image
            src="/images/about-students.webp"
            alt="Estudiantes usando Future Match en su laptop"
            fill
            className="object-contain drop-shadow-xl"
            sizes="(min-width: 768px) 480px, 100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
