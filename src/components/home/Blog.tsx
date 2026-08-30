"use client";

import Image from "next/image";

const POSTS = [
  { img: "/images/blog-1.webp", title: "Cómo la IA puede Ayudar a Elegir la Mejor Carrera", date: "24 Julio", views: 4, comments: 0 },
  { img: "/images/blog-2.webp", title: "Impulsa Tu Carrera: Encuentra...", date: "22 Julio", views: 0, comments: 0 },
  { img: "/images/blog-3.webp", title: "Cómo Future Match Ayuda a Crear Nuevas Oportunidades...", date: "22 Julio", views: 0, comments: 0 },
];

export default function Blog() {
  return (
    <section id="blog-posts" className="py-20" style={{ background: "#f8f7ff" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[1.85rem] font-bold text-center text-[#1a1a3e] mb-12">Blog</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <article
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              style={{ boxShadow: "0 2px 14px rgba(124,58,237,.07)" }}
            >
              <div className="flex items-stretch h-[110px]">
                <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                  <h3 className="text-xs font-semibold text-[#1a1a3e] leading-snug line-clamp-3">{p.title}</h3>
                  <span className="text-violet-600 text-[11px] font-medium">{p.date}</span>
                </div>
                <div className="w-[100px] shrink-0 relative">
                  <Image src={p.img} alt={p.title} fill className="object-cover" sizes="100px" />
                </div>
              </div>
              <div className="px-4 py-3 border-t border-gray-50 flex items-center gap-5 text-gray-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <path d="M.5 6S2.5 2 6 2s5.5 4 5.5 4-2 4-5.5 4S.5 6 .5 6z" />
                    <circle cx="6" cy="6" r="1.5" />
                  </svg>
                  {p.views}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <path d="M10.5 7.5a1 1 0 01-1 1H3.5L1 11V2.5a1 1 0 011-1h7.5a1 1 0 011 1z" strokeLinejoin="round" />
                  </svg>
                  {p.comments}
                </span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-red-400 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <path d="M6 10.5S1 7 1 4a2.83 2.83 0 015-1.8A2.83 2.83 0 0111 4c0 3-5 6.5-5 6.5z" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
