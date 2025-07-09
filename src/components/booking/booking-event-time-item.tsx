import { useAppointmentStore } from "@/lib/store"
import { cn } from "@/utils"
import { format, isEqual } from "date-fns"

export const BookingEventTimeItem = ({time}:{time:Date}) => {
    //ZUSTAND STORE FOR SELETING TIME
    const appointmentTime = useAppointmentStore((store) => store.appointmentTime)
    const setAppointmentTime = useAppointmentStore((store) => store.setAppointmentTime)

    const timeText = `${format(time, "hh")}:${format(time, "mm")}`

    const handleTimeSelect = () => {
        setAppointmentTime(time)
    }

    return (
        <p 
            className={cn("text-center text-sm text-[#191919] font-normal py-2 rounded-xl border-[0.5px] hover:cursor-pointer",
                isEqual(appointmentTime, time) ? "bg-gradient-to-b from-[#141414] to-[#313131] text-[#F2F2F7]" : "bg-[#F2F2F7] hover:bg-[#EEE]"
            )}
            onClick={handleTimeSelect}
        >
            {timeText}
        </p>
    )
}