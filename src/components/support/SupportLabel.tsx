import { cn } from "@/utils"

interface SupportLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  labelText: string
}

export const SupportLabel = ({ labelText, className, ...props }: SupportLabelProps) => {
  return (
    <label {...props} className={cn("text-main-black text-sm pl-1.5 font-medium leading-none", className)}>
      {labelText}
    </label>
  )
}