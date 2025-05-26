import SearchClient from "@/components/search-client"
import { Suspense } from "react"

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SearchClient />
    </Suspense>
  )
}
