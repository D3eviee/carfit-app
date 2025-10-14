import Image from 'next/image';
import oklejanie from "../../../../public/car_image.png"
import { ChevronRight } from 'lucide-react';

type BusinessOnboardingCategoryItemProps = {
  categoryName: string;
  onClick: () => void;
}

export const BusinessOnboardingCategoryItem = ({categoryName, onClick}:BusinessOnboardingCategoryItemProps) => {
  return(
    <div 
      onClick={onClick}
      className="w-full px-2 py-3 flex flex-row justify-between items-center rounded-xl hover:cursor-pointer hover:bg-[#F6F7FB] active:scale-95"
    >
      <div className='flex flex-row gap-3 items-center'>
        <div className="relative h-12 w-12 flex gap-3 items-center rounded-full overflow-clip">
          <Image src={oklejanie} alt="Category image" fill className='object-cover'/>
        </div>
        <p className="text-sm text-[#363638]">{categoryName}</p>
      </div>
      <ChevronRight strokeWidth="1" color='#8A8A8A'/>
    </div>
  )
}