import { DashobardSettingInformationField } from "../dashobard-setting-information-field";
import { DashboardSettingsLocationEditButton } from "./dashboard-settings-location-edit-button";

type SettingsBusinessDetailsViewProps = {
  town: string
  district: string
  street: string
  zipcode: string
}

export const DashboardSettingsBusinessLocation = ({locationData}:{locationData: SettingsBusinessDetailsViewProps}) => {
    const { town, district, street, zipcode} = locationData

    return(
        <div className="w-full bg-white flex flex-col gap-2 p-5 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-3xl">
            <div className="w-full flex justify-end">
                <DashboardSettingsLocationEditButton locationData={locationData}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashobardSettingInformationField
                    fieldName="Miasto" 
                    fieldValue={town} 
                />
                <DashobardSettingInformationField
                    fieldName="Dzielnica" 
                    fieldValue={district} 
                />
                <DashobardSettingInformationField
                    fieldName="Kod pocztowy"  
                    fieldValue={zipcode} 
                />
                <DashobardSettingInformationField
                    fieldName="Ulica" 
                    fieldValue={street} 
                />
            </div> 
      </div>
    )
}


