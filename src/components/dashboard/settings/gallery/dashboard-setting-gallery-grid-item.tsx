import Image from 'next/image';
import { DashboardSettingsGalleryGridItemDeleteButton } from './dashboard-setting-gallery-grid-item-delete-button';

type SettingsGalleryGridItemProps = {
    photoUrl:string
    id:string
}

export const DashboardSettingsGalleryGridItem = ({photoUrl, id}:SettingsGalleryGridItemProps) => {
  return ( 
    <div className='w-full h-full flex flex-col gap-3 bg-[#F2F2F7] overflow-clip rounded-3xl p-2 border-[0.5px] border-[#D4D4D4]'>
        <div className='relative aspect-video overflow-hidden rounded-2xl'>
            <Image fill src={photoUrl} key={id} alt="image" className='object-cover'/>
        </div>
        <DashboardSettingsGalleryGridItemDeleteButton id={id}/>
    </div>    
  )
}