import { ClientFooter } from "@/components/ClientFooter";
import { Navbar } from "@/components/navbar/Navbar";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      <Navbar/>
      {children}
      <div className="md:absolute bottom-0 w-full">
        <ClientFooter/>
       </div>
    </>
  );
}


