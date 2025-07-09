import { cn } from "@/utils";

export  default function AppointmentStatusCell({getValue}){
    const status = getValue();

    return (
        <div className="px-1 max-w-30 ">
            <p className={cn("text-xs lg:text-sm font-medium w-fit px-2 py-0.5 rounded-md", status == "Odwołana" ? "bg-[#FF5F58] text-white" : "bg-orange-400 text-white")}>{status}</p>
        </div>
    )
}