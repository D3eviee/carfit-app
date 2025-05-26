import { AddServiceModalProps } from "@/lib/types"
import { InputHTMLAttributes } from "react"
import { UseFormRegister } from "react-hook-form"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: keyof AddServiceModalProps
  register: UseFormRegister<AddServiceModalProps>
}

export const FormInput = ({ type, id, placeholder, defaultValue, register, className }: FormInputProps) => {
  return (
    <input
      type={type}
      {...register(id)}
      id={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-2 focus:outline-[#333333] ${className}`}
    />
  )
}
