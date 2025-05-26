import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

type DashboardVisitChartProps = {
  day: string
  numberOfVisits: number
}

export default function DashboardVisitChart({reservationData}: {reservationData:DashboardVisitChartProps[]}){
  return (
    <div className="border-2 flex flex-col w-full h-1/2 p-8 rounded-[10px] justify-between gap-3">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-[#111] text-md">Liczba wizyt</h1>
        <div className="flex flex-row gap-2">
          <h2 className="text-[#555] font-semibold text-2xl">Dzisiaj: </h2>
          <h2 className="text-[#555] font-normal text-2xl">{reservationData?.[6].numberOfVisits} Wizyty</h2>
        </div>
      </div>
      
      <div>
        <BarChart width={500} height={220} data={reservationData}>
          <XAxis dataKey="day"/>
          <YAxis type="number" dataKey="numberOfVisits" allowDecimals={false}/>
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
            <Bar dataKey="numberOfVisits" fill="#1674F0" barSize={20}/>
            </BarChart>
      </div>
    </div>
  )
}
