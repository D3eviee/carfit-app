import { Loader2Icon } from "lucide-react";

export const Spinner = ({color}:{color?:string}) => {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <Loader2Icon size={25} strokeWidth={1} color={color || "#000"} className="animate-spin"/>
    </div>
  )
}