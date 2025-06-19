'use client'
import {useMutation, useQueryClient } from "@tanstack/react-query";
import SettingEditableField from "./settings-editable-field";
import { setSettingDataForBusiness } from "@/app/dashboard/actions";

type SettingsBusinessSocialsViewProps = {
    fb: string 
    ig: string 
    website: string
}

export function SettingsBusinessSocialsView({settings}:{settings: SettingsBusinessSocialsViewProps}){
    const queryClient = useQueryClient()

    const {mutate} = useMutation<unknown, unknown, Record<string, string>>({
        mutationKey: ["changeSetting"],
        mutationFn: async (data) => {   
            return await setSettingDataForBusiness(data)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getWorkingTimeData'] })
        }
      })

    return(
      <div className="w-full p-4 bg-white border-[0.5px] border-[#D4D4D4] rounded-md shadow-[0px_0px_2px_3px_#233038] ring-4 ring-[#F9F9F9]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingEditableField fieldName="Facebook" fieldValue={settings.fb} dbKey="name" onSave={(data) => mutate(data)}/>
          <SettingEditableField fieldName="Instagram" fieldValue={settings.ig} dbKey="" onSave={() => mutate}/>
          <SettingEditableField fieldName="Strona internetowa" fieldValue={settings.website} dbKey="" onSave={() => mutate}/>
        </div>
      </div>
    )
  }