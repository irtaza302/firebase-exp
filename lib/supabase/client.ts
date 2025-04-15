import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in client components
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Explicitly enable PKCE (Proof Key for Code Exchange) flow for OAuth
      auth: {
        flowType: "pkce",
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      // The cookie options are automatically handled by createBrowserClient
      cookieOptions: {
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 8, // 8 hours
      },
    },
  );
}
