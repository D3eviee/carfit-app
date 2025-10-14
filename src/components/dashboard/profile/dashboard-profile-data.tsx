import { DashboardProfileEditDataButton } from "./dashboard-profile-edit-data-button"
import { DashboardProfileContainerWrapper } from "./dashoboard-profile-container-wrapper"

type DashboardProfileDataProps = {
    userData: {
        phone: string
        email: string,
        image: string,
        owner: string,                
    }
}

export const DashboardProfileData = ({userData}:DashboardProfileDataProps) => {
    const {email, owner, phone} = userData
    return(
        <DashboardProfileContainerWrapper>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex justify-end">
                    <DashboardProfileEditDataButton userData={userData} />
                </div>
                <div className="w-full flex flex-col gap-2 px-2">
                    <div className="w-full flex flex-col gap-0.5 text-middle text-[#111]">
                        <p className="font-semibold">Imię i nazwisko</p>
                        <p className="font-base">{owner}</p>
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
        </DashboardProfileContainerWrapper>
    )
}