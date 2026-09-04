"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RecuperarContrasenaPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/actualizar-contrasena`,
    });

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Columna izquierda — panel de marca */}
      <div
        className="relative hidden flex-1 items-center justify-center overflow-hidden lg:flex"
        style={{ background: "linear-gradient(135deg,#7c3aed 0%,#a78bfa 50%,#ec4899 100%)" }}
      >
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-10 text-center">
          <div className="relative h-56 w-full max-w-[34rem]">
            <Image src="/images/logo-future-match.webp" alt="Future Match" fill className="object-contain brightness-0 invert" sizes="544px" />
          </div>
          <h2 className="max-w-sm text-2xl font-bold text-white">¿Olvidaste tu contraseña?</h2>
          <p className="max-w-sm text-sm font-light text-violet-100">
            No pasa nada, te mandamos un link para que elijas una nueva.
          </p>
        </div>
      </div>

      {/* Columna derecha — formulario */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12 sm:px-12">
        <div className="flex w-full max-w-md flex-col gap-7">
          <div className="flex justify-center lg:hidden">
            <div className="relative h-16 w-64">
              <Image src="/images/logo-future-match.webp" alt="Future Match" fill className="object-contain" sizes="256px" />
            </div>
          </div>

          <div>
            <Link href="/iniciar-sesion" className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-fm-purple">
              <ArrowLeft className="h-4 w-4" />
              Volver a inicio de sesión
            </Link>
            <h1 className="text-3xl font-bold text-[#1a1a3e]">Recuperar contraseña</h1>
            <p className="mt-2 text-sm font-light text-gray-500">
              Ingresá tu correo y te mandamos un link para restablecerla.
            </p>
          </div>

          {sent ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-6 text-center">
              <Mail className="h-8 w-8 text-green-600" />
              <p className="text-sm text-green-800">
                Si <strong>{email}</strong> tiene una cuenta con nosotros, te llegará un correo con el link para elegir una nueva contraseña.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-gray-700">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition-colors focus:border-fm-purple focus:ring-2 focus:ring-fm-purple/20"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Enviar link de recuperación
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
