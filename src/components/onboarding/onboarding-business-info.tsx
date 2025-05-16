import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessOnboardingSchema } from "@/lib/schema";
import { useOnboardingStore } from "@/lib/store";

export default function OnboardingBusienssInformation({ onClick = () => {} }) {
  const onboardingBusienssInformation = businessOnboardingSchema.pick({
    businessName: true,
    businessOwner: true,
    businessPhone: true,
  });

  type OnboardingBusienssInformation = z.infer<typeof onboardingBusienssInformation>;

  const setData = useOnboardingStore((state) => state.setData);

  const { register, handleSubmit, formState, trigger } = useForm<OnboardingBusienssInformation>({
    resolver: zodResolver(onboardingBusienssInformation),
    defaultValues: {
      businessName: useOnboardingStore((state) => state.businessName),
      businessOwner: useOnboardingStore((state) => state.businessOwner),
      businessPhone: useOnboardingStore((state) => state.businessPhone),
    },
  });

  const onSubmit = async (data: OnboardingBusienssInformation) => {
    const isValid = await trigger();
    if (isValid) {
      setData(data);
      onClick();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div>
        <label htmlFor="businessName">Business name</label>
        <input
          type="text"
          id="businessName"
          placeholder="Tesla"
          {...register("businessName")}
          className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-2 focus:outline-[#333333]"
        />
        <p>{formState.errors.businessName?.message}</p>
      </div>

      <div>
        <label htmlFor="businessOwner">Business owner</label>
        <input
          type="text"
          id="businessOwner"
          placeholder="Jacky Macky"
          {...register("businessOwner")}
          className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-2 focus:outline-[#333333]"
        />
        <p>{formState.errors.businessOwner?.message}</p>
      </div>

      <div>
        <label htmlFor="businessPhone">Phone</label>
        <input
          type="text"
          id="businessPhone"
          placeholder="514333901"
         {...register("businessPhone")}
         className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-2 focus:outline-[#333333]"
        />
        <p>{formState.errors.businessPhone?.message}</p>
      </div>

      <button disabled={formState.isValidating}>Continue</button>
    </form>
  );
}
