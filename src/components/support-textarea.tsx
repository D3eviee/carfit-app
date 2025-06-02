import { UseFormRegisterReturn } from "react-hook-form";

type AuthFormLabelProps = {
  label: string;
  htmlFor: string;
  inputId: string;
  inputPlaceholder?: string;
  error?: string;
  register: UseFormRegisterReturn;
};

export const SupportTextarea = ({
  label,
  htmlFor,
  inputPlaceholder,
  inputId,
  error,
  register,
}: AuthFormLabelProps) => {
  return (
    <div className="relative flex flex-col gap-1">
      <label
        htmlFor={htmlFor}
        className="absolute left-2 -top-2.5 px-1 bg-[#FFF] text-[#333] font-light text-sm"
      >
        {label}
      </label>
      <textarea
        id={inputId}
        placeholder={inputPlaceholder}
        {...register}
        className="border p-2"
      ></textarea>
      {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
    </div>
  );
};
