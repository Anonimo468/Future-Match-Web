"use client";

import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function Blog() {
  return (
    <section id="blog-posts" className="py-20" style={{ background: "#f8f7ff" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[1.85rem] font-bold text-center text-[#1a1a3e] mb-12">Blog</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow h-full"
                style={{ boxShadow: "0 2px 14px rgba(124,58,237,.07)" }}
              >
                <div className="flex items-stretch h-[110px]">
                  <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                    <h3 className="text-xs font-semibold text-[#1a1a3e] leading-snug line-clamp-3">
                      {post.title}
                    </h3>
                    <span className="text-violet-600 text-[11px] font-medium">{post.date}</span>
                  </div>
                  <div className="w-[100px] shrink-0 relative">
                    <Image src={post.image} alt={post.title} fill className="object-cover" sizes="100px" />
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-gray-50 text-gray-400 text-[11px]">
                  {post.readTime}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
