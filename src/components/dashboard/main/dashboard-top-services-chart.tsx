import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

type DashboardTopServicesChartProps = {
  name: string
  count: number
}

export default function DashboardTopServicesChart({topServicesData}: {topServicesData:DashboardTopServicesChartProps[]}){
  return (
    <div className="border-2 flex flex-col w-full h-1/2 p-8 rounded-[10px] justify-between gap-8">
      <h1 className="font-semibold text-[#111] text-md">Najczęściej wybierane usługi</h1>
        <div>
          <BarChart width={500} height={250} data={topServicesData} layout="vertical" margin={{left: 10 }}>
            <XAxis type="number" className="text-sm" allowDecimals={false} />
            <YAxis type="category" dataKey="name" className="text-xs" tick={{ fontSize: 14 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#1674F0" barSize={20} />
          </BarChart>
        </div>
    </div>
  )
}
