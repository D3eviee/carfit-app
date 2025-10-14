export const UserAnnouncmentListItemTag = ({ label }:{ label: string }) =>{
  return (
    <div className="bg-[#F2F2F8] px-3 py-1 rounded-lg w-fit h-fit">
        <p className="text-main-black font-bold text-xs">{label}</p>
    </div>     
  )
} 