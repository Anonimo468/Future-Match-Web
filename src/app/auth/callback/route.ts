import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("Error al canjear el código de OAuth:", error.message, error);
  } else {
    console.error("No llegó ningún ?code en el callback de OAuth");
  }

  // Si algo falló, mandamos de vuelta al login con un aviso
  return NextResponse.redirect(`${origin}/iniciar-sesion?error=auth`);
}