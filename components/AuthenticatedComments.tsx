'use client'

import { useState, useEffect } from 'react'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import {
    MessageCircleIcon,
    HeartIcon,
    ReplyIcon,
    MoreHorizontalIcon,
    EditIcon,
    TrashIcon,
    FlagIcon
} from 'lucide-react'
import {useRouter} from 'next/navigation'

interface Comment {
    id: string
    content: string
    createdAt: string
    updatedAt?: string
    author: {
        id: string
        name: string
        image: string
        role?: string
    }
    likes: number
    isLiked: boolean
    replies?: Comment[]
    isEdited?: boolean
}

interface AuthenticatedCommentsProps {
    postSlug: string
    session: Session | null
}

export default function AuthenticatedComments({ postSlug, session }: AuthenticatedCommentsProps) {
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState('')
    const [replyTo, setReplyTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState('')
    const [editingComment, setEditingComment] = useState<string | null>(null)
    const [editContent, setEditContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        fetchComments()
    }, [postSlug])

    const fetchComments = async () => {
        setIsLoading(true)
        try {
            console.log(`/api/posts/${postSlug}/comments`)
            const response = await fetch(`/api/posts/${postSlug}/comments`)
            console.log(response)

            if (response.ok) {
                const data = await response.json()
                console.log('API Response:', data)

                // Handle different response structures
                if (Array.isArray(data)) {
                    // If the response is directly an array of comments
                    setComments(data)
                } else if (data.comments && Array.isArray(data.comments)) {
                    // If the response has a 'comments' property with an array
                    setComments(data.comments)
                } else if (data.data && Array.isArray(data.data)) {
                    // If the response has a 'data' property with an array
                    setComments(data.data)
                } else {
                    // Fallback: set empty array if structure is unexpected
                    console.warn('Unexpected API response structure:', data)
                    setComments([])
                }
            } else {
                console.error('Failed to fetch comments:', response.status, response.statusText)
                setComments([])
            }
        } catch (error) {
            console.error('Error fetching comments:', error)
            setComments([])
        }
        setIsLoading(false)
    }
    const submitComment = async () => {
        if (!session?.user) {
            router.push('/auth/join')
            return
        }

        if (!newComment.trim()) return

        setIsSubmitting(true)
        setError(null)
        try {
            const response = await fetch(`/api/posts/${postSlug}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newComment }),
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error(`Failed to post comment: ${response.status}`)
            }

            const data = await response.json()

            // Handle the new comment response structure
            const newCommentData = data.comment || data.data || data

            setComments(prevComments => [newCommentData, ...prevComments])
            setNewComment('')

        } catch (error) {
            console.error('Error submitting comment:', error)
            setError('Failed to post comment. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }
    const submitReply = async (parentId: string) => {
        if (!session?.user) {
            signIn()
            return
        }

        if (!replyContent.trim()) return

        setIsSubmitting(true)
        try {
            const response = await fetch(`/api/posts/${postSlug}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: replyContent,
                    parentId
                }),
                credentials: 'include'
            })

            if (response.ok) {
                await fetchComments() // Refresh to get updated replies
                setReplyTo(null)
                setReplyContent('')
            }
        } catch (error) {
            console.error('Error submitting reply:', error)
        }
        setIsSubmitting(false)
    }

    const likeComment = async (commentId: string) => {
        if (!session?.user) {
            signIn()
            return
        }

        try {
            const response = await fetch(`/api/comments/${commentId}/like`, {
                method: 'POST',
                credentials: 'include'
            })

            if (response.ok) {
                // Update the comment in the state
                setComments(prevComments =>
                    prevComments.map(comment =>
                        comment.id === commentId
                            ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
                            : {
                                ...comment,
                                replies: comment.replies?.map(reply =>
                                    reply.id === commentId
                                        ? { ...reply, isLiked: !reply.isLiked, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1 }
                                        : reply
                                )
                            }
                    )
                )
            }
        } catch (error) {
            console.error('Error liking comment:', error)
        }
    }

    const editComment = async (commentId: string) => {
        if (!editContent.trim()) return

        setIsSubmitting(true)
        try {
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: editContent }),
                credentials: 'include'
            })

            if (response.ok) {
                await fetchComments()
                setEditingComment(null)
                setEditContent('')
            }
        } catch (error) {
            console.error('Error editing comment:', error)
        }
        setIsSubmitting(false)
    }

    const deleteComment = async (commentId: string) => {
        if (!confirm('Are you sure you want to delete this comment?')) return

        try {
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (response.ok) {
                await fetchComments()
            }
        } catch (error) {
            console.error('Error deleting comment:', error)
        }
    }

    const CommentComponent = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
        <div className={`${isReply ? 'ml-12 mt-3' : 'mb-6'} group`}>
            <div className="flex space-x-3">
                {session?.user?.image ? (
                    <Image
                        src={session.user.image}
                        alt={session?.user?.name || 'User'}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
            {session?.user?.name?.charAt(0).toUpperCase() || '?'}
        </span>
                    </div>
                )}
                <div className="flex-1">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {comment.author.name}
                                </span>
                                {comment.author.role && (
                                    <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full">
                                        {comment.author.role}
                                    </span>
                                )}
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                                {comment.isEdited && (
                                    <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                                        (edited)
                                    </span>
                                )}
                            </div>

                            {/* Comment Actions */}
                            {session?.user?.id === comment.author.id && (
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => {
                                            setEditingComment(comment.id)
                                            setEditContent(comment.content)
                                        }}
                                        className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        <EditIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteComment(comment.id)}
                                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 ml-2"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {editingComment === comment.id ? (
                            <div className="space-y-3">
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                                    rows={3}
                                />
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => editComment(comment.id)}
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingComment(null)
                                            setEditContent('')
                                        }}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                {comment.content}
                            </p>
                        )}
                    </div>

                    {/* Comment Actions */}
                    <div className="flex items-center space-x-4 mt-2 ml-4">
                        <button
                            onClick={() => likeComment(comment.id)}
                            className={`flex items-center space-x-1 text-sm ${
                                comment.isLiked
                                    ? 'text-red-600 dark:text-red-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                            } transition-colors`}
                        >
                            <HeartIcon className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                            <span>{comment.likes}</span>
                        </button>

                        {!isReply && (
                            <button
                                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                                className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                <ReplyIcon className="w-4 h-4" />
                                <span>Reply</span>
                            </button>
                        )}

                        {session?.user?.id !== comment.author.id && (
                            <button className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                                <FlagIcon className="w-4 h-4" />
                                <span>Report</span>
                            </button>
                        )}
                    </div>

                    {/* Reply Form */}
                    {replyTo === comment.id && (
                        <div className="mt-4 ml-4">
                            <div className="flex space-x-3">
                                {/*<Image*/}
                                {/*    src={session?.user?.image || '/default-avatar.png'}*/}
                                {/*    alt={session?.user?.name || 'User'}*/}
                                {/*    width={32}*/}
                                {/*    height={32}*/}
                                {/*    className="rounded-full"*/}
                                {/*/>*/}
                                <div className="flex-1">
                                    <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder="Write a reply..."
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                                        rows={3}
                                    />
                                    <div className="flex space-x-2 mt-2">
                                        <button
                                            onClick={() => submitReply(comment.id)}
                                            disabled={isSubmitting || !replyContent.trim()}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                                        >
                                            {isSubmitting ? 'Replying...' : 'Reply'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setReplyTo(null)
                                                setReplyContent('')
                                            }}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="border-l-2 border-gray-200 dark:border-gray-700 ml-6 pl-4 mt-4">
                            {comment.replies.map(reply => (
                                <CommentComponent key={reply.id} comment={reply} isReply={true} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    return (
        <section id="comments-section" className="mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex items-center space-x-3 mb-8">
                    <MessageCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Comments ({comments.length})
                    </h2>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-700 dark:text-red-400">{error}</p>
                        <button
                            onClick={fetchComments}
                            className="mt-2 text-sm text-red-600 dark:text-red-400 underline hover:no-underline"
                        >
                            Try again
                        </button>
                    </div>
                )}
                {/* Comment Form */}
                <div className="mb-8">
                    {session?.user ? (
                        <div className="flex space-x-4">
                            {/*<Image*/}
                            {/*    src={session.user.image || '/default-avatar.png'}*/}
                            {/*    alt={session.user.name || 'User'}*/}
                            {/*    width={48}*/}
                            {/*    height={48}*/}
                            {/*    className="rounded-full"*/}
                            {/*/>*/}
                            <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Share your thoughts..."
                                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={4}
                                />
                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Be respectful and constructive in your comments
                                    </p>
                                    <button
                                        onClick={submitComment}
                                        disabled={isSubmitting || !newComment.trim()}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
                                    >
                                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <MessageCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Join the conversation
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Sign in to leave a comment and engage with the community
                            </p>
                            <button
                                onClick={() => signIn()}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                            >
                                Sign In to Comment
                            </button>
                        </div>
                    )}
                </div>

                {/* Comments List */}
                <div>
                    {isLoading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Loading comments...</p>
                        </div>
                    ) : !comments || comments.length === 0 ? (
                        <div className="text-center py-8">
                            <MessageCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                No comments yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Be the first to start the conversation!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {comments.map(comment => (
                                <CommentComponent key={comment.id} comment={comment} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}