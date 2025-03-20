import { Suspense } from "react"
import Link from "next/link"
import { SearchForm } from "@/components/search-form"
import { SearchResults } from "@/components/search-results"
import { SearchSkeleton } from "@/components/search-skeleton"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ""

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="max-w-7xl w-full mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight mb-4">
            PriciFy
          </Link>
          <div className="mt-4">
            <SearchForm />
          </div>
        </div>

        {query ? (
          <>
            <h1 className="text-2xl font-bold mb-6">
              Search results for: <span className="text-primary">{query}</span>
            </h1>

            <Suspense fallback={<SearchSkeleton />}>
              <SearchResults query={query} />
            </Suspense>
          </>
        ) : (
          <div className="text-center p-12">
            <h1 className="text-2xl font-bold mb-2">No search query provided</h1>
            <p className="text-muted-foreground mb-4">Please enter a search term to see product comparisons</p>
          </div>
        )}
      </div>
    </main>
  )
}

