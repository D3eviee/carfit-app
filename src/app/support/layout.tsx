import { ClientFooter } from "@/components/ClientFooter";
import { Navbar } from "@/components/navbar/Navbar";

export default function SupportLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <ClientFooter />
    </div>
  );
}
