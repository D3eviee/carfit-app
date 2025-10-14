import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface UserProfileModalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
}

export const UserAnnouncementModalInput = ({ register, ...props }: UserProfileModalInputProps) => {
  return (
    <input
      {...register}
      {...props}
      className="w-full bg-[#F6F7FB] px-2 py-2.5 text-sm text-main-black rounded-xl border outline-none border-transparent focus:border-[#D4D4D4]"
    />
  );
};