import Image from "next/image"
import defaultImage from "@/../public/default_user_image.png"

type NavbarAvatarProps = {
    image: string | null
    size?: number
}

export const NavbarAvatar = ({ image, size = 36 }: NavbarAvatarProps) => {
    return (
        <span
            className="relative block shrink-0 overflow-clip rounded-full shadow-[0px_0px_3px_1px_#00000030]"
            style={{ width: size, height: size }}
        >
            <Image src={image || defaultImage} alt="" fill sizes={`${size}px`} className="object-cover" />
        </span>
    )
}