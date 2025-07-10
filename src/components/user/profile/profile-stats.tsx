'use client'

type ProfileStatsProps = {
    reservationsData: {
        charge: number
    }[]
}

export default function ProfileStats({reservationsData}: ProfileStatsProps){
    const userVisits = reservationsData.length
    const userSpendings = reservationsData.reduce((sum, i) => sum += i.charge, 0)
    return (
        <div className="w-full flex flex-col items-center gap-3 sm:flex-row">
            <div className="w-full bg-[#F2F2F7] border border-[#F2F4F8] shadow-inner-glass rounded-2xl p-5 flex flex-col gap-2">
                <p>Umówionych wizyt</p>
                <h1 className="text-5xl font-extralight">{userVisits}</h1>
            </div>
            <div className="w-full bg-[#F2F2F7] border border-[#F2F4F8] shadow-inner-glass rounded-2xl p-5 flex flex-col gap-2">
                <p>Wydano na wizyty</p>
                <h1 className="text-5xl font-extralight">{userSpendings} PLN</h1>
            </div>
        </div>
  )
}