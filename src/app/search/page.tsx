import { Suspense } from 'react'
import { Spinner } from '@/components/spinner'
import SearchClient from '@/components/search/search-client'

export default function Page() {
  return (
    <Suspense fallback={<Spinner/>}>
      <SearchClient />
    </Suspense>
  )
}
