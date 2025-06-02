import Image from 'next/image';
import oklejanie from "../../../public/service_image_1.jpg"
import { ChevronRight } from 'lucide-react';

type CategoryItemProps = {
  categoryName: string;
  onClick: () => void;
}

export function OnboardingCategoryItem({categoryName, onClick = () => {}}:CategoryItemProps) {
  return(
    <div className="box-border px-1 py-3 flex justify-between items-center border-b-[0.5px] border-[#CCCCCC] hover:cursor-pointer" onClick={()=>onClick()}>
      <div className="flex gap-3 items-center">
        <Image src={oklejanie} alt="Category image" height={45} width={45} className='aspect-square rounded-full'/>
        <h3 className="m-0 p-0 text-sm font-normal text-[#333333]">{categoryName}</h3>
      </div>
      <ChevronRight strokeWidth="0.5px" color='#333333'/>
    </div>
  )
}