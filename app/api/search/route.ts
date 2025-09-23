import { NextRequest, NextResponse } from 'next/server'
import Post from '@/models/Post'
import connectDB from "@/lib/mongodb";
import {SearchResponse,SearchError} from "@/@types/search";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const query = searchParams.get('q')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')

        if (!query) {
            return NextResponse.json(
                { message: 'Search query is required' } as SearchError,
                { status: 400 }
            )
        }

        await connectDB()

        // Create a search query that matches title, content, or tags
        const searchQuery = {
            $and: [
                { status: 'published' },
                {
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { content: { $regex: query, $options: 'i' } },
                        { tags: { $regex: query, $options: 'i' } }
                    ]
                }
            ]
        }

        // Get total count for pagination
        const totalResults = await Post.countDocuments(searchQuery)
        const totalPages = Math.ceil(totalResults / limit)

        // Get paginated results
        const posts = await Post.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .select('title slug excerpt coverImage author tags createdAt')

        const response: SearchResponse = {
            results: posts.map(post => ({
                id: post._id.toString(),
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                coverImage: post.coverImage,
                author: post.author,
                tags: post.tags,
                createdAt: post.createdAt
            })),
            totalResults,
            page,
            totalPages
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Search error:', error)
        return NextResponse.json(
            { message: 'Internal server error', status: 500 } as SearchError,
            { status: 500 }
        )
    }
}