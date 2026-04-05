import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { canAccessBeerRatings } from "@/lib/beerRatingsAccess";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  noStore();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username = "";
  let avatarPath = "";
  let isAdmin = false;
  let canSeeBeerRatings = false;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username, avatar_path, is_admin")
      .eq("id", user.id)
      .maybeSingle();

    username = profile?.username ?? "";
    avatarPath = profile?.avatar_path ?? "";
    isAdmin = profile?.is_admin ?? false;
    canSeeBeerRatings = canAccessBeerRatings(user.id, user.email);
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          RigDash
        </Link>

        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          <Link href="/quiz" className="hover:text-white">
            Quiz
          </Link>

          {canSeeBeerRatings ? (
            <Link href="/tools/beer-ratings" className="hover:text-white">
              Beer Ratings
            </Link>
          ) : null}

          <Link href="/leaderboard" className="hover:text-white">
            Leaderboard
          </Link>

          {!user ? (
            <Link href="/login" className="hover:text-white">
              Login
            </Link>
          ) : (

            <>{isAdmin && (
              <Link href="/admin" className="hover:text-white">
                Admin
              </Link>
            )}
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
