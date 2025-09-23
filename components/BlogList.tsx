import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';

// Types for our components
interface Post {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  author: {
    name: string;
    image?: string;
  };
  createdAt: string;
  tags: string[];
}

// Post Card Component
const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card className="flex flex-col h-full">
      {post.coverImage && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <img
            src={post.coverImage}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader className="flex-grow">
        <div className="space-y-1">
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-bold hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
          </Link>
          <p className="text-sm text-gray-500">
            By {post.author.name} · {formatDistanceToNow(new Date(post.createdAt))} ago
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

// Blog List Component
const BlogList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;