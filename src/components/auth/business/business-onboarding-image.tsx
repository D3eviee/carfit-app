'use client'
import login_image from '@/../public/login_image.jpg'
import Image from "next/image"

export const BusinessOnboardingImage = () => {
  return(
    <div className="relative w-full h-full hidden lg:block"> 
      <Image src={login_image} alt="car image" fill className="object-cover"/>
    </div> 
  )
}




