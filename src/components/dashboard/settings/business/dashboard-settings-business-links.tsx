'use client'
import { DashobardSettingInformationField } from "../dashobard-setting-information-field"
import { DashboardSettingsLinksEditButton } from "./dashboard-settings-links-edit-button"

type SettingsBusinessSocialsViewProps = {
    links: {
        facebookUrl?: string 
        instagramUrl?: string 
        websiteUrl?: string
    }
}

export const DashboardSettingsBusinessLinks = ({links}:SettingsBusinessSocialsViewProps) => {
    return(
      <div className="w-full bg-white flex flex-col gap-2 p-5 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-3xl">
        <div className="w-full flex justify-end">
            <DashboardSettingsLinksEditButton linksData={links}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashobardSettingInformationField fieldName="Facebook" fieldValue={links.facebookUrl} />
            <DashobardSettingInformationField fieldName="Instagram" fieldValue={links.instagramUrl} />
            <DashobardSettingInformationField fieldName="Strona internetowa" fieldValue={links.websiteUrl} />
        </div> 
    </div>
    )
  }