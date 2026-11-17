import { LandingSection } from "./LandingSection"

export const ServicesSectionSkeleton = ({ title }: { title: string }) => {
    return (
        <LandingSection title={title}>
            <div className="flex w-full flex-row gap-5 overflow-hidden pr-4" aria-busy="true">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-[250px] w-[220px] shrink-0 animate-pulse rounded-2xl bg-[#F2F2F7] xl:h-[310px] xl:w-[280px]" />
                ))}
            </div>
        </LandingSection>
  )
}