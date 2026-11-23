import { BusinessForYouSection } from "@/components/business/BusinessForYouSection";
import { BusinessHeader } from "@/components/business/BusinessHeader";
import { BusinessProfitsSection } from "@/components/business/BusinessProfitsSection";
import { BusinessSupportSection } from "@/components/business/BusinessSupportSection";
import { BusinessTrySection } from "@/components/business/BusinessTrySection";
import { BusinessIntroductionSection } from "@/components/business/BusinessIntroductionSection";

export default function BusinessPage() {
  return (
   <div className="flex flex-col overflow-hidden">
      <div  aria-hidden className="bg-gradient-to-t from-[#F2F2F7] from-5% to-[#FFF] blur-sm absolute top-0 h-9/12 sm:h-2/3 lg:h-5/12 2xl:h-7/12 w-full -z-10" />
      <BusinessHeader/>
      <BusinessProfitsSection/>
      <BusinessForYouSection/>
      <BusinessIntroductionSection/>
      <BusinessSupportSection/>
      <BusinessTrySection/>
    </div>
  )
}
