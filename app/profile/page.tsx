import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";
import Image from "next/image";

interface ProfileData {
  id: string;
  name: string | null;
  avatar_url: string | null;
}

export default async function ProfilePage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Fetch profile data
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, name, avatar_url")
    .eq("user_id", user.id)
    .single();

  if (error || !profile) {
    console.error("Error fetching profile:", error);
  }

  const profileData: ProfileData = profile || {
    id: user.id,
    name: user.user_metadata.first_name
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : null,
    avatar_url: null,
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-8 mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            {profileData.avatar_url ? (
              <Image
                src={profileData.avatar_url}
                alt={profileData.name || "Profile"}
                className="w-full h-full rounded-full object-cover"
                width={96}
                height={96}
              />
            ) : (
              <span className="text-2xl">
                {profileData.name?.charAt(0) || user.email?.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {profileData.name || "Complete your profile"}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <ProfileForm initialData={profileData} />
      </div>
    </div>
  );
}
