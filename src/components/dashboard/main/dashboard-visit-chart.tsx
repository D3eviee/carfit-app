import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DashboardVisitChartProps = {
  day: string
  numberOfVisits: number
}

export default function DashboardVisitChart({reservationData}: {reservationData:DashboardVisitChartProps[]}){
  return (
    <div className="w-full p-4 flex flex-col gap-4 border rounded-lg">
      <div className="flex flex-col gap-4">
        {/* TITLE*/}
        <h1 className="text-[#111] text-md font-normal">Wizyty</h1>

        {/* RANGE SELECTOR AND VISITS COUNTER AND CHART*/}
        <div className='w-full flex flex-col gap-3'>
          {/* RANGE SELECTOR */}
          <div className='flex flex-row align-center rounded-md overflow-clip'>
            <p className='w-1/3 text-sm text-center border border-r-0 text-white bg-[#111] py-1'>Dzień</p>
            <p className='w-1/3 text-sm text-center border py-1'>Tydzień</p>
            <p className='w-1/3 text-sm text-center border py-1 border-l-0'>Miesiąc</p>
          </div>
          {/* NUMBER OF APPOINTMENTS IN THE RANGE */}
          <div className="flex flex-row items-center gap-1">
            <h2 className="text-[#333] font-medium text-md">Dzisiaj: </h2>
            <h2 className="text-[#000] font-semibold text-md">{reservationData?.[6].numberOfVisits} Wizyty</h2>
          </div>

          {/* CHART */}
          <ResponsiveContainer width="100%" height={220} className=" border rounded-md">
            <BarChart data={reservationData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}  className='w-full text-xs'>
            <XAxis dataKey="day" scale="point" padding={{ left: 10, right: 10 }}/>
            <YAxis type="number" allowDecimals={false} dataKey="numberOfVisits"/>
            <Tooltip  content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div style={{ backgroundColor: 'white', padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}>
                    <p className="m-0 text-xs"><strong>{label}</strong></p>
                    <p className="m-0 text-xs">Liczba wizyt: {payload[0].value}</p>
                  </div>
                )}
                return null
              }}/>
              <Bar dataKey="numberOfVisits" fill="#1674F0" barSize={15}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
