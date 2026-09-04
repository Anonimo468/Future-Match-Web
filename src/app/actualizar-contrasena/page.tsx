"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ActualizarContrasenaPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
      setCheckingSession(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("La contraseña tiene que tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
    setTimeout(() => {
      router.push("/iniciar-sesion");
    }, 2500);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-6 py-12">
      <div className="flex w-full max-w-md flex-col gap-7">
        <div className="flex justify-center">
          <div className="relative h-16 w-64">
            <Image src="/images/logo-future-match.webp" alt="Future Match" fill className="object-contain" sizes="256px" />
          </div>
        </div>

        {checkingSession ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-violet-700" />
          </div>
        ) : !hasSession ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
            <p className="text-sm text-red-700">
              Este link de recuperación no es válido o ya expiró. Pedí uno nuevo desde la pantalla de inicio de sesión.
            </p>
          </div>
        ) : done ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <p className="text-sm text-green-800">Tu contraseña se actualizó. Te llevamos a iniciar sesión...</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#1a1a3e]">Elegí una nueva contraseña</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm text-gray-700">Nueva contraseña</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
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

              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-sm text-gray-700">Confirmar contraseña</label>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
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
                Actualizar contraseña
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
