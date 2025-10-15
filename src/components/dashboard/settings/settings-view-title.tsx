export const SettingsViewTitle = ({openView}:{openView: string}) => {
    let header = {
        title: "Szczegóły", 
        subtitle:"Zarządzaj danymi swojego serwisu"
    }
    
    if (openView === "details") header = {title: "Szczegóły", subtitle: "Zarządzaj danymi swojego serwisu"}
    else if (openView === "locations") header = {title: "Lokalizacja", subtitle: "Zarządzaj lokalizacją swojego serwisu"}
    else if (openView === "links") header = {title: "Linki", subtitle: "Dodaj, usuń lub edytuj linki do swoich mediów społecznościowych"}
    
    return (
    <div className="w-full bg-white flex flex-col gap-2 p-5 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-3xl">
        <h1 className="text-md font-medium text-main-black leading-none">{header.title}</h1>
        <p className="text-sm text-[#333] leading-none">{header.subtitle}</p>
    </div>
    )
}