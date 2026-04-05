import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./ProfileForm";
import AccountSecurityForm from "./AccountSecurityForm";

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
    .select("id, username, avatar_path")
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
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="mb-4 text-4xl font-bold">Profile Settings</h1>
          <p className="text-zinc-400">
            Manage your profile details and account security.
          </p>
        </div>

        <ProfileForm
          userId={user.id}
          email={user.email ?? ""}
          initialUsername={profile?.username ?? ""}
          initialAvatarPath={profile?.avatar_path ?? ""}
        />

        <AccountSecurityForm currentEmail={user.email ?? ""} />
      </div>
    </main>
  );
}
