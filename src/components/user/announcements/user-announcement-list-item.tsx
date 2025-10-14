import { format } from "date-fns";
import Link from "next/link";
import { UserAnnouncmentListItemTag } from "./user-announcement-list-item-tag";
import { UserAnnouncmentStatusTag } from "./user-announcement-status-tag";

type UserAnnouncmentListItemProps = {
  id: string
  createdAt: Date
  status: string
  title: string
  category: string
  description: string
  brand: string
  model: string
  offersCount: number
}

export const UserAnnouncmentListItem = ({ announcementData }:{ announcementData: UserAnnouncmentListItemProps }) =>{
    const announcementCreationDay = format(announcementData.createdAt, "d")
    const announcementCreationMonth = format(announcementData.createdAt, "MM")
    const announcementCreationYear = format(announcementData.createdAt, "y")
    const announcementCreationDate = `${announcementCreationDay}.${announcementCreationMonth}.${announcementCreationYear}`
    const tags = [announcementCreationDate, announcementData.category, `${announcementData.brand} ${announcementData.model}`]
    
    return (
        <Link href={`announcements/${announcementData.id}`}>
            <div className="flex flex-col gap-4 border-1 border-[#D4D4D4] rounded-3xl px-6 py-6 hover:cursor-pointer hover:border-[#AAA] transition-all ease-in duration-75 active:scale-[0.99]">
                <div className="flex flex-row gap-4">
                    <UserAnnouncmentStatusTag status={announcementData.status}/>
                    { tags.map((item) => <UserAnnouncmentListItemTag key={item} label={item}/> )}
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-main-black font-semibold text-xl">{announcementData.title}</h1>
                    <p className="text-main-black font-light text-sm line-clamp-3">{announcementData.description}</p>
                </div>

                {announcementData.offersCount == 0 
                    ? <p className="text-main-black font-semibold text-middle">Brak ofert</p> 
                    : (announcementData.offersCount == 1 
                        ? <p className="text-main-black font-semibold text-middle">{`${announcementData.offersCount} oferta`}</p>
                        : <p className="text-main-black font-semibold text-middle">{`${announcementData.offersCount} oferty`}</p>
                )}
            </div>
        </Link>
    )
} 