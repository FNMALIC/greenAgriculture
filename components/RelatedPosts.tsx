'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, ClockIcon, ArrowRightIcon } from 'lucide-react'

interface RelatedPost {
    slug: string
    title: string
    excerpt: string
    coverImage: string
    publishedAt: string
    readingTime: number
    author: {
        name: string
        avatar: string
    }
    category: string
}

interface RelatedPostsProps {
    currentPostSlug: string
    category?: string
    tags?: string[]
}

export default function RelatedPosts({ currentPostSlug, category, tags }: RelatedPostsProps) {
    const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchRelatedPosts()
    }, [currentPostSlug, category, tags])

    const fetchRelatedPosts = async () => {
        setIsLoading(true)
        try {
            const params = new URLSearchParams({
                exclude: currentPostSlug,
                ...(category && { category }),
                ...(tags && { tags: tags.join(',') }),
                limit: '3',
            })

            const response = await fetch(`/api/posts/related?${params}`)
            if (response.ok) {
                const data = await response.json()
                setRelatedPosts(data.posts)
            }
        } catch (error) {
            console.error('Error fetching related posts:', error)
        }
        setIsLoading(false)
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Related Articles
                </h2>

                {isLoading ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                                <div className="aspect-video bg-gray-300 dark:bg-gray-700" />
                                <div className="p-6">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-3" />
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-3" />
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {relatedPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/posts/${post.slug}`}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative aspect-video">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        <div className="flex items-center space-x-1">
                                            <CalendarIcon size={16} />
                                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <ClockIcon size={16} />
                                            <span>{post.readingTime} min read</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Image
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                width={32}
                                                height={32}
                                                className="rounded-full"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                        {post.author.name}
                      </span>
                                        </div>
                                        <ArrowRightIcon size={20} className="text-gray-400" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
