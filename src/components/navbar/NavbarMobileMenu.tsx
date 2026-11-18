'use client'
import { CloseButton } from "../buttons/close-button";
import { useMobileNavigationStore, useModalStore } from "@/lib/store";
import { useEffect } from "react";
import { NavbarAvatar } from "./NavbarAvatar";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { LogoutModal } from "../modals/LogoutModal";
import { NavbarUser } from "@/lib/types";
import { BUSINESS_ROUTES, CLIENT_ROUTES, GUEST_ROUTES, NavRoute, SUPPORT_ROUTE } from "./NavbarRoutes";

const routesFor = (user: NavbarUser): NavRoute[] => {
  if (user.role === "CLIENT") return [...CLIENT_ROUTES, SUPPORT_ROUTE]
  if (user.role === "BUSINESS") return BUSINESS_ROUTES
  return GUEST_ROUTES
}

export const NavbarMobileMenu = ({ user }:{ user: NavbarUser }) => {
  const closeMenu = useMobileNavigationStore((store) => store.closeMenu)
  const openModal = useModalStore((store) => store.openModal)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [closeMenu])

  const isSignedIn = user.role !== "NONAUTHORIZED"
  
  return ( 
    <div role="dialog" aria-modal="true" aria-label="Menu" className="flex h-full w-full flex-col bg-white">
      <div className="flex w-full justify-end px-4 py-2">
        <CloseButton onCloseFn={closeMenu} />
      </div>

      {isSignedIn && (
        <div className="mx-3 mb-2 flex items-center gap-3 rounded-2xl bg-[#F2F2F7] px-3 py-3">
          <NavbarAvatar image={user.image} size={44} />
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-base font-medium text-[#191919]">{user.name}</p>
            {user.phone && <p className="text-sm font-light text-[#363638]">{user.phone}</p>}
          </div>
        </div>
      )}

      <nav aria-label="Menu mobilne" className="flex flex-col gap-1 px-3">
        {routesFor(user).map((route) => (
          <Link
            key={route.href}
            href={route.href}
            onClick={closeMenu}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-base text-[#191919] hover:bg-[#F2F2F7] active:bg-[#F2F2F7]"
          >
            <span aria-hidden className="flex shrink-0 text-[#8A8A8E] [&_svg]:size-5">{route.icon}</span>
            {route.label}
          </Link>
        ))}
      </nav>
      
      {isSignedIn && (
        <div className="mt-auto px-4 pb-[max(12px,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => openModal(<LogoutModal />)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#EC6A5C] py-3 text-base font-medium text-white active:scale-xs"
          >
            <LogOut aria-hidden size={18} strokeWidth={1.5} />
            Wyloguj
          </button>
        </div>
      )}
    </div>
  )
}