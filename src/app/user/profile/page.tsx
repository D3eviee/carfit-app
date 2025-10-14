'use client'
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { UserProfileHeader } from "@/components/user/profile/user-profile-header";
import { UserProfileData } from "@/components/user/profile/user-profile-data";
import { UserProfileSecurity } from "@/components/user/profile/user-profile-security";
import { UserProfileDeleteProfileButton }  from "@/components/user/profile/user-profile-delete-profile-button";
import { UserProfileCars } from "@/components/user/profile/user-profile-cars";
import { useClientProfileData } from "@/lib/hooks/client/useClientProfileData";

export default function Profile(){
  const {data:userProfileData, status:userProfileDataStatus} = useClientProfileData()
  if (userProfileDataStatus === "pending") return <div className="flex pt-20"><Spinner color="#000"/></div>
  if(userProfileDataStatus == "error") return <Error/>

  const { image, name, createdAt, cars } = userProfileData;
  const headerData = { image, name, createdAt };

  return (
    <div className="pb-4 w-full h-full flex flex-col gap-5 px-4 sm:px-[100px] md:px-[150px] lg:px-[300px]">
      <UserProfileHeader headerData={headerData}/>  
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-2/3 flex flex-col gap-5">     
          <UserProfileData userData={userProfileData}/>
          <UserProfileSecurity/>
          <div className="w-full hidden lg:block">
            <UserProfileDeleteProfileButton/>
          </div>     
        </div>
        <div className="w-full lg:w-1/3 flex flex-col">
          <UserProfileCars userCars={cars}/>
          <div className="w-full lg:hidden">
            <UserProfileDeleteProfileButton/>
          </div>
        </div>
      </div>  
    </div>
  )
}