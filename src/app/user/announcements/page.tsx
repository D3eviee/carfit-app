'use client'
import { UserAddAnnouncementButton } from "@/components/user/announcements/user-add-announcment-button";
import { UserAnnouncmentListItem } from "@/components/user/announcements/user-announcement-list-item";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { useClientAnnouncements } from "@/lib/hooks/client/useClientAnnouncements";

export default function Announcements(){
  const {data: userAnnouncement, status} = useClientAnnouncements()
  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  return (
    <div className='w-full flex flex-col gap-8 px-4 md:px-12 xl:px-40 2xl:px-60'>
      <div className='flex flex-row justify-between items-end'>
        <div className='flex flex-col gap-1.5'>
        <p className="text-2xl font-semibold text-main-black">Twoje ogłoszenia</p>
        <p className="text-sm font-normal text-main-black">Dodawaj ogłoszenia i pozwól aby to warsztaty znalazły ciebie</p>
        </div>
        <UserAddAnnouncementButton/>    
      </div>

      <div className="flex flex-col gap-4">
        {userAnnouncement.map((announcement) => <UserAnnouncmentListItem key={announcement.id} announcementData={announcement}/>)}
      </div>
    </div>
  )
}