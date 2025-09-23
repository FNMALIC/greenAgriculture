// app/sitemap.ts
import { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb'
import Post from '@/models/Post'

async function fetchAllPosts() {
    try {
        await connectDB();
        const posts = await Post.find({ status: 'published' })
            .select('slug updatedAt')
            .sort({ updatedAt: -1 });
        return posts;
    } catch (error) {
        console.error('Error fetching posts for sitemap:', error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get your base URL from environment variable
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://codees-cm.com'

    try {
        // Fetch your posts
        const posts = await fetchAllPosts()

        // Generate sitemap entries for blog posts
        const blogEntries = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))

        // Add static pages
        const routes = ['', '/blog'].map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }))

        return [...routes, ...blogEntries]
    } catch (error) {
        console.error('Error generating sitemap:', error);
        
        // Return just static routes if there's an error
        return ['', '/about', '/contact','/events'].map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }))
    }
}