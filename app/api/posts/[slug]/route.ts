import { NextRequest, NextResponse } from 'next/server';
import Post from '@/models/Post';
import connectDB from '@/lib/mongodb';

export async function GET(
    request: NextRequest,
    context: { params: { slug: string } }
) {
  try {
    await connectDB();
    const post = await Post.findOne({ slug:  context.params.slug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    console.log(post)

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT update post
export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
  const slug = await Promise.resolve(params.slug); // Unwrap the params promise

  try {
    await connectDB();
    const body = await request.json();
    const post = await Post.findOneAndUpdate(
        { slug },
        { ...body },
        { new: true, runValidators: true }
    );

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
        { error: error.message || 'Internal Server Error' },
        { status: 500 }
    );
  }
}

// DELETE post
export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
  const slug = await Promise.resolve(params.slug); // Unwrap the params promise

  try {
    await connectDB();
    const post = await Post.findOneAndDelete({ slug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}