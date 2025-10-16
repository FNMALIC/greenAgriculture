import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';

export async function POST() {
  try {
    await connectDB();
    
    const now = new Date();
    
    // Find all scheduled posts that should be published
    const scheduledPosts = await Post.find({
      status: 'scheduled',
      scheduledAt: { $lte: now }
    });

    if (scheduledPosts.length === 0) {
      return NextResponse.json({ 
        message: 'No posts to publish',
        published: 0 
      });
    }

    // Update all scheduled posts to published
    const result = await Post.updateMany(
      {
        status: 'scheduled',
        scheduledAt: { $lte: now }
      },
      {
        $set: { status: 'published' },
        $unset: { scheduledAt: 1 }
      }
    );

    return NextResponse.json({
      message: `Published ${result.modifiedCount} scheduled posts`,
      published: result.modifiedCount
    });

  } catch (error) {
    console.error('Error publishing scheduled posts:', error);
    return NextResponse.json(
      { error: 'Failed to publish scheduled posts' },
      { status: 500 }
    );
  }
}
