export  default function AppointmentNameCell({getValue}){
    const name = getValue();

    return (
        <p className="min-w-32 text-xs px-1 lg:text-sm">{name}</p>
    )
}