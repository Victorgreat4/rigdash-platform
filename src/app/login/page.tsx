import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-4xl font-bold">Login</h1>
        <p className="mb-8 text-zinc-400">
          Sign in or create an account to save quiz results and appear on the
          leaderboard.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}