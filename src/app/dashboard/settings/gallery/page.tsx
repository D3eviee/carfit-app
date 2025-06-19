'use client'
import { useQuery } from '@tanstack/react-query';
import { getBusinessImages } from '../../actions';    
import SettingsBreadcrumb from '@/components/dashboard/settings/settings-breadcrumb';
import SettingsSideMenu from "@/components/dashboard/settings/settings-side-menu";
import SettingsPageHeader from "@/components/dashboard/settings/settings-page-header";
import SettingsGalleryGridItem from '@/components/dashboard/settings/settings-gallery-grid-item';
import SettingsGalleryUploadButton from '@/components/dashboard/settings/settings-gallery-upload-button';

export default function SettingsPage() {
  const {data: userImages, status: userImagesStatus} = useQuery({
    queryKey: ["getUserImages"],
    queryFn: async () => {
      const respose =  await getBusinessImages()
      if(!respose.success) return null
      return respose.data
    }
  })

  if(userImagesStatus == "pending") return <p>Pending</p>
  if(userImagesStatus == "error") return <p>Error</p>

  return (
    <div className='flex flex-col gap-5'>
      <SettingsBreadcrumb parentPage='Ustawienia' thisPage='Galeria'/>
      
      <div className="w-full flex flex-col gap-8 md:flex-row lg:max-w-screen-lg">
        <SettingsSideMenu openView="gallery" pages={[{title:"Galeria", view: "gallery" }]}/>
        <div className="w-full flex flex-col gap-5 lg:max-w-1/2">
          <SettingsPageHeader title="Galeria" description="Edytuj i zmieniaj zdjęcia widoczne na twoim profilu"/>
          <div className="w-full p-4 bg-white border-[0.5px] border-[#D4D4D4] rounded-md shadow-[0px_0px_2px_3px_#233038] ring-4 ring-[#F9F9F9] flex flex-col gap-5">
            {/* BUTTON FOR ADDING IMAGES */}
            <SettingsGalleryUploadButton/>
            {/* IMAGES GRID */}
            <div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3  '>
              {(userImages && userImages.length > 0) && userImages.map(photo => (
                <SettingsGalleryGridItem key={photo.id} photoUrl={photo.photoUrl} id={photo.id}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>      
  );
}