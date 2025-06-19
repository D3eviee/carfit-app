import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Carfit App",
  description: "Book your car service provider",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="pl">
      <body className={`${inter.className} antialiased bg-[#FDFCFF] overflow-x-hidden`}>
        <QueryProvider>
        {/* <ReactQueryDevtools position="bottom" buttonPosition="bottom-right"/> */}
        {children}
        </QueryProvider>
        {/* <footer className="flex justify-center items-center h-28">
          <p className="font-light"> Carfit &copy;2025</p>
        </footer> */}
      </body>
    </html>
  );
}


