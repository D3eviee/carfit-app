import Image from "next/image"

export const ServiceGallery = ({images}:{images:{id:string, photoUrl:string}[]}) => {
    return (
        <div className="flex gap-[16] md:w-full md:h-[510px]">
          <Image src={images[0].photoUrl} alt="Service image 1" height={500} width={760} className="rounded-[10px]"/>
          <div className="hidden flex-col gap-[16px] md:flex">
            <div className="flex-none overflow-hidden rounded-[10px] h-[247px] w-[441px]">
              <Image src={images[1].photoUrl} alt="Service image 2" height={247} width={441}/>
            </div>
            <div className="flex-none overflow-hidden rounded-[10px] h-[247px] w-[441px]">
              <Image src={images[2].photoUrl} alt="Service image 2" height={247} width={441}/>
            </div>
          </div>
        </div>
    )
}