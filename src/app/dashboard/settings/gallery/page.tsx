import { DashboardSettingsBreadcrumb } from '@/components/dashboard/settings/dashboard-settings-breadcrumb';
import { DasboardSettingsSideMenu } from "@/components/dashboard/settings/dashboard-settings-side-menu";
import { SettingsPageHeader }  from "@/components/dashboard/settings/settings-page-header";
import { DashboardSettingsGalleryUploadButton } from '@/components/dashboard/settings/gallery/dashboard-settings-gallery-upload-button';
import { DashboardSettingsGalleryGrid } from '@/components/dashboard/settings/gallery/dashboard-settings-gallery-grid';

export default function DashboardSettingsGallery() {
  return (
    <div className='h-full w-full flex flex-col gap-5 overflow-hidden'>
      <DashboardSettingsBreadcrumb parentPage='Ustawienia' thisPage='Galeria'/>
      <div className="w-full h-full flex flex-col gap-8 md:flex-row overflow-hidden">
        <DasboardSettingsSideMenu openView="gallery" pages={[{title:"Galeria", view: "gallery" }]}/>
        <div className="w-full h-full flex flex-col gap-5 lg:max-w-1/2">
          <SettingsPageHeader title="Galeria" description="Edytuj i zmieniaj zdjęcia widoczne na twoim profilu"/>
          <div className="w-full h-fit bg-white flex flex-col gap-5 p-4 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-4xl overflow-scroll">
            <DashboardSettingsGalleryUploadButton/>
            <DashboardSettingsGalleryGrid/>
          </div>
        </div>
      </div>
    </div>      
  );
}