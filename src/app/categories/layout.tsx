import BusinessNavbar from "@/components/navbar/navbar-business";
import "../globals.css";


export default  function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      <BusinessNavbar/>
      {children}
    </>
  );
}


