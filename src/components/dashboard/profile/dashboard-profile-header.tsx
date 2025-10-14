import Image from "next/image"
import default_user_image from "@/../public/ananymous_image.jpg"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { DashboardProfileContainerWrapper } from "./dashoboard-profile-container-wrapper"

type DashboardProfileHeaderProps = { 
    owner: string
    image: string
    createdAt: Date
}

export const DashboardProfileHeader = ({createdAt, image, owner}:DashboardProfileHeaderProps) => {
    const createdDay = format(createdAt, "d", {locale: pl})
    const rawCreatedMonth = format(createdAt, "LLLL", {locale: pl})
    const createdMonth = rawCreatedMonth[0].toUpperCase() + rawCreatedMonth.slice(1)
    const createdYear = format(createdAt, "y", {locale: pl})
    const fullCreatedDateFormatted = `${createdDay} ${createdMonth} ${createdYear}`

    return(
        <DashboardProfileContainerWrapper>
            <div className="w-full flex flex-row items-center gap-5">
                <div className="relative flex justify-center items-center rounded-full aspect-square min-h-20 min-w-20 max-h-24 max-w-24 overflow-clip">
                    <Image src={image || default_user_image} fill className="object-cover shadow-md" alt="Profile image" />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <h1 className="text-xl text-main-black font-semibold leading-none">{owner}</h1>
                    <p className="text-sm text-[#363638] font-normal">Członek od: {fullCreatedDateFormatted}</p>
                </div>
            </div>
        </DashboardProfileContainerWrapper>
    )
}