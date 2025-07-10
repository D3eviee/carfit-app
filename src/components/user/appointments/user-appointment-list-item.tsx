import service_image from '@/../public/car_service.jpg'
import { format } from 'date-fns';
import { Calendar, Dot, MapPin } from 'lucide-react';
import Image from 'next/image'
import UserAppointmentDetailsButton from './user-appointment-details-button';
import { AppointmentDetails } from '@/lib/types';
import { pl } from 'date-fns/locale';

export default function UserAppointmentListItem({ details }: { details: AppointmentDetails }) {
  const {business, reservationStart, status} = details

  // formating values - location and dates  
  const appointmentLocation = `${business.street}, ${business.district}, ${business.town}`
  const appointmentDay = format(reservationStart, "d")
  const rawAppointmentMonth = format(reservationStart, "LLLL", {locale: pl})
  const appointmentMonth = rawAppointmentMonth[0].toUpperCase() + rawAppointmentMonth.slice(1)
  const appointmentYear = format(reservationStart, "y")
  const appointmentDate = `${appointmentDay} ${appointmentMonth} ${appointmentYear}`
  const appointmentHour = `${format(reservationStart, "kk")}:${format(reservationStart, "mm")}`
  const rawAppointmentDayOfWeek = format(reservationStart, "EEEE", {locale: pl})
  const appointmentDayOfWeek = rawAppointmentDayOfWeek[0].toUpperCase() + rawAppointmentDayOfWeek.slice(1)

  return (
    <div className="w-full flex flex-col rounded-xl overflow-clip bg-[#F2F2F7] shadow-inner-glass">
      {/* SERVICE IMAGE */} 
      <div className='relative w-full h-[160px] overflow-hidden'>
        <Image src={service_image} className='w-full h-full object-cover' alt="Service image"/>
      </div>
      
      {/* SERVICE APPOINTMENT DETAILS */}
      <div className="w-full h-auto flex flex-col gap-3 px-3 py-5">
        {/* BUSINESS NAME ROW */}
        <h2 className='text-[#191919] text-md font-semibold text-pretty leading-3 sm:leading-5'>{business.name}</h2>

        {/* DATE AND LOCATION SECTION */}
        <div className='flex flex-col gap-1 '>
          {/* BUSINESS LOCATION ROW */}
          <div className='flex flex-row items-center gap-1.5'>
            <MapPin width={18} color='#111' strokeWidth={1.5}/>
            <h2 className='text-[#191919] font-light text-sm'>{appointmentLocation}</h2>  
          </div>

          {/* APPOINTMENT DATE ROW */}
          <div className='flex flex-row items-center gap-1.5'>
            <Calendar size={18} color='#111' strokeWidth={1.5}/>
            <div className='flex flex-row items-center'>
              <h2 className='text-[#191919] font-light text-sm'>{appointmentDate}</h2> 
              <Dot color="#333" strokeWidth={2} className=' w-4'/> 
              <h2 className='text-[#191919] font-light text-sm'>{appointmentHour}</h2> 
              <Dot color="#333" strokeWidth={2} className='w-4'/> 
              <h2 className='text-[#191919] font-light text-sm'>{appointmentDayOfWeek}</h2>  
            </div>
          </div>
        </div>

        {/* APPOINTMENT STATUS ROW */}
        {details.status == "Zarezerwowana" && <div className='text-xs text-white bg-green-700/90 py-1 px-3 rounded-md w-fit'>{status}</div>}
        {details.status == "Odwołana" && <div className='text-xs text-white bg-[#CF142B] py-1 px-3 rounded-md w-fit'>{status}</div>}

        <UserAppointmentDetailsButton appointmentDetails={details}/>
      </div>
    </div>
  );
}
