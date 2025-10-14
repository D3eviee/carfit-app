'use client'
import { Spinner } from "@/components/spinner"
import { Error } from "@/components/error"
import { DashboardProfileDeleteAccountButton } from "@/components/dashboard/profile/profile-delete-account-button"
import { DashboardProfileHeader } from "@/components/dashboard/profile/dashboard-profile-header"
import { DashboardProfileData } from "@/components/dashboard/profile/dashboard-profile-data"
import { DashboardProfileSecurity } from "@/components/dashboard/profile/dashbaord-profile-security"
import { useBusinessProfile } from "@/lib/hooks/dashboard/useBusinessProfile"

export default function DashboardProfile () {
    const { data:profileData, status }= useBusinessProfile()
    if(status == "pending") return <Spinner/>
    if(status == "error") return <Error/>
    
    return (
        <div className="flex flex-col gap-5 lg:w-4/5 xl:w-[55%]">
            <DashboardProfileHeader image={profileData.image} owner={profileData.owner} createdAt={profileData.createdAt}/>
            <DashboardProfileData userData={profileData}/>
            <DashboardProfileSecurity/>
            <DashboardProfileDeleteAccountButton/>
        </div>
    )
}