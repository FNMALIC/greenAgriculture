import { NextRequest, NextResponse } from 'next/server';
import Comment from '@/models/Comment';
import Post from '@/models/Post';
import connectDB from '@/lib/mongodb';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

// Get comments for a specific post
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const p = await params
    console.log("sponsor")
    console.log(p)
    const post = await Post.findOne({ slug: p.slug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const comments = await Comment.find({ 
      post: post._id, 
      // status: 'approved'
    })
    .sort({ createdAt: -1 })
    // .populate('parentComment', 'author content');
    console.log(comments)

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Add a new comment
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    await connectDB();
    const p = await params

    const body = await request.json();
    const post = await Post.findOne({ slug: p.slug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const comment = await Comment.create({
      ...body,
      author:session?.user.id ,
      post: post._id,
      status: 'approved' 
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
