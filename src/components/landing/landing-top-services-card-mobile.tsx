import Image from 'next/image';
import category_image from '@/../public/wheels.jpg'
import Link from 'next/link';

export default function LandingTopServicesCardMobile({serviceCategoryName, serviceCategoryLink}:{serviceCategoryName:string, serviceCategoryLink: string}) {
  return (
    <Link href={`categories/?topCategory=${serviceCategoryLink}`}>    
      <div className="flex flex-col items-center gap-3 border-1 p-1">
          <div className="relative flex justify-center w-20 h-20 rounded-full overflow-hidden shadow-md">
              <Image src={category_image} alt="Category image" fill className='object-cover'/>
          </div>
          <h1 className='w-full text-center text-sm text-[#111] font-medium '>{serviceCategoryName}</h1>
      </div>
    </Link>
  );
}
