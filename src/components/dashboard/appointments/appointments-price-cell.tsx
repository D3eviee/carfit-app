export  default function AppointmentDateCell({getValue}){
    const rawPrice = getValue()
    const price = `${parseFloat(rawPrice)} PLN`

    return (
        <p className="min-w-20 text-xs px-1 lg:text-sm">{price}</p>
    )
}