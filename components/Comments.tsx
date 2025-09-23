'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; // Assuming you're using next-auth
import Link from 'next/link';
interface Comment {
  _id: string;
  author: {
    name: string;
    email?: string;
  };
  content: string;
  createdAt: Date;
  parentComment?: string;
}

interface CommentsProps {
  postSlug: string;
}

export default function Comments({ postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const { data: session } = useSession() || {};

  // Fetch comments for the post
  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`/api/posts/${postSlug}/comments`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    }
    fetchComments();
  }, [postSlug]);

  // Submit new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      setError('Please log in to comment');
      return;
    }

    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const res = await fetch(`/api/posts/${postSlug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: {
            name: session.user.name,
            email: session.user.email
          },
          content: newComment
        })
      });

      if (!res.ok) throw new Error('Failed to submit comment');
      
      const newCommentData = await res.json();
      setComments([newCommentData, ...comments]);
      setNewComment('');
      setError('');
    } catch (err) {
      console.error('Error submitting comment:', err);
      setError('Failed to submit comment');
    }
  };

  return (
    <section className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
      
      {session ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-4 border rounded-lg"
            rows={4}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button 
            type="submit" 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit Comment
          </button>
        </form>
      ) : (
        <p className="mb-4">
          Please <Link href="/auth/join" className="text-blue-600">log in</Link> to leave a comment
        </p>
      )}

      {comments.map((comment) => (
        <div 
          key={comment._id} 
          className="mb-4 p-4 border rounded-lg"
        >
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">{comment.author.name}</span>
            <span className="text-gray-500 text-sm">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </section>
  );
}