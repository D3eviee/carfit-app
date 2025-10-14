import Image from "next/image";
import Link from "next/link";

type UserAnnouncmentPageOffersItemProps = {
  description: string
  id: string
  image: string
  name: string
  town: string
  district: string
  zipcode: string
  street: string
}

export default function UserAnnouncmentPageOffersItem({offerData}: {offerData: UserAnnouncmentPageOffersItemProps}){
  const address = `${offerData.street}, ${offerData.district}, ${offerData.town}, ${offerData.zipcode}`

  return (
    <Link href={`/service/${offerData.name}-${offerData.id}`} className="hover:cursor-pointer hover:scale-[1.005] duration-150 transition-all ease-in-out">
      <div className="flex flex-row border-[#D4D4D4] border-[0.5px] rounded-2xl overflow-clip">
        <div className="relative w-64 aspect-[4/3]">
          <Image alt="serivce image" src={offerData.image} fill className="object-cover"/>
        </div>
        
        <div className="flex flex-col gap-6 px-6 py-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-main-black font-medium text-md leading-none">{offerData.name}</h1>
            <p className="text-main-black font-light text-middle leading-none">{offerData.description}</p>
          </div>
          <p className="w-fit text-main-black px-4 py-1 bg-[#F2F2F2] rounded-md font-light text-sm leading-none">{address}</p>
        </div>
      </div>
    </Link>
  )
}