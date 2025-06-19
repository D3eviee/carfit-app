'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SettingEditableField from "./settings-editable-field";
import { setSettingDataForBusiness } from "@/app/dashboard/actions";

type SettingsBusinessDetailsViewProps = {
  street: string 
  district: string
  town: string
  zipcode: string
}

export function SettingsBusinessLocationView({settings}:{settings: SettingsBusinessDetailsViewProps}){
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
      <div className="w-full bg-white p-4 border-[0.5px] border-[#D4D4D4] rounded-md shadow-[0px_0px_2px_3px_#233038] ring-4 ring-[#F9F9F9]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingEditableField fieldName="Miasto" fieldValue={settings.town} dbKey="name"onSave={(data) => mutate(data)}/>
          <SettingEditableField fieldName="Dzielnica" fieldValue={settings.district} dbKey="" onSave={() => mutate}/>
          <SettingEditableField fieldName="Ulica" fieldValue={settings.street} dbKey="" onSave={() => mutate}/>
          <SettingEditableField fieldName="Kod pocztowy" fieldValue={settings.zipcode} dbKey=""  onSave={() => mutate}/>
        </div>
      </div>
    )
  }