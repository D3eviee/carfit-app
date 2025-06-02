import { UseFormRegisterReturn } from "react-hook-form";

type AuthFormLabelProps = {
  label: string;
  htmlFor: string;
  inputType: string;
  inputId: string;
  inputPlaceholder: string;
  error?: string;
  register: UseFormRegisterReturn;
}

export const AuthFormLabel = ({ label, htmlFor, inputType, inputPlaceholder, inputId, error, register }: AuthFormLabelProps) => {
    return (
        <div className="w-full">
            <label htmlFor={htmlFor} className="inline-block text-[#333] text-sm mb-[5px]">{label}</label>
            <input
                type={inputType}
                id={inputId}
                placeholder={inputPlaceholder}
                {...register}
                className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-2 focus:outline-[#333333]"
            />
            {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
        </div>
  )
}
