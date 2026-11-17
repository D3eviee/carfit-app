import Image from "next/image";
import Link from "next/link";
import default_image from "@/../public/default_user_image.png";
import { createLinkFormat } from "@/utils";

type Props = {
  service: {
    id: string
    name: string
    image: string | null
  }
  onSelect: (value: string) => void
}

export const LandingSearchFormCategoryDropdownResultItem = ({ service, onSelect }: Props) => {
  const { id, name, image } = service

  return (
    <Link
      href={createLinkFormat(id, name)}
      onClick={() => onSelect(name)}
      className="flex flex-row items-center gap-3 rounded-md p-2 outline-none hover:bg-[#F2F2F7] focus-visible:bg-[#F2F2F7]"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-clip rounded-full">
        <Image src={image || default_image} alt="" fill sizes="40px" className="object-cover" />
      </div>
      <p className="text-sm font-medium text-[#191919]">{name}</p>
    </Link>
  )
}