import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import { SettingGridItem } from "@/components/dashboard/settings/setting-grid-item";

export default function SettingsPage() {
  return (
    <DashboardContentContainer>
      <div className="mb-[50px]">
        <h1 className="m-0 p00 text-[27px] font-semibold text-black" >Ustawienia</h1>
        <h3 className="mt-[5px] p-0 text-sm font-light">Zarządzaj informacjami o swojej firmie, konfiguruj opcje marketingowe, kalendarz, zarządzaj uprawnieniami pracowników</h3>
      </div>
      
      <div className="w-[1077px] mt-[30px] grid gap-[30px] grid-cols-3">
        <SettingGridItem 
          title="Inormacje o biznesie" 
          description="Przeglądaj i edytuj szczegóły dotyczące swojej firmy, zarządzaj lokalizacjami, źródłem klientów i udostępniaj linki do mediów społecznościowych"
          redirect="business" 
        />
        <SettingGridItem 
          title="Dni pracy" 
          description="Zarządzaj dniami i godzinami, w które twój serwis jest otwarty" 
          redirect="working-days"
        />
        <SettingGridItem 
          title="Galeria" 
          description="Dodawaj i zmieniaj zdjęcia widoczne na stronie twojego serwisu." 
          redirect="gallery"
        />
        </div>
      </DashboardContentContainer>
  );
}

