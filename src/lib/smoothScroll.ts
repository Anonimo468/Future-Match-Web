/**
 * Scroll suave con duración controlada (más lento que el scroll-behavior
 * nativo del navegador, que no permite ajustar la velocidad).
 */
export function smoothScrollTo(targetId: string, duration = 1100, offset = 88) {
  const el = document.querySelector(targetId);
  if (!el) return;

  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - offset;
  const distance = targetY - startY;
  let startTime: number | null = null;

  const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  function step(timestamp: number) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
