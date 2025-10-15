import { DashboardSettingsEditBusinessNameModal } from "@/components/modals/dashboard/settings/dashboard-settings-edit-business-name-modal";
import { SettingBusinessInformationEditable } from "../settings-business-information-editable";
import { DashobardSettingInformationField } from "../dashobard-setting-information-field";

type SettingsBusinessDetailsViewProps = {
    businessName: string 
    language: string 
    country: string
    currency: string 
}

export const DashboardSettingsBusinessDetails = ({settings}:{settings: SettingsBusinessDetailsViewProps}) => {
    const {businessName, country, currency, language } = settings

    return(
      <div className="w-full bg-white flex flex-col gap-2 p-5 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-3xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-20">
          <SettingBusinessInformationEditable
            fieldName="Nazwa firmy" 
            fieldValue={businessName} 
            editModal={<DashboardSettingsEditBusinessNameModal businessName={businessName}/>}
          />
          <DashobardSettingInformationField
            fieldName="Język" 
            fieldValue={language} 
          />
          <DashobardSettingInformationField 
            fieldName="Kraj" 
            fieldValue={country} 
          />
          <DashobardSettingInformationField 
            fieldName="Waluta" 
            fieldValue={currency} 
          />
        </div>
      </div>
    )
  }