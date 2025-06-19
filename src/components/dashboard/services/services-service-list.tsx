import { ReactNode } from "react";

export default function ServicesServiceList({ children, categoryName }: { children: ReactNode; categoryName: string }) {
  return (
    <div className="w-full flex flex-col gap-2 ">
      <h4 className="text-[#111] text-md leading-none font-normal p-1 py-1.5 border bg-[#F1F5F9] rounded" >{categoryName}</h4>
      <div className="flex flex-col gap-2.5">
        {children}
      </div>
    </div>
  );
}