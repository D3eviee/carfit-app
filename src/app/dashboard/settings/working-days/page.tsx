'use client'
import { useState } from 'react';
import { DashboardSettingsWorkingDaysGrid }  from '@/components/dashboard/settings/working-days/dashboard-settings-working-days-grid';
import { DashboardSettingsBreadcrumb } from '@/components/dashboard/settings/dashboard-settings-breadcrumb';
import { SettingsPageHeader } from "@/components/dashboard/settings/settings-page-header";
import { DasboardSettingsSideMenu } from '@/components/dashboard/settings/dashboard-settings-side-menu';
import { Spinner } from '@/components/spinner';
import { Error } from '@/components/error';
import { DashboardSettingWorkingDaysEditButton } from '@/components/dashboard/settings/working-days/dashboard-settings-working-days-edit-button';
import { useSettingsBusinessWorkingHours } from '@/lib/hooks/dashboard/useSettingsBusinessWorkingHours';

export default function DashboardSettingsWorkingDays() {
  const [openView, setOpenView] = useState<string>("working-days")
  const {data:businessWorkingHours, status} = useSettingsBusinessWorkingHours()
  if(status == "pending" ) return <Spinner/>
  if(status == "error") return <Error/>

  return (
    <div className='w-full flex h-full flex-col gap-5 overflow-scroll'>
      <DashboardSettingsBreadcrumb parentPage='Ustawienia' thisPage='Godziny pracy'/>
      <div className="w-full flex flex-col gap-8 md:flex-row">
        <DasboardSettingsSideMenu changeViewFn={setOpenView} openView={openView} pages={[{title:"Godziny pracy", view: "working-days" }]}/>
        <div className="w-full flex flex-col gap-5 lg:max-w-1/2">
          <SettingsPageHeader title="Godziny pracy" description="Edytuj i zmieniaj godziny otwarcia twojego zakładu pracy"/>
          
          <div className="w-full bg-white flex flex-col gap-4 p-5 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-3xl">
            <div className='w-full flex justify-end'>
              <DashboardSettingWorkingDaysEditButton workingHoursData={businessWorkingHours}/>
            </div>
            <DashboardSettingsWorkingDaysGrid workingHoursData={businessWorkingHours}/>
          </div>
        </div>
      </div>
    </div>
  )
}