import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { BLOG_POSTS, getBlogPost } from "@/data/blogPosts";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <div className="h-[130px]" />

      <article className="px-6 py-12">
        <div className="mx-auto max-w-[780px]">
          <Link
            href="/#blog-posts"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-violet-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>

          <div className="relative mb-8 h-[280px] w-full overflow-hidden rounded-2xl sm:h-[380px]">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="780px" />
          </div>

          <h1 className="mb-3 text-2xl font-bold leading-tight text-[#1a1a3e] md:text-3xl">{post.title}</h1>
          <div className="mb-10 flex items-center gap-3 text-sm text-gray-400">
            <span className="font-medium text-violet-600">{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <div className="flex flex-col gap-8">
            {post.content.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="mb-3 text-lg font-bold text-[#1a1a3e] md:text-xl">{section.heading}</h2>
                )}
                <div className="flex flex-col gap-4">
                  {section.paragraphs.map((paragraph, j) => (
                    <p key={j} className="text-sm font-light leading-relaxed text-gray-600 md:text-[0.95rem]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-14 flex flex-col items-center gap-4 rounded-2xl px-6 py-10 text-center"
            style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
          >
            <h3 className="text-xl font-bold text-white">¿Todavía no hiciste el test vocacional?</h3>
            <p className="max-w-sm text-sm font-light text-violet-100">
              Descubrí en minutos qué carreras y oportunidades se ajustan mejor a vos.
            </p>
            <Link
              href="/cuestionario"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-800 transition-transform hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              Hacer el test vocacional
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
