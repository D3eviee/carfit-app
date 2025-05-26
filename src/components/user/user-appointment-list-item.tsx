import service_image from '@/../public/car_service.jpg'
import { format } from 'date-fns';
import { Calendar, Dot, MapPin } from 'lucide-react';
import Image from 'next/image'

type AppointmentDetailsProps = {
  business: {
    name: string
    street: string
    district: string
    town: string
  },
  reservationStart: Date,
  status: string,
  services: {
    serviceId: string
  }[] 
}

export default function UserAppointmentListItem({ details }: { details: AppointmentDetailsProps }) {
  const appointmentLocation = `${details.business.street}, ${details.business.district}, ${details.business.town}`
  const appointmentDay = `${format(details.reservationStart, "d")} ${format(details.reservationStart, "LLLL")} ${format(details.reservationStart, "y")}`
  const appointmentHour = ` ${format(details.reservationStart, "HH")}:${format(details.reservationStart, "mm")}`
  const appointmentDayOfWeek = format(details.reservationStart, "EEEE")
  const serviceCount = details.services.length

  return (
    <div className="flex flex-row w-3/5 rounded-lg overflow-clip bg-[#F2F4F8] border-[0.5px]">
      <Image src={service_image} width={250} alt="Service image" />
      <div className="flex flex-col gap-2 p-5">
        <h2 className='text-[#000] font-medium text-base'>{details.business.name}</h2>

        <div className='flex flex-row items-center gap-1'>
          <MapPin size={18} color='#111' strokeWidth={1}/>
          <h2 className='text-[#111] font-light text-sm'>{appointmentLocation}</h2>  
        </div>

        <div className='flex flex-row items-center gap-1'>
          <Calendar size={18} color='#111' strokeWidth={1}/>
          <div className='flex flex-row items-center'>
            <h2 className='text-[#000] font-light text-sm'>{appointmentDay}</h2> 
            <Dot color="#333" strokeWidth={2} className=' w-4'/> 
            <h2 className='text-[#000] font-light text-sm'>{appointmentHour}</h2> 
            <Dot color="#333" strokeWidth={2} className='w-4'/> 
            <h2 className='text-[#000] font-light text-sm'>{appointmentDayOfWeek}</h2>  
          </div>
        </div>
        <div className=' text-xs text-white bg-green-700 py-1 px-3 rounded-md w-fit'>{serviceCount} {serviceCount == 1 ? "usługa" : "usługi"}</div>
        <div className='mt-4 text-xs text-white bg-green-700 py-1 px-3 rounded-md w-fit'>{details.status}</div>
      </div>
    </div>
  );
}
