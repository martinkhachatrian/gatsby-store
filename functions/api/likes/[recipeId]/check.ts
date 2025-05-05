// functions/api/likes/[recipeId]/check.ts

export interface Env {
  RECIPE_LIKES?: KVNamespace;
}

// Interface for storing likes with visitor IDs
interface LikesData {
  count: number;
  visitors: string[];
}

// In-memory storage for local development (will reset on server restart)
const localLikesStorage = new Map<string, LikesData>();

// Complete set of CORS headers needed for both preflight and actual requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // In production, replace with specific origins
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Allow-Credentials": "true"
};

// Handle OPTIONS preflight requests
export const onRequestOptions = () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
};

export const onRequestPost = async ({
                                      params,
                                      env,
                                      request
                                    }: {
  params: { recipeId: string };
  env: Env;
  request: Request;
}) => {
  // Get recipe ID from URL path parameter
  const { recipeId } = params;

  try {
    // Parse request body to get visitorId
    const body: Record<string, string> = await request.json();
    const { visitorId } = body;

    if (!visitorId) {
      return new Response(
        JSON.stringify({ error: 'Missing visitor ID' }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    let data: LikesData;

    // Check if we're in development or production environment
    if (env.RECIPE_LIKES) {
      // Production mode: Use KV
      console.log("Using KV storage for likes");
      const likesData = await env.RECIPE_LIKES.get(recipeId);
      data = likesData ? JSON.parse(likesData) : { count: 0, visitors: [] };
    } else {
      // Local development mode: Use in-memory storage
      console.log("Using local memory storage for likes (no KV binding available)");
      data = localLikesStorage.get(recipeId) || { count: 0, visitors: [] };
    }

    // Check if this visitor has already liked
    const hasLiked = data.visitors.includes(visitorId);

    // Return result
    return new Response(
      JSON.stringify({
        recipeId,
        hasLiked,
        likes: data.count
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error(`Error checking like status for ${recipeId}:`, error);
    return new Response(
      JSON.stringify({
        error: 'Failed to check like status',
        message: (error as Error).message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
};