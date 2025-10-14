import service_image from '@/../public/car_service.jpg'
import { format } from 'date-fns';
import { Calendar, Clock3} from 'lucide-react';
import Image from 'next/image'
import { UserAppointmentDetailsButton } from './user-appointment-details-button';
import { AppointmentDetails } from '@/lib/types';
import { pl } from 'date-fns/locale';
import { UserAppointmentListItemStatus } from './user-appointment-list-item-status';

export const UserAppointmentListItem = ({ details }: { details: AppointmentDetails }) => {
  const {business, reservationStart, status} = details

  const appointmentDay = format(reservationStart, "d")
  const rawAppointmentMonth = format(reservationStart, "LLLL", {locale: pl})
  const appointmentMonth = rawAppointmentMonth[0].toUpperCase() + rawAppointmentMonth.slice(1)
  const appointmentYear = format(reservationStart, "y")
  const appointmentDate = `${appointmentDay} ${appointmentMonth} ${appointmentYear}`
  const appointmentHour = `${format(reservationStart, "kk")}:${format(reservationStart, "mm")}`
  const rawAppointmentDayOfWeek = format(reservationStart, "EEEE", {locale: pl})
  const appointmentDayOfWeek = rawAppointmentDayOfWeek[0].toUpperCase() + rawAppointmentDayOfWeek.slice(1)

  return (
    <div className="w-full flex flex-col rounded-4xl overflow-clip bg-[#F9F9F9] shadow-sm">
      {/* SERVICE IMAGE */} 
      <div className='relative w-full max-h-[210px] overflow-hidden aspect-[16/10]'>
        <Image src={business.image || service_image} fill  className='object-cover' alt="Service image"/>
      </div>
      
      {/* SERVICE APPOINTMENT DETAILS */}
      <div className="w-full h-auto flex flex-col gap-6 px-4 py-6">
        <div className='flex flex-col gap-4'>
          <UserAppointmentListItemStatus status={status}/>
          <h1 className='text-main-black text-lg font-semibold text-pretty leading-4 sm:leading-5'>{business.name}</h1>
          <div className='flex flex-col gap-2'>
            {/* DATE */}
            <div className='flex flex-row items-center gap-1.5'>
              <Calendar size={18} color='#191919' strokeWidth={1.5}/>
              <p className='text-[#191919] text-sm'>{appointmentDayOfWeek}, {appointmentDate}</p>  
            </div>
            <div className='flex flex-row items-center gap-1.5'>
              <Clock3 size={18} color='#191919' strokeWidth={1.5}/>
              <p className='text-[#191919]  text-sm'>{appointmentHour}</p> 
            </div>
          </div>
        </div>
        <UserAppointmentDetailsButton appointmentDetails={details}/>
      </div>
    </div>
  );
}
