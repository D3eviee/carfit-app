'use client'
import { AddButton } from "@/components/buttons/add-button";
import { DashboardCalendarAddAppointmetModal } from "@/components/modals/dashboard/calendar/dashboard-calendar-add-appointmet-modal";
import { useModalStore } from "@/lib/store";

export const DashboardCalendarAddApppointmentButton = () =>  {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningModal = () => openModal(<DashboardCalendarAddAppointmetModal/>)
  return <AddButton type="button" onClick={handleOpeningModal}>Nowa wizyta</AddButton>
}