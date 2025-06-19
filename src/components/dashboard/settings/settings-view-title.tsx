export default function SettingsViewTitle({openView}:{openView: string}) {
    let header = {
        title: "Szczegóły", 
        subtitle:"Zarządzaj danymi swojego serwisu"
    }
    
    if (openView === "details") header = {title: "Szczegóły", subtitle: "Zarządzaj danymi swojego serwisu"}
    else if (openView === "locations") header = {title: "Lokalizacja", subtitle: "Zarządzaj lokalizacją swojego serwisu"}
    else if (openView === "links") header = {title: "Linki", subtitle: "Dodaj, usuń lub edytuj linki do swoich mediów społecznościowych"}
    
    return (
    <div className="w-full bg-white flex flex-col gap-1 p-4 border-[0.5px] border-[#D4D4D4] rounded-md shadow-[0px_0px_2px_3px_#233038] ring-4 ring-[#F9F9F9]">
        <h2 className="text-md font-normal text-[#111]">{header.title}</h2>
        <p className="text-sm font-light text-[#333]">{header.subtitle}</p>
    </div>
    )
}