'use client'
import { UserAnnouncementPageHeader } from "@/components/user/announcements/user-announcement-page-header";
import { UserAnnouncmentPageOffers } from "@/components/user/announcements/user-announcement-page-offers";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { use } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { UserAnnouncmentPageCancelAnnouncementButton } from "@/components/user/announcements/user-announcement-page-cancel-announcement-button";
import { UserAnnouncmentPageCloseAnnouncementButton } from "@/components/user/announcements/user-announcement-page-close-announcement-button";
import { useClientAnnouncement } from "@/lib/hooks/client/useClientAnnouncement";

export default function AnnouncementsPage({ params }: { params: Promise<{ id: string }> }){
  // getting business id from url
  const unwrappedParams = use(params)
  const id = unwrappedParams.id.slice(-36)
  // fetching data
  const {data: announcement, status} = useClientAnnouncement(id)
  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  return (
    <div className='w-full flex flex-col gap-8 px-4 md:px-12 xl:px-40 2xl:px-60'>
      { /* BACK BTN */ }
      <Link 
        href="/user/announcements/"
        className="w-fit bg-main-[#F2F2F7]/30 backdrop-blur-xs ring-1 ring-white shadow-sm rounded-full inset-shadow-glass p-2 hover:cursor-pointer hover:bg-[#FAFAFA]/30 hover:scale-105 active:scale-95 transition duration-75 ease-in"
      >
        <ChevronLeft color={"#191919"} size={25} strokeWidth={1.5}/>
      </Link>

      <div className="w-full flex flex-row gap-12">
        <div className="w-full flex flex-col gap-8">
          <UserAnnouncementPageHeader announcementData={announcement.announcementData}/>
          <UserAnnouncmentPageOffers announcementOffers={announcement.announcementOffers}/>
        </div>

        { announcement.announcementData.status == "open" && 
          <div className="w-2/5 flex flex-col gap-4">
            <UserAnnouncmentPageCancelAnnouncementButton announcementId={announcement.announcementData.id} /> 
            <UserAnnouncmentPageCloseAnnouncementButton announcementId={announcement.announcementData.id} />
          </div>
        }
      </div>
    </div>
  )
}