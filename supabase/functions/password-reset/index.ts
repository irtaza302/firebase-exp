import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

interface RequestData {
  email: string;
  redirectTo?: string;
}

serve(async (req) => {
  // CORS headers
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json",
  });

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

    // Create a Supabase client with anon key
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get the request data
    const {
      email,
      redirectTo = `${supabaseUrl}/auth/reset-confirmation`,
    }: RequestData = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({
          error: "Email is required",
        }),
        { status: 400, headers },
      );
    }

    // Send password reset link
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      console.error("Error sending password reset:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to send password reset email",
        }),
        { status: 500, headers },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Password reset email sent successfully",
      }),
      { status: 200, headers },
    );
  } catch (error) {
    console.error("Error processing password reset request:", error);

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
      }),
      { status: 500, headers },
    );
  }
});
