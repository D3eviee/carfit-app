import Image from 'next/image';
import SettingsGalleryGridItemDeleteButton from './settings-gallery-grid-item-delete-button';

type SettingsGalleryGridItemProps = {
    photoUrl:string
    id:string
}

export default function SettingsGalleryGridItem({photoUrl, id}:SettingsGalleryGridItemProps) {
  return ( 
    <div className='w-full flex flex-col gap-3 bg-[#F2F4F6] p-1 rounded-md border shadow-sm'>
        <div className='relative w-full h-[170px] rounded-md overflow-hidden border  '>
            <Image fill src={photoUrl} key={id} alt="image" objectFit='cover'/>
        </div>
        <SettingsGalleryGridItemDeleteButton id={id}/>
    </div>    
  )
}