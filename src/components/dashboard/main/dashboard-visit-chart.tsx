'use client'
import { Error } from '@/components/error';
import { Spinner } from '@/components/spinner';
import { cn } from '@/utils';
import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DashboardSectionTitle } from './dashboard-section-title';
import { useVisitChartAppointments } from '@/lib/hooks/dashboard/useVisitChartAppointments';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

export const DashboardVisitChart = () => {
  const rangeTypes = [{type: "w"}, {type: "m"}]
  const [chartType, setChartRange] = useState("w")
  const monthLabel = format(new Date(), "MMMM", {locale: pl})

  const {data, status} = useVisitChartAppointments()
  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  const activeChartData = chartType == "w" ? data.week : data.month
  const weekNumberOfVisits = data.week.reduce((acc, i) => acc + i.visits, 0)
  const monthNumberOfVisits = data.month.reduce((acc, i) => acc + i.visits, 0)

  return (
    <div className="w-full lg:h-1/2 p-4 flex flex-col gap-4 ring-[0.5px] ring-[#D4D4D4] shadow-lg rounded-2xl">
      <div className="flex flex-col gap-4">
        {/* headers */}
        <div className='flex flex-row justify-between items-center'>
          <DashboardSectionTitle title="Wizyty"/>
          
          {/* range selector */}
          <div className="box-border flex bg-[#F2F2F7] border-black rounded-xl p-1">
            {rangeTypes.map((type, index) => 
              <p 
                key={index} 
                className={cn("w-12 flex justify-center items-center rounded-lg text-sm  hover:cursor-pointer", 
                  chartType == type.type && "bg-[#FFF] font-medium")}
                onClick={()=>{setChartRange(type.type)}}  
              >
                {type.type.toUpperCase()}
              </p>
            )}
          </div>
        </div>
        
        <div className='w-full flex flex-col gap-3'>
          {/* NUMBER OF APPOINTMENTS IN THE RANGE */}
          <div className="flex flex-row items-baseline gap-2">
            <p className="text-[#333] font-medium text-md">{chartType == "w" ? "Wizyt w tygodniu:" : "Wizyt w miesiącu:"}</p>
            <p className="text-black font-bold text-4xl">{chartType == "w" ? weekNumberOfVisits : monthNumberOfVisits}</p>
          </div>


          {/* CHART */}
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={activeChartData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}  className='w-full text-xs'>
            <XAxis dataKey="day" padding={{ left: 10, right: 10 }}/>
            <YAxis type="number" allowDecimals={false} dataKey="visits" />
            <Tooltip  content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div style={{ backgroundColor: 'white', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}>
                    <p className="m-0 text-xs">{label} {chartType == "m" && monthLabel}</p>
                    <p className="m-0 text-xs">Zarezerwowany: {payload[0].value}</p>
                    <p className="m-0 text-xs">Odwołanych: {payload[1].value}</p>
                  </div>
                )}
                return null
              }}/>
              <Bar stackId={1} dataKey="visits" fill="#08F" barSize={chartType == "w" ? 25 : 5}/>
              <Bar stackId={1} dataKey="cancelled" fill="#F95A59" barSize={chartType == "w" ? 25 : 5}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
