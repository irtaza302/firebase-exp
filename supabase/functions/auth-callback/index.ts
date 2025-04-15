import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

interface WebhookPayload {
  type: "AUTH_USER_CREATED" | "AUTH_USER_DELETED" | "AUTH_USER_UPDATED";
  table: string;
  record: {
    id: string;
    aud: string;
    role: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
    user_metadata: {
      first_name?: string;
      last_name?: string;
    };
  };
  schema: string;
  old_record: null | Record<string, unknown>;
}

serve(async (req) => {
  // CORS headers
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  });

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    // Create a Supabase client with service role key
    // Note: this has admin privileges, so can execute operations
    // without respecting RLS policies
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the webhook payload
    const payload: WebhookPayload = await req.json();

    // Handle new user creation
    if (payload.type === "AUTH_USER_CREATED") {
      const { id: userId, user_metadata } = payload.record;

      const firstName = user_metadata?.first_name || "";
      const lastName = user_metadata?.last_name || "";
      const name = firstName && lastName ? `${firstName} ${lastName}` : "";

      // Create profile for the new user
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          user_id: userId,
          name,
        },
        {
          onConflict: "user_id",
          ignoreDuplicates: true,
        },
      );

      if (profileError) {
        console.error("Error creating profile:", profileError);
        return new Response(
          JSON.stringify({ error: "Error creating user profile" }),
          {
            status: 500,
            headers: { ...headers, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({ message: "User profile created successfully" }),
        {
          status: 200,
          headers: { ...headers, "Content-Type": "application/json" },
        },
      );
    }

    // Default response for other webhook types
    return new Response(JSON.stringify({ message: "Webhook received" }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing webhook:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
});
