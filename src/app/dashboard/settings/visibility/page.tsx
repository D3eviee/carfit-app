'use client'
import { useState } from 'react';
import { DashboardSettingsBreadcrumb } from '@/components/dashboard/settings/dashboard-settings-breadcrumb';
import { DasboardSettingsSideMenu } from '@/components/dashboard/settings/dashboard-settings-side-menu';
import { Spinner } from '@/components/spinner';
import { Error } from '@/components/error';
import { SettingsPageHeader } from '@/components/dashboard/settings/settings-page-header';
import { DashboardSettingsVisibilityToggle } from '@/components/dashboard/settings/visibility/dashboard-settings-visibility-toggle';
import { DashboardSettingsVisibilityRequirements } from '@/components/dashboard/settings/visibility/dashboard-settings-visibility-requirements';
import { useSettingsVisibilityCheck } from '@/lib/hooks/dashboard/useSettingsVisibiltyCheck';

export default function VisibilitySetting() {
  const [openView, setOpenView] = useState<string>("visibility")
  const {data, status} = useSettingsVisibilityCheck()
  if(status =="pending" ) return <Spinner color='#000'/>
  if(status =="error") return <Error/>
  const {imageCount, isPublic, serviceCount } = data
  const isToggleDisabled = !(imageCount >= 3 && serviceCount >= 1)

  return (
    <div className='flex flex-col gap-5'>
      <DashboardSettingsBreadcrumb parentPage='Ustawienia' thisPage='Widoczność'/>
      <div className="w-full flex flex-col gap-8 md:flex-row">
        <DasboardSettingsSideMenu changeViewFn={setOpenView} openView={openView} pages={[{title:"Szczegóły", view: "visibility" }]}/>
        <div className="w-full flex flex-col gap-5 lg:max-w-1/2">
          <SettingsPageHeader title="Ustawienia widoczności" description="Pozwól klientom na znalezienie swojego serwisu."/>
          <div className="w-full bg-white flex flex-col gap-10 p-6 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-2xl">
            <DashboardSettingsVisibilityRequirements imageCount={imageCount} serviceCount={serviceCount}/>            

            <div className='flex flex-row gap-5 px-3'>
              <p className='text-md text-main-black '>Publikuj</p>
              <DashboardSettingsVisibilityToggle isDisabled={isToggleDisabled} isPublic={isPublic} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



    
