import { format } from "date-fns";

export  default function AppointmentDateCell({getValue}){
    const rawDate = getValue();
    const date = format(rawDate, "P")

    return (<div>
        {date}
    </div>)
}