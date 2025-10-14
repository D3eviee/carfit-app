'use client'
import { Error } from '@/components/error';
import { Spinner } from '@/components/spinner';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { DashboardSectionTitle } from './dashboard-section-title';
import { useServicesChartAppointments } from '@/lib/hooks/dashboard/useServicesChartAppointments';

export const DashboardTopServicesChart = () => {
  const {data, status} = useServicesChartAppointments()
  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>
  return (
    <div className="w-full lg:h-1/2 p-4 flex flex-col gap-4 ring-[0.5px] ring-[#D4D4D4] shadow-lg rounded-2xl">
      <DashboardSectionTitle title="Najczęściej rezerwowane usługi"/>

      { data.length == 0 
        ? <p className='text-center py-30 text-[#363638] text-sm'>Brak danych do wyświetlenia</p> 
        : <ResponsiveContainer width="100%" height={330} className="p-1 rounded-xl">
            <PieChart>
              <Pie data={data} nameKey={"name"} dataKey={"count"} cx="50%" cy="50%" outerRadius={100} fill="#FF383C" />
            </PieChart>
          </ResponsiveContainer>
      }      
    </div>
  )
}
