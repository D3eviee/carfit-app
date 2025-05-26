export  default function AppointmentNameCell({getValue}){
    const name = getValue();

    return (<div>
        {name}
    </div>)
}