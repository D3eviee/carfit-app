import { formatPhoneNumber } from "@/utils";

export  default function AppointmentPhoneCell({getValue}){
    const rawPhone = getValue();
    const phone = formatPhoneNumber(rawPhone)

    return (
        <p className="min-w-32 text-xs px-1 lg:text-sm">
            {phone}
        </p>
    )
}