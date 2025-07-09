import { format } from "date-fns";
import { pl } from "date-fns/locale";

export  default function AppointmentDateCell({getValue}){
    const rawDate = getValue();
    const rawMonth = format(rawDate, "MMM", {locale: pl})
    const month = rawMonth[0].toUpperCase() + rawMonth.slice(1)
    const day = format(rawDate, "d", {locale: pl})
    const year = format(rawDate, "y", {locale: pl})
    const date = `${month} ${day},`

    return (
        <div className="flex flex-row gap-0.5 text-xs tracking-tight px-1 min-w-24 lg:text-sm">
            <p className="text-[#111]">{date}</p>
            <p className="text-[#333]">{year}</p>
        </div>
    )
}
