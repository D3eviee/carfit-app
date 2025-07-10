'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getWorkingTimeData, setWorkingTimeData } from '../../actions';
import { useState } from 'react';
import SettingsBusinessWorkHours from '@/components/dashboard/settings/settings-business-work-hours';
import SettingsBusinessWorkHoursEdit from '@/components/dashboard/settings/settings-business-work-hours-edit';
import { useSettingsEditingWorkingHours } from '@/lib/store';
import SettingsBreadcrumb from '@/components/dashboard/settings/settings-breadcrumb';
import SettingsPageHeader from "@/components/dashboard/settings/settings-page-header";
import SettingsSideMenu from '@/components/dashboard/settings/settings-side-menu';
import { Spinner } from '@/components/spinner';
import { Error } from '@/components/error';

export default function SettingsPage() {
  const queryClient = useQueryClient()
  const [openView, setOpenView] = useState<string>("working-days")

  const setInDays = useSettingsEditingWorkingHours(store => store.setInDays)
  const days = useSettingsEditingWorkingHours(store => store.days)

  const [isEditing, setIsEditing] = useState(false)

  const {data: workingHoursData, status: workingHoursDataStatus} = useQuery({
    queryKey: ["getWorkingTimeData"],
    queryFn: async () => {
      const workingTimeData = await getWorkingTimeData()
      if(workingTimeData !== undefined) setInDays(workingTimeData)
      return workingTimeData
    },
  })

  const {mutate} = useMutation({
    mutationKey: ["editWorkingHours"],
    mutationFn: async () => {
      const workingData = await setWorkingTimeData(days)
      return workingData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getWorkingTimeData'] })
    }
  })

  const handleSave = () => {
    mutate()
    setIsEditing(false)
  }

  if(workingHoursDataStatus =="pending" || workingHoursData == undefined) return <Spinner/>
  if(workingHoursDataStatus =="error") return <Error/>

  return (
    <div className='flex flex-col gap-5'>
      <SettingsBreadcrumb parentPage='Ustawienia' thisPage='Godziny pracy'/>
      
      <div className="w-full flex flex-col gap-8 md:flex-row lg:max-w-screen-lg">
        <SettingsSideMenu changeViewFn={setOpenView} openView={openView} pages={[{title:"Godziny pracy", view: "working-days" }]}/>
        
        <div className="w-full flex flex-col gap-5 lg:max-w-1/2">
          <SettingsPageHeader title="Godziny pracy" description="Edytuj i zmieniaj godziny otwarcia twojego zakładu pracy"/>
          <div className="w-full p-4 bg-white border-[0.5px] border-[#D4D4D4] rounded-md shadow-[0px_0px_2px_3px_#233038] ring-4 ring-[#F9F9F9] flex flex-col gap-5">
              {/* BUTTON FOR EDITING */}
              <div className='w-full flex justify-end'>
                {!isEditing ? 
                  <button 
                    className="bg-[#F2F4F8] py-1.5 px-5 text-[#111] text-sm font-normal rounded-md border-[0.5px] shadow-[0px_1px_2px_0px_#D4D4D4] hover:cursor-pointer hover:bg-[#F0F1F6]"
                    onClick={() => {setIsEditing(true)}}
                  >Edytuj</button>
                :
                  <button 
                    className="bg-[#111] py-1.5 px-5 text-white text-sm font-normal rounded-md border-[0.5px] shadow-[0px_1px_2px_0px_#D4D4D4] hover:cursor-pointer hover:bg-[#000]"
                    onClick={handleSave}
                  >
                  Zapisz
                  </button>
                }
              </div>
              {/* CONTENT */}
              {isEditing ? <SettingsBusinessWorkHoursEdit workingHoursData={days}/> : <SettingsBusinessWorkHours workingHoursData={workingHoursData}/>}
            </div>
          </div>
        </div>
    </div>
  );
}