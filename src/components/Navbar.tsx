import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  noStore();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username = "";
  let avatarPath = "";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username, avatar_path")
      .eq("id", user.id)
      .maybeSingle();

    username = profile?.username ?? "";
    avatarPath = profile?.avatar_path ?? "";
  }

  let avatarUrl = "";

  if (avatarPath) {
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(avatarPath);

    avatarUrl = publicUrl;
  }

  return (
    <header className="border-b border-zinc-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-bold">
          RigDash
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm text-zinc-300 sm:gap-6">
          <Link href="/tools" className="hover:text-white">
            Tools
          </Link>

          <Link href="/tools/firearm-catalog" className="hover:text-white">
            Firearm Catalog
          </Link>

          <Link href="/paths" className="hover:text-white">
            Paths
          </Link>

          {!user ? (
            <Link href="/login" className="hover:text-white">
              Login
            </Link>
          ) : (
            <>
              <Link href="/profile" className="hover:text-white">
                Profile
              </Link>

              <div className="flex items-center gap-3">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="h-8 w-8 rounded-full border border-zinc-700 object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-xs text-zinc-400">
                    {username ? username.slice(0, 1).toUpperCase() : "U"}
                  </div>
                )}

                <span className="hidden text-zinc-400 sm:inline">
                  {username || user.email}
                </span>
              </div>

              <SignOutButton />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
