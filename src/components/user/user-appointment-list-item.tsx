import service_image from '@/../public/car_service.jpg'
import { format } from 'date-fns';
import { Calendar, Dot, MapPin } from 'lucide-react';
import Image from 'next/image'
import UserAppointmentDetailsButton from './user-appointment-details-button';
import { AppointmentDetails } from '@/lib/types';

export default function UserAppointmentListItem({ details }: { details: AppointmentDetails }) {
  const appointmentLocation = `${details.business.street}, ${details.business.district}, ${details.business.town}`
  const appointmentDay = `${format(details.reservationStart, "d")} ${format(details.reservationStart, "LLLL")} ${format(details.reservationStart, "y")}`
  const appointmentHour = ` ${format(details.reservationStart, "HH")}:${format(details.reservationStart, "mm")}`
  const appointmentDayOfWeek = format(details.reservationStart, "EEEE")

  return (
    <div className="w-full sm:w-[360px] flex flex-col h-[360px] rounded-lg overflow-clip bg-[#F2F4F8] border">
      {/* SERVICE IMAGE */} 
      <div className='relative w-full h-[160px] overflow-hidden'>
        <Image src={service_image} className='w-full h-full object-cover' alt="Service image" />
      </div>
      
      {/* SERVICE APPOINTMENT DETAILS */}
      <div className="w-full h-auto flex flex-col gap-3 px-3 py-5">

        {/* BUSINESS NAME ROW */}
        <h2 className='text-[#111] font-medium text-pretty text-md leading-3 sm:leading-5'>{details.business.name}</h2>

        {/* DATE AND LOCATION SECTION */}
        <div className='flex flex-col gap-1 '>
          {/* BUSINESS LOCATION ROW */}
          <div className='flex flex-row items-center gap-1.5'>
            <MapPin width={18} color='#111' strokeWidth={1.5}/>
            <h2 className='text-[#111] font-light text-sm'>{appointmentLocation}</h2>  
          </div>

          {/* APPOINTMENT DATE ROW */}
          <div className='flex flex-row items-center gap-1.5'>
            <Calendar size={18} color='#111' strokeWidth={1.5}/>
            <div className='flex flex-row items-center'>
              <h2 className='text-[#000] font-light text-sm'>{appointmentDay}</h2> 
              <Dot color="#333" strokeWidth={2} className=' w-4'/> 
              <h2 className='text-[#000] font-light text-sm'>{appointmentHour}</h2> 
              <Dot color="#333" strokeWidth={2} className='w-4'/> 
              <h2 className='text-[#000] font-light text-sm'>{appointmentDayOfWeek}</h2>  
            </div>
          </div>
        </div>

        {/* APPOINTMENT STATUS ROW */}
        {details.status == "Zarezerwowana" && <div className='text-xs text-white bg-green-700 py-1 px-3 rounded-md w-fit'>{details.status}</div>}
        {details.status == "Odwołana" && <div className='text-xs text-white bg-[#CF142B] py-1 px-3 rounded-md w-fit'>{details.status}</div>}

        <UserAppointmentDetailsButton appointmentDetails={details}/>
      </div>
    </div>
  );
}
