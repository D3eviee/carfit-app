import { ReactNode } from "react";
import { ClientFooter } from "@/components/ClientFooter";
import { Navbar } from "@/components/navbar/Navbar";

export default function RootLayout({children}: Readonly<{children: ReactNode}>) {
  return (
    <div className="flex flex-col">
      <Navbar/>
      {children}
      <ClientFooter/>
    </div>
  );
}