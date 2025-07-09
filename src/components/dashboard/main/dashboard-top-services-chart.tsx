import { getTopServicesChartData } from '@/app/dashboard/actions';
import { Error } from '@/components/error';
import { Spinner } from '@/components/spinner';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, ResponsiveContainer} from 'recharts';

export default function DashboardTopServicesChart(){
    const {data, status} = useQuery({
      queryKey: ["getTopServicesChartData"],
      queryFn: async () => {
        const response = await getTopServicesChartData()
        if(response.success) return response.data
        return null
      }
    })

  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  return (
    <div className="w-full p-4 flex flex-col gap-4 border rounded-lg">
      <h1 className="text-[#111] text-md font-normal">Udział usług</h1>
      {/* CHART */}
      <ResponsiveContainer width="100%" height={250} className="border p-1 rounded-md">
        <PieChart>
          <Pie data={data} nameKey={"name"} dataKey={"count"} cx="50%" cy="50%" outerRadius={100} fill="#FF5F58" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
