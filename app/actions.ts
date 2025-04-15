"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createClient as createServiceRoleClient } from "@supabase/supabase-js";
import { Database } from "../lib/types/supabase";
import { revalidatePath } from "next/cache";

/**
 * Server action to sign out a user
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout"); // Revalidate the entire app
  redirect("/");
}

/**
 * Server action to get the current session
 * @returns The session object or null if no session exists
 */
export async function getSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/**
 * Server action to create a profile for a user (bypasses RLS)
 */
export async function createUserProfile(userId: string, name: string | null) {
  try {
    // Create a special admin client with service role to bypass RLS
    // This requires SUPABASE_SERVICE_ROLE_KEY to be set in .env.local
    const supabaseAdmin = createServiceRoleClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { error } = await supabaseAdmin.from("profiles").upsert(
      {
        user_id: userId,
        name,
      },
      {
        onConflict: "user_id",
        ignoreDuplicates: true,
      },
    );

    if (error) {
      console.error("Error creating profile with admin client:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error("Server error creating profile:", error);
    return { success: false, error };
  }
}
