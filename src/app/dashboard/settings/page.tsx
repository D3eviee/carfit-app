import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";
import { SettingGridItem } from "@/components/dashboard/settings/setting-grid-item";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-10">
      <DashboardPageHeader 
        title="Ustawienia" 
        subtitle="Zarządzaj informacjami o swojej firmie, konfiguruj opcje marketingowe, kalendarz, zarządzaj uprawnieniami pracowników"
      />
      
      <div className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-8">
        <SettingGridItem 
          title="Biznes" 
          description="Zarządzaj szczegóły dotyczących swojej firmy"
          redirect="business" 
        />
        <SettingGridItem 
          title="Dni pracy" 
          description="Zarządzaj dniami i godzinami działania biznesu" 
          redirect="working-days"
        />
        <SettingGridItem 
          title="Galeria" 
          description="Zarządzaj zdjęciami na swojej stronie" 
          redirect="gallery"
        />
        </div>
    </div>
  )
}

