import UserAnnouncmentPageOffersItem from "./user-announcement-page-offers-item";

type UserAnnouncmentPageOffersProps = {
  description: string
  id: string
  image: string
  name: string
  town: string
  district: string
  zipcode: string
  street: string
}

export const UserAnnouncmentPageOffers = ({announcementOffers}: {announcementOffers: UserAnnouncmentPageOffersProps[]}) => {
  return (
    <div className="flex flex-col gap-10 border-[0.5px] border-[#D4D4D4] rounded-2xl px-6 py-6">
        <h1 className="text-main-black font-semibold text-2xl px-2">Oferty</h1>
        { announcementOffers.length == 0 
          ?  <p className="w-full text-sm font-light text-main-black text-center">Brak ofert  </p> 
          : <div className="flex flex-col gap-6">
              {announcementOffers.map((offer) => <UserAnnouncmentPageOffersItem key={offer.id} offerData={offer}/>)}
            </div>
        }
    </div>
  )
}