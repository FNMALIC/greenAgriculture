// import { authOptions } from '@/lib/authOptions';
// import connectDB from '@/lib/mongodb';
// import Interaction from '@/models/Interaction';
// import Post from '@/models/Post';
// import { getServerSession } from 'next-auth';
// import { NextRequest, NextResponse } from 'next/server';
//
// // Get interaction counts for a post
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     await connectDB();
//     // console.log(await params)
//     const p = await params
//     const post = await Post.findOne({ slug: p.slug });
//
//     if (!post) {
//       return NextResponse.json({ error: 'Post not found' }, { status: 404 });
//     }
//
//     const likeCount = await Interaction.countDocuments({
//       post: post._id,
//       type: 'like'
//     });
//
//     const dislikeCount = await Interaction.countDocuments({
//       post: post._id,
//       type: 'dislike'
//     });
//
//     return NextResponse.json({ likes: likeCount, dislikes: dislikeCount });
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
//
// // Add like
// export async function POST(
//   request: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//        const session = await getServerSession(authOptions);
//
//     const p = await params
//     await connectDB();
//     const body = await request.json();
//     const post = await Post.findOne({ slug: p.slug });
//
//     if (!post) {
//       return NextResponse.json({ error: 'Post not found' }, { status: 404 });
//     }
//
//     // Use email or sessionId for tracking unique interactions
//     const userIdentifier = body.user.email || body.user.sessionId;
//
//     // Upsert interaction - replace existing interaction if user already interacted
//     const interaction = await Interaction.findOneAndUpdate(
//       {
//         post: post._id,
//         $or: [
//           { 'user.email': userIdentifier },
//           { 'user.sessionId': userIdentifier }
//         ]
//       },
//       {
//         post: post._id,
//         user: body.user,
//         type: body.type
//       },
//       {
//         upsert: true,
//         new: true
//       }
//     );
//
//     return NextResponse.json(interaction);
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message || 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }

import { authOptions } from '@/lib/authOptions';
import connectDB from '@/lib/mongodb';
import Interaction from '@/models/Interaction';
import User from '@/models/User';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

// Get interaction counts and user's interaction status for a post
export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const p = await params;

    const post = await Post.findOne({ slug: p.slug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Get total counts
    const likeCount = await Interaction.countDocuments({
      post: post._id,
      type: 'like'
    });

    const bookmarkCount = await Interaction.countDocuments({
      post: post._id,
      type: 'bookmark'
    });

    let userInteractions = {
      isLiked: false,
      isBookmarked: false
    };

    // Check user's interactions if logged in
    if (session?.user?.email) {
      const userLike = await Interaction.findOne({
        post: post._id,
        'user.email': session.user.email,
        type: 'like'
      });

      const userBookmark = await Interaction.findOne({
        post: post._id,
        'user.email': session.user.email,
        type: 'bookmark'
      });

      userInteractions = {
        isLiked: !!userLike,
        isBookmarked: !!userBookmark
      };
    }

    return NextResponse.json({
      likes: likeCount,
      bookmarks: bookmarkCount,
      ...userInteractions
    });
  } catch (error) {
    console.error('Error in GET interactions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle like/bookmark actions
export async function POST(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
  try {
    console.log("like")
    console.log("hello")

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await User.findOne({ email: session?.user?.email });
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    console.log("hello")
    const p = await params;
    await connectDB();
    const body = await request.json();

    const post = await Post.findOne({ slug: p.slug });
    console.log("hello")

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    console.log("hello")

    const { type, user } = body;
    console.log("hello")

    if (type === 'like') {
      // Add like
      await Interaction.findOneAndUpdate(
          {
            post: post._id,
            user: dbUser._id,
            type: 'like'
          },
          {
            post: post._id,
            user: dbUser._id,
            type: 'like'
          },
          {
            upsert: true,
            new: true
          }
      );
    } else if (type === 'unlike') {
      // Remove like
      await Interaction.deleteOne({
        post: post._id,
        user: dbUser._id,
        type: 'like'
      });
    } else if (type === 'bookmark') {
      // Add bookmark
      console.log("hello")

      await Interaction.findOneAndUpdate(
          {
            post: post._id,
            user: dbUser._id,
            type: 'bookmark'
          },
          {
            post: post._id,
            user: dbUser._id,
            type: 'bookmark'
          },
          {
            upsert: true,
            new: true
          }
      );
    } else if (type === 'unbookmark') {
      // Remove bookmark
      await Interaction.deleteOne({
        post: post._id,
        user: dbUser._id,
        type: 'bookmark'
      });
    }
    console.log("hello")

    // Return updated counts
    const likeCount = await Interaction.countDocuments({
      post: post._id,
      type: 'like'
    });
    console.log("hello")

    const bookmarkCount = await Interaction.countDocuments({
      post: post._id,
      type: 'bookmark'
    });
    console.log("hello")

    return NextResponse.json({
      success: true,
      likes: likeCount,
      bookmarks: bookmarkCount
    });
  } catch (error: any) {
    console.error('Error in POST interactions:', error);
    return NextResponse.json(
        { error: error.message || 'Internal Server Error' },
        { status: 500 }
    );
  }
}