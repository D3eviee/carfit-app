import Navbar from "@/components/navbar/navbar";
import "../globals.css";

export default  function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="flex flex-col gap-32">
      <Navbar/>
      {children}
    </div>
  );
}