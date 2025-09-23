"use client"

import { useState, useEffect } from "react"
import { Calendar, User, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: string
  author: {
    name: string
    image?: string
  }
  tags: string[]
  createdAt: string
  status: string
}

interface BlogResponse {
  posts: BlogPost[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchPosts()
  }, [currentPage])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/posts?status=published&page=${currentPage}&limit=9`)
      if (response.ok) {
        const data: BlogResponse = await response.json()
        setPosts(data.posts || [])
        setTotalPages(data.pagination?.pages || 1)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#28B4A3] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#28B4A3] to-[#0D8B7C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CropLink Blog</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Insights, stories, and updates from the agricultural technology frontier
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredPosts.map((post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {post.coverImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author.name}</span>
                    </div>
                    
                    {post.tags.length > 0 && (
                      <div className="mb-3">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="inline-block bg-[#28B4A3] text-white text-xs px-2 py-1 rounded mr-2 mb-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="group w-full">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {!searchQuery && totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <span className="px-4 py-2 text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery ? "No articles found matching your search." : "No articles published yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
