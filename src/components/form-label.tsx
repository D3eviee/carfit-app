import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

export const FormLabel = ({text, htmlFor} : LabelProps) => {
    return (
        <label htmlFor={htmlFor} className="inline-block text-[#111] font-normal text-sm">{text}</label>
    )
}