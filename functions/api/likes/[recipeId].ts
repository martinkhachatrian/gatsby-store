// functions/api/likes/[recipeId].ts

export interface Env {
  RECIPE_LIKES: KVNamespace;
}

// Interface for storing likes with visitor IDs
interface LikesData {
  count: number;
  visitors: string[];
}

// CORS headers with strict-origin-when-cross-origin referrer policy
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // In production, replace with specific origins
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
  "Referrer-Policy": "strict-origin-when-cross-origin"
};

// Handle OPTIONS preflight requests
export const onRequestOptions = () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
};

export const onRequestGet = async ({
                                     params,
                                     env
                                   }: {
  params: { recipeId: string };
  env: Env;
}) => {
  // Get recipe ID from URL path parameter
  const { recipeId } = params;
  console.log(env)
  try {
    // Read current likes data from KV store
    const likesData = await env.RECIPE_LIKES.get(recipeId);
    const data: LikesData = likesData ? JSON.parse(likesData) : { count: 0, visitors: [] };

    // Return response with CORS headers
    return new Response(
      JSON.stringify({
        recipeId,
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
    console.error(`Error fetching likes for ${recipeId}:`, error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch likes',
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

    // Get current likes data from KV store
    const likesData = await env.RECIPE_LIKES.get(recipeId);
    const data: LikesData = likesData ? JSON.parse(likesData) : { count: 0, visitors: [] };

    // Check if this visitor has already liked
    if (data.visitors.includes(visitorId)) {
      return new Response(
        JSON.stringify({
          recipeId,
          likes: data.count,
          alreadyLiked: true,
          message: 'User has already liked this recipe'
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    // Update likes count and add visitor ID
    data.count += 1;
    data.visitors.push(visitorId);

    // Save updated data back to KV store
    await env.RECIPE_LIKES.put(recipeId, JSON.stringify(data));

    // Return updated count
    return new Response(
      JSON.stringify({
        recipeId,
        likes: data.count,
        message: 'Like recorded successfully'
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error(`Error updating likes for ${recipeId}:`, error);
    return new Response(
      JSON.stringify({
        error: 'Failed to update likes',
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