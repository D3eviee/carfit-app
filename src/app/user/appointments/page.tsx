import UserAppointmentList from '../../../components/user/user-appointment-list';

export default function Appointments(){
  return (
    <div className='w-full px-5 flex flex-col flex-wrap gap-8 md:w-[90%] lg:w-[70%] mx-auto'>
      <div className='flex flex-col'>
        <h1 className="text-2xl font-semibold text-black">Wizyty</h1>
        <h2 className="mt-[5px] p-0 text-sm font-light">Przeglądaj i zarządzaj swoimi wizytami</h2>
      </div>

      <UserAppointmentList/>
    </div>
  )
}