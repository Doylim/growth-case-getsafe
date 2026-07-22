import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4 px-5 text-center"
      style={{ background: "#FFFFFF", color: "#111210" }}
    >
      <p className="font-black text-3xl">Seite nicht gefunden</p>
      <Link
        href="/"
        className="rounded-full px-8 py-4 font-bold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(17,18,16,.25)]"
        style={{ background: "#111210" }}
      >
        Zur Startseite
      </Link>
    </div>
  );
}
