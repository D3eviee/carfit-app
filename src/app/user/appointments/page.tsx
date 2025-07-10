import UserAppointmentList from "@/components/user/appointments/user-appointment-list";

export default function Appointments(){
  return (
    <div className='w-full flex flex-col gap-8 px-4 md:px-12 xl:px-40 2xl:px-60'>
      <div className='flex flex-col'>
        <h1 className="text-2xl font-semibold text-black">Wizyty</h1>
        <h2 className="mt-[5px] p-0 text-sm font-light">Przeglądaj i zarządzaj swoimi wizytami</h2>
      </div>

      <UserAppointmentList/>
    </div>
  )
}