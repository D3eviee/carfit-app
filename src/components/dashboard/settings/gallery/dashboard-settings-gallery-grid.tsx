'use client'
import { DashboardSettingsGalleryGridItem } from '@/components/dashboard/settings/gallery/dashboard-setting-gallery-grid-item';
import { Spinner } from '@/components/spinner';
import { Error } from '@/components/error';
import { useSettingsBusinessGallery } from '@/lib/hooks/dashboard/useSettingsBusinessImages';

export const DashboardSettingsGalleryGrid = () => {
  const { data:userImages, status }= useSettingsBusinessGallery()
  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  return (
    <div className='w-full h-fit grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {(userImages && userImages.length > 0) && userImages.map(photo => 
        <DashboardSettingsGalleryGridItem key={photo.id} photoUrl={photo.photoUrl} id={photo.id}/>
      )}
    </div>     
  )
}