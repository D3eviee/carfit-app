import CategoriesClient from "@/components/categories-client"
import { Suspense } from "react"

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CategoriesClient />
    </Suspense>
  )
}
