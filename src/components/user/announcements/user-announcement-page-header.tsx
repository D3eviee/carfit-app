import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInYears, format } from "date-fns"
import { UserAnnouncmentStatusTag } from "./user-announcement-status-tag"
import { displayAddedTime } from "@/utils"

type UserAnnouncementPageHeaderProps = {
  status: string
  title: string
  description: string
  createdAt: Date
  category: string
  brand: string
  model: string
  year: number
  town: string
  district: string
}

export const UserAnnouncementPageHeader = ({announcementData}: { announcementData: UserAnnouncementPageHeaderProps}) => {
  const {status, createdAt, title, category, town, district, brand, model, year, description} = announcementData

  const detailTags = [
    { label: "Kategoria", value: category},
    { label: "Preferowana lokalizacja", value: `${town} - ${district}`},
    { label: "Pojazd", value: `${brand} ${model} (${year}) `}
  ] 

  return (
    <div className="flex flex-col gap-10 border-[0.5px] border-[#D4D4D4] rounded-3xl px-6 py-6">
            {/* LISTING DATES AND STATUS */}
            <div className="flex flex-row gap-4">
              <UserAnnouncmentStatusTag status={status}/>
              <div className="w-fit h-fit px-4 py-1 text-xs rounded-lg bg-[#F2F2F7] font-medium">{displayAddedTime(createdAt)}</div>
            </div>
            {/* LISTING TITLE ANDA TAGS */}
            <div className="flex flex-col gap-6">
              <h1 className="text-main-black font-semibold text-2xl">{title}</h1>
              {/* OFFERING TAGS */}
              <div className=" flex flex-col gap-4">
                {detailTags.map((item, i) =>  
                  <div key={i} className="h-fit w-fit bg-[#F2F2F7] flex flex-row gap-1 px-3 py-1 rounded-lg border-[0.5px] border-[#D4D4D4]">
                    <p className="text-main-black text-sm font-medium">{item.label}:</p>
                    <p className="text-main-black text-sm font-light">{item.value}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-main-black font-medium text-md ">Opis</p>
              <p className="text-main-black font-light text-middle">{description}</p>
            </div>
          </div>
  )
}