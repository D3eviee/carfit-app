interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  labelText: string
}

export const FormLabel = ({labelText, ...props}:FormLabelProps) => {
  return(
    <label 
      htmlFor={props.htmlFor} 
      className="text-main-black text-sm pl-1.5 font-medium leading-none"
      >
        {labelText}
    </label>
  )
}