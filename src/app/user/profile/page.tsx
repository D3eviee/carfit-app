'use client'
import { useQuery } from "@tanstack/react-query";
import { getUserProfileData } from "../actions";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import ProfileHeader from "@/components/user/profile/profile-header";
import ProfileStats from "@/components/user/profile/profile-stats";

export default function Profile(){
  const {data: userProfileData, status: userProfileDataStatus} = useQuery({
    queryKey: ["userProfileData"],
    queryFn: async () => {
      const response =  await getUserProfileData()
      if(!response.success) return null
      return response.data
    }
  })

  if(userProfileDataStatus == "pending") return <Spinner/>
  if(userProfileDataStatus == "error") return <Error/>


  return (
    <div className="flex flex-col gap-5 md:gap-10 lg:gap-14 px-4 md:px-12 xl:px-40 2xl:px-96">
      <ProfileHeader userData={userProfileData}/>  
      <ProfileStats reservationsData={userProfileData.Reservation}/>     
    </div>
  )
}