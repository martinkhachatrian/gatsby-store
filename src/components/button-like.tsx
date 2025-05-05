// src/components/LikeButton.js
import React, { useState, useEffect } from 'react';
import Fingerprint2 from '@fingerprintjs/fingerprintjs';

interface Props {
  recipeId: string;
}

// Cloudflare Function API endpoint
const CF_API_URL = `${process.env.GATBSY_SITE_URL}/api/likes`;

const LikeButton = ({ recipeId }: Props) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    if(typeof window === 'undefined') return

      ;(async () => {
        const fpPromise = await Fingerprint2.load();
      // Get the visitor identifier when you need it.
      const fp = await fpPromise
      const result = await fp.get()
      setVisitorId(result.visitorId);
      fetchLikes(result.visitorId)
    })()
  }, [recipeId]);

  const fetchLikes = async (visitorId) => {
    try {
      setIsLoading(true);

      // Fetch current like count
      const response = await fetch(`${CF_API_URL}/${recipeId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch likes');
      }

      const data = await response.json();
      setLikes(data.likes || 0);

      // Check if this visitor has already liked by making a separate request
      // This is an optional optimization - you could also check this on the server side
      const checkResponse = await fetch(`${CF_API_URL}/${recipeId}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visitorId }),
      });

      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        setHasLiked(checkData.hasLiked);
      }
    } catch (err) {
      console.error('Error fetching likes:', err);
      setError('Failed to load likes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (hasLiked || !visitorId) return;

    try {
      setIsLoading(true);

      // Send like to Cloudflare Function
      const response = await fetch(`${CF_API_URL}/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorId,
        }),
      });

      if (!response.ok) {
        const errorData: Record<string, any> = await response.json();
        if (errorData.alreadyLiked) {
          setHasLiked(true);
          return;
        }
        throw new Error('Failed to register like');
      }

      const data: Record<string, any> = await response.json();

      // Update state
      setLikes(data.likes);
      setHasLiked(true);

    } catch (err) {
      console.error('Error liking recipe:', err);
      setError('Failed to like recipe. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-gray-600">
        {hasLiked ? 'Thanks for the thumbs up!' : 'Hey! Thumbs up if you like this.'}
      </p>

      <button
        onClick={handleLike}
        disabled={hasLiked || isLoading || !visitorId}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
          hasLiked
            ? 'bg-green-100 text-green-700 cursor-default'
            : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
        }`}
      >
        <span className="text-2xl" role="img" aria-label="thumbs up">
          👍
        </span>
        <span>
          {isLoading && !visitorId ? 'Initializing...' : isLoading ? 'Loading...' : likes}
          {!isLoading && (likes === 1 ? ' like' : ' likes')}
        </span>
      </button>

      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default LikeButton;