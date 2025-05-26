export  default function AppointmentPhoneCell({getValue}){
    const phone = getValue();
    return (<div>{phone}</div>)
}