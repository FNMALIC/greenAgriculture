import { Metadata } from 'next'
import BlogList from '@/components/BlogList'
import { Suspense } from 'react'
import {SearchResponse} from "@/@types/search";
// import { SearchResponse } from '@/types/search'

export const metadata: Metadata = {
    title: 'Search Results | Your Blog Name',
    description: 'Search results from our blog posts.',
    openGraph: {
        title: 'Search Results | Your Blog Name',
        description: 'Search results from our blog posts.',
        type: 'website',
        images: [
            {
                url: '/blog-og-image.png',
                width: 1200,
                height: 630,
                alt: 'Search Results',
            },
        ],
    },
}

async function getSearchResults(query: string, page: string = '1') {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(query)}&page=${page}`,
            {
                next: { revalidate: 0 }, // Don't cache search results
            }
        )

        if (!res.ok) {
            throw new Error('Failed to fetch search results')
        }

        return res.json() as Promise<SearchResponse>
    } catch (error) {
        console.error('Error fetching search results:', error)
        return {
            results: [],
            totalResults: 0,
            page: 1,
            totalPages: 0,
        }
    }
}

export default async function SearchPage({
                                             searchParams,
                                         }: {
    searchParams: { q: string; page: string }
}) {
    const query = searchParams.q
    const page = searchParams.page || '1'
    const { results, totalResults, totalPages } = await getSearchResults(query, page)

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Search Results
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">
                        {totalResults === 0
                            ? 'No results found'
                            : `Found ${totalResults} result${totalResults === 1 ? '' : 's'}`}
                    </p>
                    <p className="text-lg text-gray-500">
                        for &quot;{query}&quot;
                    </p>
                </header>

                <Suspense fallback={<BlogListSkeleton />}>
                    {results.length > 0 ? (
                        <>
                            <BlogList posts={results} />
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={parseInt(page)}
                                    totalPages={totalPages}
                                    query={query}
                                />
                            )}
                        </>
                    ) : (
                        <NoResults query={query} />
                    )}
                </Suspense>
            </div>
        </main>
    )
}

function Pagination({
                        currentPage,
                        totalPages,
                        query,
                    }: {
    currentPage: number
    totalPages: number
    query: string
}) {
    return (
        <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <a
                    key={pageNum}
                    href={`/search?q=${encodeURIComponent(query)}&page=${pageNum}`}
                    className={`px-4 py-2 rounded-md ${
                        pageNum === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    {pageNum}
                </a>
            ))}
        </div>
    )
}

function NoResults({ query }: { query: string }) {
    return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No results found for &quot;{query}&quot;
            </h2>
            <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse our recent posts below.
            </p>
            <a
                href="/blog"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
                Browse All Posts
            </a>
        </div>
    )
}

function BlogListSkeleton() {
    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    )
}