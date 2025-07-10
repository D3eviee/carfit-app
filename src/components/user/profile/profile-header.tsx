'use client'
import Image from "next/image";
import default_user_image from "@/../public/default_user_image.png"
import ProfileHeaderEditButton from "./profile-header-edit-button";

type ProfileHeaderProps = {
    userData: {
        id: string
        phone: string
        email: string,
        image: string,
        name: string,                
    }
}

export default function ProfileHeader({userData}: ProfileHeaderProps){
    const {name, email, phone,image} = userData
    
    return (
        <div className="w-full flex flex-col items-center gap-5 p-4 bg-[#F2F2F7] border border-[#F2F4F8] rounded-2xl shadow-inner-glass">
            <div className="w-full flex flex-col items-center gap-3">
                <div className="relative flex justify-center items-center rounded-full aspect-square max-w-44 shadow-md overflow-clip">
                    <Image src={image || default_user_image} height={120}  width={120} className="object-cover" alt="Profile" />
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-xl text-[#171717] font-bold leading-7">{name}</h1>
                    <p className="text-sm text-[#111] font-base">{email}</p>
                    <p className="text-sm text-[#111] font-base">+48 {phone}</p>
                </div>
            </div>

            <ProfileHeaderEditButton userData={userData}/>
        </div>
  )
}