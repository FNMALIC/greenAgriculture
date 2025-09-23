import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const isAdmin = searchParams.get('admin') === 'true';
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;

    // Build query object
    const query: any = {};
    // Only filter by status if specifically requested or not in admin view
    if (status) {
      query.status = status;
    } else if (!isAdmin) {
      query.status = 'published';
    }

    const posts = await Post.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title excerpt slug coverImage author status createdAt tags'); // Added status field

    const total = await Post.countDocuments(query);

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
// POST new post
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    console.log("create post");
    console.log(body);
    // Validate required fields
    if (!body.title || !body.content || !body.excerpt) {
      return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
      );
    }

    // Generate slug if not provided
    if (!body.slug) {
      body.slug = body.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
    }

    // Ensure author is set
    if (!body.author) {
      body.author = {
        name: 'fnmalic'
      };
    }

    const post = await Post.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('Create post error:', error);

    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 400 }
      );
    }

    return NextResponse.json(
        { error: error.message || 'Internal Server Error' },
        { status: 500 }
    );
  }
}