"use client";

interface BotonProps {
  children: React.ReactNode;
  variant?: "filled" | "outline";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Boton({ children, variant = "filled", href, onClick, className = "" }: BotonProps) {
  const baseCls =
    "inline-block text-center font-semibold py-3 px-8 rounded-full text-sm border-2 transition-all hover:scale-105";
  const filledCls =
    "text-white border-transparent bg-[linear-gradient(135deg,#5b21b6,#7c3aed)] shadow-lg shadow-violet-700/30 hover:bg-none hover:bg-violet-50 hover:text-violet-700 hover:border-violet-700 hover:shadow-none";
  const outlineCls =
    "border-violet-700 text-violet-700 hover:bg-[linear-gradient(135deg,#5b21b6,#7c3aed)] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-violet-700/30";

  const cls = `${baseCls} ${variant === "filled" ? filledCls : outlineCls} ${className}`;

  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}
