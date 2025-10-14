export const FormError = ({error}:{error?:string}) => {
  return (
    <>{error && <p className="text-xs text-[#F95A59] pl-1.5">{error}</p>}</>
  )
}