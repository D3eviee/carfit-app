import { BusinessFooter } from "@/components/BusinessFooter";
import { BusinessNavbar } from "@/components/business/navbar/BusinessNavbar";

export default function ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BusinessNavbar/>
      {children}
      <BusinessFooter/>
    </>
  );
}