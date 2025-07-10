import { Review } from "@/lib/types"

export const ServiceSummaryBars = ({data}: {data: Review[]}) =>  {
  const numberOfReviews = data.length

  return (
    <>
      {[5, 4, 3, 2, 1].map((rateValue) => {
        const numberShare = (data.filter((item) => item.rate == rateValue).length/numberOfReviews)*100

        return (
          <div key={rateValue} className="w-full flex flex-row items-center gap-2"> 
          {/* STARS */}
            <div className="flex flex-row gap-0.5 ">
              {[5, 4, 3, 2, 1].map((index) => 
                <svg key={index} xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill={index-1 < rateValue ? "#ff9f0b" : "none"} stroke="none" viewBox="0 0 16 16" >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              )}
            </div>

            <div className="relative w-full h-[5px] bg-[#F2F2F7] mt-0.5">
              <div className="top-0 left-0 absolute bg-[#008AFF] h-[5px] rounded-sm" style={{width: `${numberShare}%`}}/>
            </div> 
          </div>
        )
      })}
    </>    
  )
}