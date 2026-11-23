import React from "react";
import { cn } from "@/utils"

export const supportFieldClass = "w-full bg-[#F6F7FB] px-2 py-2.5 text-sm text-main-black rounded-xl border outline-none border-transparent focus:border-[#D4D4D4]"

export const SupportInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  return <input {...props} className={cn(supportFieldClass, className)} />
}

export const SupportTextarea = ({ className, ...props }: React.ComponentProps<"textarea">) => {
  return <textarea {...props} className={cn(supportFieldClass, className)} />
}