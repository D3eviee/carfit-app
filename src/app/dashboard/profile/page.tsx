'use client'
import Image from "next/image"
import default_picture from "@/../public/ananymous_image.jpg"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getSideNavigationProfileData } from "@/actions/actions"
import { Spinner } from "@/components/spinner"
import { Error } from "@/components/error"
import { ProfileChangePasswordButton } from "@/components/dashboard/profile/profile-change-password-button"
import { ProfileEditProfileButton } from "@/components/dashboard/profile/profile-edit-profile-button"
import { ProfileDeleteAccountButton } from "@/components/dashboard/profile/profile-delete-account-button"

export default function ProfilePage () {
    const [error, setError] = useState<string>()
    
    const {data: profileData, status} = useQuery({
        queryKey: ["getSidebarNavigationProfileData"],
        queryFn: async () => {
            const result = await getSideNavigationProfileData()
            if (!result.success) setError(result.message)
            return result.data
        }
    })
    
    if(status == "pending") return <Spinner/>
    if(status == "error") return <Error message={error}/>

    const phoneNumberFormatted = `+48 ${profileData.phone.slice(0,3)} ${profileData.phone.slice(3,6)} ${profileData.phone.slice(6)}` 
    
    return (
    <>
        <div className="flex flex-col gap-5 lg:w-4/5 xl:w-[55%]">
            {/* Image, name and mamebership */}
            <div className="w-full flex flex-row items-end gap-3 p-4 border bg-[#F5F6F8] rounded-md">
                {/* image */}
                <div className="relative w-[90px] h-[90px] rounded-full overflow-clip">
                    <Image
                        src={profileData.image ? profileData.image : default_picture} 
                        alt='Profile image' 
                        fill
                        className="object-cover"
                    />
                </div>
                {/* Name and mamebership */}
                <div className="flex flex-col gap-1.5 pb-2">
                    <h1 className="text-lg text-[#111] font-medium leading-none">{profileData.owner}</h1>
                    <h2 className="text-sm text-[#333] font-normal leading-none">{profileData.name}</h2>
                </div>
            </div>

            {/* Basic data*/}
            <div className="w-full flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center px-3">
                    <h1 className="text-lg font-medium font-[#333]">Dane</h1>
                    <ProfileEditProfileButton profileData={{name: profileData.owner, email: profileData.email, phone: profileData.phone}}/>
                </div>
                    
                {/* Name and mamebership */}
                <div className="grid grid-cols-[1fr] p-4 gap-5 bg-[#F5F6F8] border rounded-md sm:grid-cols-[1fr_1fr] sm:gap-y-8 sm:gap-x-0">
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-[#111] font-medium">Imię i nazwisko</p>
                        <p className="text-sm text-[#333] font-normal">{profileData.owner}</p>
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-[#111] font-medium">Email</p>
                        <p className="text-sm text-[#333] font-normal">{profileData.email}</p>
                    </div>
                    {/* Phone */}
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-[#111] font-medium">Telefon</p>
                        <p className="text-sm text-[#333] font-normal">{phoneNumberFormatted}</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-1">
                <h1 className="text-lg font-medium font-[#333] px-3">Hasło i bezpieczeństwo</h1>
                {/* Name and mamebership */}
                <div className="bg-[#F5F6F8] border flex flex-col gap-1 pb-2 p-3 rounded-md">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-[#111] font-medium">Hasło</p>
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-sm text-[#333] font-normal">************</p>
                            <ProfileChangePasswordButton/>
                        </div>
                    </div>
                </div>
            </div>

            <ProfileDeleteAccountButton/>
        </div>
     </>   
    )
}