"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isDisposableEmail } from "@/lib/disposableEmail";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.8055 10.2292C19.8055 9.55156 19.7501 8.86719 19.6323 8.19531H10.2002V12.0492H15.6014C15.3775 13.2911 14.6571 14.3898 13.6072 15.0875V17.5867H16.8251C18.7179 15.8449 19.8055 13.2722 19.8055 10.2292Z" fill="#4285F4"/>
      <path d="M10.2002 20.0008C12.9519 20.0008 15.2723 19.1052 16.8294 17.5867L13.6115 15.0875C12.7104 15.6972 11.5469 16.0431 10.2044 16.0431C7.54251 16.0431 5.29124 14.2831 4.50423 11.917H1.18359V14.4928C2.78171 17.6758 6.31087 20.0008 10.2002 20.0008Z" fill="#34A853"/>
      <path d="M4.5001 11.917C4.0699 10.6751 4.0699 9.3306 4.5001 8.08875V5.51294H1.18362C-0.205401 8.24044 -0.205401 11.765 1.18362 14.4925L4.5001 11.917Z" fill="#FBBC04"/>
      <path d="M10.2002 3.95773C11.6253 3.93594 13.0029 4.47252 14.036 5.45002L16.8905 2.60002C15.1841 0.990021 12.9348 0.0944214 10.2002 0.11621C6.31087 0.11621 2.78171 2.44121 1.18359 5.62852L4.50007 8.20433C5.28293 5.83433 7.53835 3.95773 10.2002 3.95773Z" fill="#EA4335"/>
    </svg>
  );
}

export default function IniciarSesionPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (isDisposableEmail(email)) {
      setError("No aceptamos correos temporales o desechables. Usá un correo real (Gmail, Outlook, etc.).");
      return;
    }

    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (signInError) {
      setError(
        signInError.message === "Invalid login credentials"
          ? "Correo o contraseña incorrectos."
          : signInError.message
      );
      return;
    }

    router.push("/");
    router.refresh();
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
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
          <div className="relative h-16 w-64">
            <Image src="/images/logo-future-match.webp" alt="Future Match" fill className="object-contain brightness-0 invert" sizes="256px" />
          </div>
          <h2 className="max-w-sm text-2xl font-bold text-white">Bienvenido de nuevo</h2>
          <p className="max-w-sm text-sm font-light text-violet-100">
            Retomá donde lo dejaste y seguí explorando tus opciones vocacionales.
          </p>
        </div>
      </div>

      {/* Columna derecha — formulario */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12 sm:px-12">
        <div className="flex w-full max-w-md flex-col gap-7">
          <div className="flex justify-center lg:hidden">
            <div className="relative h-10 w-40">
              <Image src="/images/logo-future-match.webp" alt="Future Match" fill className="object-contain" sizes="160px" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-[#1a1a3e]">Inicia sesión</h1>
            <p className="text-sm font-light text-gray-500">Bienvenido de nuevo a Future Match</p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
          >
            {googleLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon />}
            Continuar con Google
          </button>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-light text-gray-400">o</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

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

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm text-gray-700">Contraseña</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition-colors focus:border-fm-purple focus:ring-2 focus:ring-fm-purple/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="-mt-2 flex justify-end">
              <Link href="/recuperar-contrasena" className="text-sm text-fm-purple hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Iniciar sesión
            </button>
          </form>

          <div className="text-center text-sm text-gray-600">
            ¿No tenés cuenta?{" "}
            <Link href="/registro" className="font-medium text-fm-purple hover:underline">
              Regístrate
            </Link>
          </div>

          <div className="text-center">
            <Link href="/chat-invitado" className="text-xs text-gray-400 hover:text-gray-600 hover:underline">
              Continuar como invitado
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
