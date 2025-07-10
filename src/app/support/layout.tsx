import Navbar from "@/components/navbar/navbar";

export default  function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      <Navbar/>
      {children}
      <div className="h-24"></div>
    </>
  );
}


