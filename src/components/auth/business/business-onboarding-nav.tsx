import { ArrowLeft } from "lucide-react";

export const BusinessOnboardingNav = ({ prevStepFn }: {prevStepFn: () => void}) => {
  return (
    <div className="w-full">
      <div onClick={prevStepFn} className="h-fit w-fit p-2 bg-[#F6F7FB] rounded-xl hover:bg-[#E5E6EA]">
        <ArrowLeft color="#333" size="20" className="hover:cursor-pointer"/>
      </div>
    </div>
  );
};
