"use client";

import { useState } from "react";
import Image from "next/image";
import { gBtn } from "@/lib/styles";

const SOCIAL_ICONS = [
  <svg key="ig" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
  <svg key="tt" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.13a8.16 8.16 0 004.77 1.52V7.2a4.85 4.85 0 01-1-.51z" /></svg>,
  <svg key="fb" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
  <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer id="contacto" style={{ background: "#000F4D" }} className="pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <Image
            src="/images/logo-footer.webp"
            alt="Future Match"
            width={224}
            height={149}
            className="object-contain rounded-xl w-56 h-auto"
          />
          <p className="text-white/80 text-xs mt-3 leading-relaxed font-light">Inteligencia artificial para orientar tu futuro.</p>
          <div className="flex gap-3 mt-5">
            {SOCIAL_ICONS.map((icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-violet-600 transition-all duration-150">
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Navegación</h4>
          {[
            { l: "Inicio", href: "#inicio" },
            { l: "¿Cómo funciona?", href: "#como-funciona" },
            { l: "Explorar áreas", href: "#explorar" },
            { l: "Blog", href: "#blog-posts" },
            { l: "Contacto", href: "#contacto" },
          ].map(({ l, href }) => (
            <a key={l} href={href} className="block text-white/75 text-xs mb-2.5 hover:text-violet-300 transition-colors font-light">{l}</a>
          ))}
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Contacto</h4>
          <div className="flex items-center gap-2 mb-3">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"><path d="M7.5 13S2 9 2 5.5a5.5 5.5 0 0111 0C13 9 7.5 13 7.5 13z" /><circle cx="7.5" cy="5.5" r="1.5" /></svg>
            <span className="text-white/75 text-xs font-light">San Salvador, El Salvador</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"><path d="M13.5 10.5l-2-2a1 1 0 00-1.3 0l-1 1c-.8-.5-1.6-1.3-2-2l1-1a1 1 0 000-1.3l-2-2a1 1 0 00-1.4 0L3.5 4.3C3.2 7 4.8 9.7 7.5 12.5l1.2-1.2a1 1 0 001.3 0l1-1a1 1 0 000-1.3z" /></svg>
            <span className="text-white/75 text-xs font-light">Tel: +503 6472-3456</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="3" width="13" height="9" rx="1.5" /><path d="M1 4l6.5 5L14 4" /></svg>
            <a href="mailto:info@futurematch.com" className="text-white/75 text-xs hover:text-violet-300 transition-colors font-light">info@futurematch.com</a>
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-1.5">Suscríbete a nuestro boletín</h4>
          <p className="text-white/75 text-xs mb-4 leading-relaxed font-light">Recibe consejos, novedades y recursos para tu futuro.</p>
          <label className="text-white/75 text-xs block mb-1.5 font-light">Tu correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            className="w-full bg-white/6 border border-white/12 rounded-lg px-3 py-2.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-violet-500 mb-3"
          />
          <button style={gBtn} className="w-full py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Enviar
          </button>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 pt-6 border-t border-white/6">
        <p className="text-white/60 text-xs text-center font-light">© 2026 Future Match. Todos los derechos reservados</p>
      </div>
    </footer>
  );
}