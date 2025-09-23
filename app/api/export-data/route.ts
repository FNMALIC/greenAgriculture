import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import connectDB from "@/lib/mongodb";
// import { connectDB from '@/lib/mongodb';

export async function GET() {
    try {
        await connectDB();

        const posts = await Post.find({}).lean();

        const exportData = {
            version: "1.0",
            exportDate: new Date().toISOString(),
            data: {
                posts: posts.map(post => ({
                    ...post,
                    _id: post._id.toString()
                }))
            }
        };

        return new NextResponse(JSON.stringify(exportData, null, 2), {
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename=blog-backup-${new Date().toISOString().split('T')[0]}.json`
            }
        });
    } catch (error) {
        console.error('Export error:', error);
        return NextResponse.json(
            { error: 'Failed to export data' },
            { status: 500 }
        );
    }
}