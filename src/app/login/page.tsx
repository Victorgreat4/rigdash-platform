export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <p className="text-zinc-400 mb-8">
          Supabase Auth will be connected here.
        </p>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-white text-black px-4 py-3 font-medium"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}