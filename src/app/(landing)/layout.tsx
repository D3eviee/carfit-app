import { ReactNode } from "react";
import "..//globals.css";
import Navbar from "@/components/navbar/navbar";

export default  function RootLayout({children}: Readonly<{children: ReactNode}>) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  );
}


