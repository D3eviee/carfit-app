import Link from "next/link"

export const ClientFooter = () => {
    return (
    <div className="mt-20">
        <SmallFooterLayout/>
        <LargeFooterLayout/>
    </div>
    )
}

const SmallFooterLayout = () => {
    return (
        <div className="flex flex-col md:hidden" >
            <div className="bg-[#F2F2F7] py-6 w-full flex flex-row justify-between items-start px-4">
            <div className="flex flex-col gap-2 items-start">
                 <Link href="/policy"><p className="text-small text-[#000] font-light w-fit">Polityka prywatności</p></Link>
                <Link href="/terms"><p className="text-small text-[#000] font-light w-fit">Regulamin</p></Link>
            </div>
            <div className="flex flex-col gap-2 items-end px-4">
                <Link href="/business"><p className="text-small text-[#000] font-light w-fit">Aplikacja dla biznesu</p></Link>
                <Link href="/support"><p className="text-small text-[#000] font-light w-fit">Kontakt</p></Link>
            </div>
        </div>
        <div className="flex flex-row justify-between items-center gap-2 px-4 py-3">
            <Link href="/"><p className="text-sm">CarFit</p></Link>
            <p className="font-light text-xs text-main-[#8A8A8A]">&#169; 2025 CarFit Wszystkie prawa zastrzeżone</p>
        </div>
    </div>
    )
}

const LargeFooterLayout = () => {
    return (
    <div className="bg-[#F2F2F7] py-4 px-4 w-full hidden md:flex flex-row justify-between md:px-12 xl:px-40 2xl:px-60">
        <div className="flex flex-row items-center gap-2">
            <Link href="/"><p className="font-medium text-lg">CarFit</p></Link>
            <p className="font-light text-sm text-main-[#8A8A8A]">&#169; 2025 CarFit</p>
        </div>
        <div className="flex flex-row items-center justify-between sm:justify-normal gap-6">
            <Link href="/policy"><p className="text-small text-[#000] font-light w-fit">Polityka prywatności</p></Link>
            <Link href="/terms"><p className="text-small text-[#000] font-light w-fit">Regulamin</p></Link>
            <Link href="/business"><p className="text-small text-[#000] font-light w-fit">Aplikacja dla biznesu</p></Link>
            <Link href="/support"><p className="text-small text-[#000] font-light w-fit">Kontakt</p></Link>
        </div>
    </div>
    )
}