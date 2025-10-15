
import type { Metadata } from "next";import { Inter } from "next/font/google";
import "@/app/globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import ModalRoot from "@/components/modals/modal-root";
import { ToastRoot } from "@/components/toasts/toast-root";
import MobileNavbarModalRoot from "@/components/modals/mobile-navbar-modal-root";
import Script from "next/script";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Carfit App",
  description: "Book your car service provider",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="pl">
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=G-4ZB8ENTJZQ`}
        strategy="afterInteractive" />
        
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4ZB8ENTJZQ');`}
        </Script>
      

      </head>

      <body className={`${inter.className} antialiased bg-[#FFF] overflow-x-hidden h-full`}>
        <QueryProvider>
          <ReactQueryDevtools position="bottom" buttonPosition="bottom-right"/>
          {children}
          <ModalRoot/>
          <MobileNavbarModalRoot/>
          <ToastRoot />
        </QueryProvider>
      </body>
    </html>
  );
}
