import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_path")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-2xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Profile load error: {profileError.message}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold">Profile Settings</h1>
        <p className="mb-8 text-zinc-400">
          Choose the name and avatar that will appear on the leaderboard.
        </p>

        <ProfileForm
          userId={user.id}
          email={user.email ?? ""}
          initialUsername={profile?.username ?? ""}
          initialDisplayName={profile?.display_name ?? ""}
          initialAvatarPath={profile?.avatar_path ?? ""}
        />
      </div>
    </main>
  );
}