import { UserProfileContainerWrapper } from "./user-profile-container-wrapper"
import { UserProfileEditDataButton } from "./user-profile-edit-data-button"

type UserProfileDataProps = {
    userData: {
        id: string
        phone: string
        email: string,
        image: string,
        name: string,                
    }
}

export const UserProfileData = ({userData}:UserProfileDataProps) => {
    const {email, name, phone} =  userData

    return (
       <UserProfileContainerWrapper>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex justify-end">
                    <UserProfileEditDataButton userData={userData}/> 
                </div>
                <div className="w-full flex flex-col gap-2 px-2">
                    <div className="w-full flex flex-col gap-0.5 text-middle text-[#111]">
                        <p className="font-semibold">Imię i nazwisko</p>
                        <p className="font-base">{name}</p>
                    </div>
                    <hr className="w-full border-[0.5px] text-[#D4D4D4]"></hr>
                    <div className="w-full flex flex-col gap-0.5 text-middle text-[#111]">
                        <p className="font-semibold">Email</p>
                        <p className="font-base">{email}</p>
                    </div>
                    <hr className="w-full border-[0.5px] text-[#D4D4D4]"></hr>
                    <div className="w-full flex flex-col gap-0.5 text-middle text-[#111]">
                        <p className="font-semibold">Telefon</p>
                        <p className="font-base">+48 {phone}</p>
                    </div>
                </div>
            </div>  
        </UserProfileContainerWrapper>
  )
}