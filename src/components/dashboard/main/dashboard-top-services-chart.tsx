import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DashboardTopServicesChartProps = {
  name: string
  count: number
}

export default function DashboardTopServicesChart({topServicesData}: {topServicesData:DashboardTopServicesChartProps[]}){
  return (
    <div className="w-full p-4 flex flex-col gap-4 border rounded-lg">
      <h1 className="text-[#111] text-md font-normal">Popularne usługi</h1>
      {/* CHART */}
      <ResponsiveContainer width="100%" height={220} className="border p-1 rounded-md">
        <BarChart data={topServicesData}>
          <XAxis type="number" className="text-sm" allowDecimals={false} scale="auto" padding={{ left: 10, right: 10 }} />
          <YAxis type="category" dataKey="name" className="text-xs" tick={{ fontSize: 14 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#1674F0" barSize={15} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
