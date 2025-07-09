import { Review } from "@/lib/types";
import { differenceInYears, format } from "date-fns";
import { pl } from "date-fns/locale";
import { Dot } from "lucide-react";

export const ServiceMobileReviewItem = ({review}: {review:Review}) => {
  const {client, title, content, rate, createdAt} = review
  const displayReviewDate = (createdDate: Date) => {
    const today = new Date()
    const yearDiff = differenceInYears(today, createdDate)

    if(yearDiff == 0) return `${format(createdDate, "d")} ${format(createdDate, "MMM", {locale: pl})}`
    else {
      if(yearDiff == 1) return `${yearDiff} rok temu`
      else if(yearDiff > 1 && yearDiff < 5) return `${yearDiff} lata temu`
      else return `${yearDiff} lat temu`
    }
  }

  return (
    <>
      <div className="snap-center min-w-[95%] max-h-40 w-full px-4 py-5 flex flex-col shadow-inner-glass-sm ring-1 ring-[#F2F2F7] bg-[#FAFAFA] gap-4 rounded-2xl">
        <div className="flex flex-col gap-1">
          <h2 className="text-[#191919] text-[15px] font-medium leading-none tracking-normal">{title}</h2>
          <div className="flex flex-row items-center">
            <div className="flex flex-row gap-1">
              {[...Array(5)].map((_, i)=> 
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill={rate-1 >= i ? "#ff9f0b" : "none" } stroke="#ff9f0b" viewBox="0 0 16 16" >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              )}
            </div>
            <Dot size={16} color="#C5C5C5"/>
            <p className="text-[#8A8A8E] text-sm font-light">{displayReviewDate(createdAt)}</p>
            <Dot size={16} color="#C5C5C5"/>
            <p className="text-[#8A8A8E] text-sm font-light">{client.name}</p>
          </div>
        </div>
        <p className="text-[#191919] text-sm text-pretty leading-5 line-clamp-3">{content}</p>
      </div>
    </>
  )
}
