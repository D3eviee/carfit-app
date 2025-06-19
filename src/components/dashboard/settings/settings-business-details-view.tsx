'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SettingEditableField from "./settings-editable-field";
import { setSettingDataForBusiness } from "@/app/dashboard/actions";

type SettingsBusinessDetailsViewProps = {
    businessName: string 
    language: string 
    country: string
    currency: string 
}

export function SettingsBusinessDetailsView({settings}:{settings: SettingsBusinessDetailsViewProps}){
    const queryClient = useQueryClient()
    const {mutate} = useMutation<unknown, unknown, Record<string, string>>({
        mutationKey: ["changeSetting"],
        mutationFn: async (data) => {   
            return await setSettingDataForBusiness(data)
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settingsServiceData'] })
      })

    return(
      <div className="w-full p-4 bg-white border-[0.5px] border-[#D4D4D4] rounded-md shadow-[0px_0px_2px_3px_#233038] ring-4 ring-[#F9F9F9]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-20 ">
          <SettingEditableField fieldName="Nazwa firmy" fieldValue={settings.businessName} dbKey="name" isEditable={true} onSave={(data) => mutate(data)}/>
          <SettingEditableField fieldName="Język" fieldValue={settings.language} dbKey="" isEditable={false} onSave={() => mutate}/>
          <SettingEditableField fieldName="Kraj" fieldValue={settings.country} dbKey="" isEditable={false } onSave={() => mutate}/>
          <SettingEditableField fieldName="Waluta" fieldValue={settings.currency} dbKey=""  isEditable={false} onSave={() => mutate}/>
        </div>
      </div>
    )
  }