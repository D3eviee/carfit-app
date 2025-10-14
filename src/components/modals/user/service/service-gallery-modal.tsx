import Image from "next/image";
import { ModalBackButton } from "../../../buttons/modal-back-button";

type ServiceGalleryModalProps = {
  images:{
    id: string;
    businessId: string;
    photoUrl: string;
    priority: number; 
  }[]
}
export const ServiceGalleryModal = ({images}: ServiceGalleryModalProps) =>  {
  return (
    <div className="h-full w-full overflow-scroll bg-white md:rounded-4xl md:w-[85%] md:h-[75%] lg:w-[80%] xl:w-[65%] 2xl:w-[57%]">
      <div className="flex flex-col gap-5 h-full">
        <div className="w-full z-10 fixed p-6 md:absolute md:bg-[#FFF] md:shadow-small md:w-[85%] lg:w-[80%] xl:w-[65%] 2xl:w-[57%] md:rounded-t-4xl">
          <ModalBackButton/>
        </div>
       <div className="px-6 mt-26 flex flex-col gap-5 py-5">
          {/* TITLE */}
          <h1 className="text-main-black text-2xl font-bold leading-none">Galeria</h1>
          {/* IMAGES */}
          <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6">
            { images.map((image) => 
              <div key={image.id} className="rounded-3xl overflow-clip relative w-full aspect-16/10 shadow-sm">
                <Image src={image.photoUrl} alt="gallery image" fill className="object-fill"/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}