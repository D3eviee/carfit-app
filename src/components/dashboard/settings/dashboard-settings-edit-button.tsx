'use client'
interface DashboardSettingEditButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const DashboardSettingEditButton = ({label, ...props}:DashboardSettingEditButtonProps) => {
    return (
      <div 
        onClick={props.onClick}
        className="w-fit text-center text-sm px-4 py-2 rounded-2xl bg-linear-to-b  from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333]"
      >
        {label ? label : "Edytuj"}
      </div>
    )
}