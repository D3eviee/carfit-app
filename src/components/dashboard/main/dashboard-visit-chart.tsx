import { getLastMonthReservationChartData } from '@/app/dashboard/actions';
import { Error } from '@/components/error';
import { Spinner } from '@/components/spinner';
import { cn } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export default function DashboardVisitChart(){
  const rangeTypes = [{type: "w"}, {type: "m"}]
  const [chartType, setChartRange] = useState("w")

    const {data, status} = useQuery({
    queryKey: ["getMonthReservationsChartData" ],
    queryFn: async () => {
      const response = await getLastMonthReservationChartData()
      if(response.success) return response.data
      return null
    }
  })


  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  const activeChartData = chartType == "w" ? data.week : data.month

  return (
    <div className="w-full p-4 flex flex-col gap-4 border rounded-lg">
      <div className="flex flex-col gap-4">
        {/* headers */}
        <div className='flex flex-row justify-between'>
          {/* title */}
          <h1 className="text-[#111] text-md font-medium">Wizyty</h1>

          {/* range selector */}
          <div className='w-fit flex flex-row items-center rounded-lg overflow-clip border'>
            {rangeTypes.map((type, index) => 
              <p 
                key={index} 
                className={cn("text-sm px-4  bg-[#FFF] py-0.5 hover:cursor-pointer", chartType == type.type && "bg-[#111] text-white")}
                onClick={()=>{setChartRange(type.type)}}  
              >{type.type.toUpperCase()}</p>
            )}
          </div>
        </div>
        

        <div className='w-full flex flex-col gap-3'>
          {/* NUMBER OF APPOINTMENTS IN THE RANGE */}
          <div className="flex flex-row items-center gap-1">
            <h2 className="text-[#333] font-medium text-md">Dzisiaj: </h2>
            <h2 className="text-[#000] font-semibold text-md"> Wizyty</h2>
          </div>

          {/* CHART */}
          <ResponsiveContainer width="100%" height={320} className=" border rounded-md">
            <BarChart data={activeChartData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}  className='w-full text-xs'>
            <XAxis dataKey="day" scale="point" padding={{ left: 10, right: 10 }}/>
            <YAxis type="number" allowDecimals={false} dataKey="visits"/>
            <Tooltip  content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div style={{ backgroundColor: 'white', padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}>
                    <p className="m-0 text-xs"><strong>{label}</strong></p>
                    <p className="m-0 text-xs">Odwołanych: {payload[1].value}</p>
                  </div>
                )}
                return null
              }}/>
              <Bar stackId={1} dataKey="visits" fill="#1674F0" barSize={15}/>
              <Bar stackId={1} dataKey="cancelled" fill="red" barSize={15}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
