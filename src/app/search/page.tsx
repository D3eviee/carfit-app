import { Suspense } from 'react'
import { Spinner } from '@/components/spinner'
import { SearchClient }  from '@/components/search/SearchClient'

export default function SearchPage() {
  return (
    <Suspense fallback={<Spinner/>}>
      <SearchClient />
    </Suspense>
  )
}
