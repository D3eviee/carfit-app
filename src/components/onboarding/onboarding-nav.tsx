import { ArrowLeft } from "lucide-react";

export const OnboardingNav = ({ onClick = () => {} }) => {
  return (
    <div className="w-full min-h-[50px] flex items-center border-b-[0.5px]">
      <ArrowLeft color="#333333" size="20" onClick={onClick} className="hover:cursor-pointer"/>
    </div>
  );
};
