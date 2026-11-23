import Image from "next/image"
import instagram_icon from "@/../public/instagram.png"
import facebook_icon from "@/../public/facebook.png"
import website_icon from "@/../public/website.png"

type ServiceMobileSocialsProps = {
  facebookUrl: string | null
  instagramUrl: string | null
  websiteUrl: string | null
}

// "facebook.com/x" → "https://facebook.com/x"; empty → null
const toExternalUrl = (url: string | null) => {
  const trimmed = url?.trim()
  if (!trimmed) return null
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export const ServiceMobileSocials = ({ facebookUrl, instagramUrl, websiteUrl }: ServiceMobileSocialsProps) => {
  const socials = [
    { platform: "Facebook", url: toExternalUrl(facebookUrl), icon: facebook_icon },
    { platform: "Instagram", url: toExternalUrl(instagramUrl), icon: instagram_icon },
    { platform: "Website", url: toExternalUrl(websiteUrl), icon: website_icon },
  ].filter((s): s is typeof s & { url: string } => s.url !== null)

  if (socials.length === 0) return null

  return (
    <div className="p-1 flex flex-row w-full items-center justify-center rounded-xl border-4 border-[#F2F2F7]">
      {socials.map(({ platform, url, icon }) => (
        <div key={platform} className="py-2 w-full flex flex-row hover:cursor-pointer rounded-lg hover:bg-[#F2F2F7] active:scale-95 transition-all duration-150">
          <a href={url} target="_blank" rel="noopener noreferrer" className="w-full">
            <div className="flex flex-col gap-2 items-center justify-center">
              <Image alt="" src={icon} width={25} height={25} className="aspect-square" />
              <p className="text-[#8E8E92] text-[13px] xl:text-sm font-medium leading-3">{platform}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  )
}