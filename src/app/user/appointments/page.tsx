import UserAppointmentList from '../../../components/user/user-appointment-list';

export default function Appointments(){
  return (
    <div className='w-full mx-auto flex flex-col gap-8 px-5 sm:w-[70%] md:w-[80%] lg:w-[70%]'>
      <div className='flex flex-col'>
        <h1 className="text-2xl font-semibold text-black">Wizyty</h1>
        <h2 className="mt-[5px] p-0 text-sm font-light">Przeglądaj i zarządzaj swoimi wizytami</h2>
      </div>

      <UserAppointmentList/>
    </div>
  )
}