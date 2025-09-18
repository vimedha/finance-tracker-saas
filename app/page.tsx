'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function PageContent() {
  const searchParams = useSearchParams()
  // Your logic here
  return (
    <div>
      {/* Your component content */}
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  )
}