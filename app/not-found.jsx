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
        className="rounded-full px-8 py-4 font-bold text-white"
        style={{ background: "#111210" }}
      >
        Zur Startseite
      </Link>
    </div>
  );
}
