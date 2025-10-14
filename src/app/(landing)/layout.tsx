import { ReactNode } from "react";
import Navbar from "@/components/navbar/navbar";
import "@/app/globals.css";
import { ClientFooter } from "@/components/client-footer";

export default function RootLayout({children}: Readonly<{children: ReactNode}>) {
  return (
    <div className="flex flex-col">
      <Navbar/>
      {children}
      <ClientFooter/>
    </div>
  );
}


