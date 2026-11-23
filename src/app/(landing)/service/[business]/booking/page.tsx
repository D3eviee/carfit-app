import { notFound } from "next/navigation"
import { getBookingCategories } from "@/lib/data/business"
import { BookingFlow } from "@/components/booking/BookingFlow"

type BookingPageProps = {
  params: Promise<{ business: string }>
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { business } = await params
  const businessId = business.slice(-36)
  const categories = await getBookingCategories(businessId)

  if (!categories) notFound()

  return <BookingFlow businessId={businessId} categories={categories} />
}