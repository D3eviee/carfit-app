'use client'
import { useQuery } from '@tanstack/react-query';
import { getSettingsDataForBusiness } from '../../actions';
import { SettingsBusinessDetailsView } from '@/components/dashboard/settings/settings-business-details-view';
import { SettingsBusinessLocationView } from '@/components/dashboard/settings/settings-business-location-view';
import { SettingsBusinessSocialsView } from '@/components/dashboard/settings/settings-business-socials-view';
import { useState } from 'react';
import SettingsBreadcrumb from '@/components/dashboard/settings/settings-breadcrumb';
import SettingsViewTitle from '@/components/dashboard/settings/settings-view-title';
import SettingsSideMenu from '@/components/dashboard/settings/settings-side-menu';

export default function SettingsPage() {
  const [openView, setOpenView] = useState<string>("details")

  const {data: settings, status: settingsStatus} = useQuery({
    queryKey: ["settingsServiceData"],
    queryFn: async () => {
      const settingData = await getSettingsDataForBusiness()
      return settingData
    }
  }) 

  const pages = [
    {title: "Szczegóły", view:"details"}, 
    {title: "Lokalizacja", view:"locations"}, 
    {title: "Linki", view:"links"}
  ]

  let header = {title: "", subtitle:""}
  if (openView === "details") header = {title: "Business details", subtitle: "Zarządzaj danymi swojego serwisu"}
  else if (openView === "locations") header = {title: "Locations", subtitle: "Zarządzaj lokalizacją swojego serwisu"}
  else if (openView === "links") header = {title: "Social links", subtitle: "Dodaj, usuń lub edytuj linki do swoich mediów społecznościowych"}

  if(settingsStatus =="pending" || settings == undefined) return <p>Pending...</p>
  if(settingsStatus =="error") return <p>Error...</p>

  const settingsBusinessDetailsViewData = {businessName: settings.name, language: "Polski", country: "Polska", currency: "PLN" }
  const settingsBusinessLocationViewData = {town: settings.town, district: settings.district, street: settings.street, zipcode: settings.zipcode }
  const settingsBusinessSocialsViewData = {fb: "facebook.com", ig: "instagram.com", website: "Brak"}

  return (
    <div className='flex flex-col gap-5'>
      <SettingsBreadcrumb parentPage='Ustawienia' thisPage='Serwis'/>
      
      <div className="w-full flex flex-col gap-8 md:flex-row lg:max-w-screen-lg">
        <SettingsSideMenu changeViewFn={setOpenView} openView={openView} pages={pages}/>
        <div className="w-full flex flex-col gap-5 lg:max-w-1/2">
          <SettingsViewTitle openView={openView}/> 
          {openView == "details" && <SettingsBusinessDetailsView settings={settingsBusinessDetailsViewData}/>}
          {openView == "locations" && <SettingsBusinessLocationView settings={settingsBusinessLocationViewData}/>}
          {openView == "links" && <SettingsBusinessSocialsView settings={settingsBusinessSocialsViewData}/>}
        </div>
      </div>
    </div>
  );
}