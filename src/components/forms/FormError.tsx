export const FormError = ({ error, id }: { error?: string; id?: string }) => {
  if (!error) return null
  return (
    <p id={id} role="alert" className="text-xs text-[#F95A59] pl-1.5">
      {error}
    </p>
  )
}