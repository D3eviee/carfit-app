"use client"
import type { ReactNode } from "react"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { useModalStore } from "@/lib/store"
import type { NavbarProfileData } from "@/lib/types"
import { formatPhoneNumber } from "@/utils"
import { LogoutModal } from "../modals/LogoutModal"
import { NavbarAvatar } from "./NavbarAvatar"
import { CLIENT_ROUTES, SUPPORT_ROUTE } from "./NavbarRoutes"

type DropdownLinkProps = {
  href: string
  label: string
  icon: ReactNode
  onClose: () => void
}

const DropdownLink = ({ href, label, icon, onClose }: DropdownLinkProps) => {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClose}
      className="flex items-center gap-2 rounded-md border-[0.5px] border-transparent px-2 py-1.5 text-xs text-[#8A8A8A] outline-none hover:border-[#DADDE1] hover:bg-[#F9FAFC] focus-visible:border-[#DADDE1] focus-visible:bg-[#F9FAFC]"
    >
      <span aria-hidden className="flex shrink-0 [&_svg]:size-4">{icon}</span>
      {label}
    </Link>
  )
}

type NavbarProfileDropdownProps = {
  user: NavbarProfileData
  onClose: () => void
}

export default function NavbarProfileDropdown({ user, onClose }: NavbarProfileDropdownProps) {
  const openModal = useModalStore((store) => store.openModal)

  const handleLogout = () => {
    onClose()
    openModal(<LogoutModal />)
  }

  return (
    <div
      role="menu"
      className="absolute right-0 top-full z-50 mt-2 flex w-[210px] flex-col gap-2 rounded-2xl bg-white px-2.5 py-3 shadow-[0px_0px_3px_1px_#EEE]"
    >
      {/* Profile card */}
      <div className="flex items-center gap-1.5 rounded-xl bg-[#F2F2F7] px-2 py-1.5">
        <NavbarAvatar image={user.image} />
        <div className="flex min-w-0 flex-col">
          <p className="truncate text-xs font-medium text-[#191919]">{user.name}</p>
          {user.phone && (
            <p className="text-xs font-light tracking-wide text-[#191919]">{formatPhoneNumber(user.phone)}</p>
          )}
        </div>
      </div>

      {/* Routes */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-1">
          {CLIENT_ROUTES.map((route) => (
            <DropdownLink
              key={route.href}
              href={route.href}
              label={route.label}
              icon={route.icon}
              onClose={onClose}
            />
          ))}
        </div>

        <hr className="border-[#F2F2F7]" />

        <DropdownLink
          href={SUPPORT_ROUTE.href}
          label={SUPPORT_ROUTE.label}
          icon={SUPPORT_ROUTE.icon}
          onClose={onClose}
        />

        <button
          type="button"
          role="menuitem"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md bg-[#EC6A5C] px-2 py-1.5 text-xs text-white hover:bg-[#DB593B] cursor-pointer"
        >
          <LogOut aria-hidden size={16} strokeWidth={1.5} />
          Wyloguj
        </button>
      </div>
    </div>
  )
}