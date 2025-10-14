interface UserProfileModalLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  labelText: string
}

export const AuthFormLabel = ({labelText, ...props}:UserProfileModalLabelProps) => {
  return(
    <label 
      htmlFor={props.htmlFor} 
      className="text-main-black text-sm pl-1.5 font-medium leading-none"
      >
        {labelText}
    </label>
  )
}