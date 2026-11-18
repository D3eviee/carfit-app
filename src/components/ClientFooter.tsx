import Link from "next/link"

type FooterLink = { label: string; href: string }

const PRIVACY: FooterLink = { label: "Polityka prywatności", href: "/policy" }
const TERMS: FooterLink = { label: "Regulamin", href: "/terms" }
const BUSINESS: FooterLink = { label: "Aplikacja dla biznesu", href: "/business" }
const CONTACT: FooterLink = { label: "Kontakt", href: "/support" }
const BLOG: FooterLink = { label: "Blog", href: "/blog" }

const LEGAL_LINKS = [PRIVACY, TERMS]
const MOBILE_SITE_LINKS = [BUSINESS, CONTACT, BLOG]
const DESKTOP_LINKS = [PRIVACY, TERMS, BLOG, BUSINESS, CONTACT]

const linkClass = "text-small text-[#000] font-light w-fit outline-none underline-offset-2 hover:underline focus-visible:underline"

const FooterLinks = ({ links }: { links: FooterLink[] }) =>
    links.map((link) => ( <Link key={link.href} href={link.href} className={linkClass}> {link.label} </Link> ))

export const ClientFooter = () => {
    const year = new Date().getFullYear()
    
    return (
        <footer className="mt-20">
            <SmallFooterLayout year={year} />
            <LargeFooterLayout year={year} />
        </footer>
    )
}

const SmallFooterLayout = ({ year }: { year: number }) => {
    return (
        <div className="flex flex-col md:hidden">
            <div className="bg-[#F2F2F7] py-6 w-full flex flex-row justify-between items-start px-4">
                <div className="flex flex-col gap-2 items-start">
                    <FooterLinks links={LEGAL_LINKS} />
                </div>
                <div className="flex flex-col gap-2 items-end px-4">
                    <FooterLinks links={MOBILE_SITE_LINKS} />
                </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-2 px-4 py-3">
                <Link href="/" className="text-sm">CarFit</Link>
                <p className="font-light text-xs text-[#8A8A8A]">&#169; {year} CarFit Wszystkie prawa zastrzeżone</p>
            </div>
        </div>
    )
}

const LargeFooterLayout = ({ year }: { year: number }) => {
    return (
        <div className="bg-[#F2F2F7] py-4 px-4 w-full hidden md:flex flex-row justify-between md:px-12 xl:px-40 2xl:px-60">
            <div className="flex flex-row items-center gap-2">
                <Link href="/" className="font-medium text-lg">CarFit</Link>
                <p className="font-light text-sm text-[#8A8A8A]">&#169; {year} CarFit</p>
            </div>
            <div className="flex flex-row items-center justify-between sm:justify-normal gap-6">
                <FooterLinks links={DESKTOP_LINKS} />
            </div>
        </div>
    )
}