import Image from 'next/image';
import category_image from '@/../public/service_image_1.jpg'

export default function LandingTopServicesCard({serviceCategoryName}:{serviceCategoryName:string}) {
  return (
    <div className="flex-none w-[200px] h-[170px] rounded-md  border-1 border-[0.5px] border-[#D4D4D4] shadow-md overflow-clip">
        <div className="h-[128px] overflow-hidden">
            <Image src={category_image}  alt="wheels change" height={128} width={200}/>
        </div>
        <div className="flex items-center bg-white px-2.5 h-[42px]">
            <h1>{serviceCategoryName}</h1>
        </div>
    </div>
  );
}
