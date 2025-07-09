import instagram_icon from '@/../public/instagram.png'
import facebook_icon from '@/../public/facebook.png'
import website_icon from '@/../public/website.png'
import Image from "next/image"
export const ServiceMobileSocials = () => {
  const socials = [
    {platform: "Facebook", url:"https://www.facebook.com", icon: instagram_icon},
    {platform: "Instagram", url:"https://www.instagram.com", icon: facebook_icon},
    {platform: "Website", url:"https://www.instagram.com", icon: website_icon}
  ]

  return (
    <div className="p-1 flex flex-row w-full items-center justify-center rounded-xl border-4 border-[#F6F7FB]">
      {socials.map((platform, index) => (
        <div key={index} className="py-1.5 w-full flex flex-row hover:cursor-pointer rounded-lg hover:bg-[#F6F7FB]">
          <a href={platform.url} target="blank" className="w-full">
            <div className="flex flex-col gap-2 items-center justify-center">
              <Image alt={platform.platform} src={platform.icon} width={25} height={25}  className="aspect-square"/>
              <p className="text-[#8E8E92] text-[13px] xl:text-sm font-medium">{platform.platform}</p>
            </div>
          </a>
          <div className="mx-1 w-[2px] h-[90%] bg-[#8E8E92] last-of-type:hidden"/>
        </div>
      ))}
    </div>
  )
}