import Link from "next/link";

export default function BackToHome() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
    >
      ← 🏠 Inicio
    </Link>
  );
}