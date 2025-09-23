'use client';

import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface InteractionsProps {
  postSlug: string;
}

export default function Interactions({ postSlug }: InteractionsProps) {
  const [interactions, setInteractions] = useState({ 
    likes: 0, 
    dislikes: 0 
  });
  const [userInteraction, setUserInteraction] = useState<'like' | 'dislike' | null>(null);

  // Fetch interaction counts
  useEffect(() => {
    async function fetchInteractions() {
      try {
        const res = await fetch(`/api/posts/${postSlug}/interactions`);
        if (!res.ok) throw new Error('Failed to fetch interactions');
        const data = await res.json();
        setInteractions(data);
      } catch (err) {
        console.error('Error fetching interactions:', err);
      }
    }
    fetchInteractions();
  }, [postSlug]);

  // Handle interaction (like/dislike)
  const handleInteraction = async (type: 'like' | 'dislike') => {
    try {
      // Use session ID or generate a unique identifier if not logged in
      const sessionId = localStorage.getItem('sessionId') || 
        (Date.now() + Math.random().toString(36).substring(2));
      
      if (!localStorage.getItem('sessionId')) {
        localStorage.setItem('sessionId', sessionId);
      }

      const res = await fetch(`/api/posts/${postSlug}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { 
            name: 'Anonymous', 
            sessionId 
          },
          type
        })
      });

      if (!res.ok) throw new Error('Failed to submit interaction');
      
      // Update local state
      setUserInteraction(type);
      
      // Optimistically update counts
      setInteractions(prev => ({
        likes: type === 'like' 
          ? (userInteraction === 'like' ? prev.likes : prev.likes + 1)
          : (userInteraction === 'like' ? prev.likes - 1 : prev.likes),
        dislikes: type === 'dislike'
          ? (userInteraction === 'dislike' ? prev.dislikes : prev.dislikes + 1)
          : (userInteraction === 'dislike' ? prev.dislikes - 1 : prev.dislikes)
      }));
    } catch (err) {
      console.error('Error submitting interaction:', err);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <button 
        onClick={() => handleInteraction('like')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          userInteraction === 'like' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        <ThumbsUp size={20} />
        <span>{interactions.likes}</span>
      </button>
      <button 
        onClick={() => handleInteraction('dislike')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          userInteraction === 'dislike' 
            ? 'bg-red-100 text-red-700' 
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        <ThumbsDown size={20} />
        <span>{interactions.dislikes}</span>
      </button>
    </div>
  );
}