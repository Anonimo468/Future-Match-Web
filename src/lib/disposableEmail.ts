import disposableDomains from "disposable-email-domains/index.json";

const DISPOSABLE_DOMAINS = new Set(
  (disposableDomains as string[]).map((d) => d.toLowerCase())
);

/**
 * Detecta correos de servicios temporales/desechables (mailinator,
 * yopmail, 10minutemail, etc.) usando la lista mantenida por
 * disposable-email-domains. Se usa para que nadie se registre (o intente
 * loguearse) con un correo "quema" en vez de uno real.
 */
export function isDisposableEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}
