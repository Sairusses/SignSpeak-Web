import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main>{children}</main>
      <footer className="py-6 text-center text-gray-500 text-sm bg-white">
        © {new Date().getFullYear()} SignSpeak — Empowering Inclusive
        Communication
      </footer>
    </div>
  );
}
