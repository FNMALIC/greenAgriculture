'use client'

import { useState, useEffect } from 'react'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import {
    HeartIcon,
    BookmarkIcon,
    ShareIcon,
    EyeIcon,
    MessageCircleIcon
} from 'lucide-react'
import {useRouter} from 'next/navigation'

interface InteractiveActionsProps {
    postSlug: string
    session: Session | null
    initialLikes: number
    initialBookmarks: number
}

export default function InteractiveActions({
                                               postSlug,
                                               session,
                                               initialLikes,
                                               initialBookmarks
                                           }: InteractiveActionsProps) {
    const [likes, setLikes] = useState(initialLikes)
    const [bookmarks, setBookmarks] = useState(initialBookmarks)
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    // Check if user has already liked/bookmarked this post
    useEffect(() => {
        if (session?.user) {
            checkUserInteractions()
        }
    }, [session, postSlug])

    const checkUserInteractions = async () => {
        try {
            const response = await fetch(`/api/posts/${postSlug}/interactions`, {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setIsLiked(data.isLiked || false)
                setIsBookmarked(data.isBookmarked || false)
            }
        } catch (error) {
            console.error('Error checking interactions:', error)
        }
    }

    const handleLike = async () => {
        if (!session?.user) {
             router.push('/auth/join')
            return
        }

        setIsLoading(true)

        // Optimistic update
        const newIsLiked = !isLiked
        const newLikes = newIsLiked ? likes + 1 : likes - 1
        setIsLiked(newIsLiked)
        setLikes(newLikes)

        try {
            const response = await fetch(`/api/posts/${postSlug}/interactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    type: newIsLiked ? 'like' : 'unlike',
                    user: {
                        email: session.user.email,
                        name: session.user.name
                    }
                })
            })

            if (response.ok) {
                const data = await response.json()
                // Update with actual counts from server
                await refreshCounts()
            } else {
                // Revert optimistic update on error
                setIsLiked(!newIsLiked)
                setLikes(likes)
                console.error('Failed to update like')
            }
        } catch (error) {
            // Revert optimistic update on error
            setIsLiked(!newIsLiked)
            setLikes(likes)
            console.error('Error liking post:', error)
        }
        setIsLoading(false)
    }


    const refreshCounts = async () => {
        try {
            const response = await fetch(`/api/posts/${postSlug}/interactions`, {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setLikes(data.likes || 0)
                setBookmarks(data.bookmarks || 0)
            }
        } catch (error) {
            console.error('Error refreshing counts:', error)
        }
    }

    const handleShare = async () => {
        const shareData = {
            title: document.title,
            url: window.location.href
        }

        if (navigator.share && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData)
            } catch (error) {
                // Fallback to clipboard
                await navigator.clipboard.writeText(window.location.href)
                alert('Link copied to clipboard!')
            }
        } else {
            // Fallback to clipboard
            await navigator.clipboard.writeText(window.location.href)
            alert('Link copied to clipboard!')
        }
    }

    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-6">
                {/* Like Button */}
                <button
                    onClick={handleLike}
                    disabled={isLoading}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                        isLiked
                            ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                >
                    <HeartIcon
                        className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                    />
                    <span className="font-medium">{likes}</span>
                    {!session && <span className="text-xs">Login to like</span>}
                </button>

                {/* Comments Scroll Button */}
                <button
                    onClick={() => {
                        document.getElementById('comments-section')?.scrollIntoView({
                            behavior: 'smooth'
                        })
                    }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <MessageCircleIcon className="w-5 h-5" />
                    <span className="font-medium">Comments</span>
                </button>
            </div>

            <div className="flex items-center space-x-4">
                {/* Share Button */}
                <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <ShareIcon className="w-5 h-5" />
                    <span className="font-medium">Share</span>
                </button>

                {/* Reading Progress */}
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <EyeIcon className="w-4 h-4" />
                    <span>Reading</span>
                </div>
            </div>
        </div>
    )
}