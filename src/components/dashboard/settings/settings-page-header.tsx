export const SettingsPageHeader = ({title, description}: {title: string, description: string}) => {
  return (
    <div className="w-full bg-white flex flex-col gap-2 p-5 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-3xl">
        <h1 className="text-md font-medium text-main-black leading-none">{title}</h1>
        <p className="text-sm text-[#333] leading-none">{description}</p>
    </div> 
  )
}
