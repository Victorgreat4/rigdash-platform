import LoginForm from "./LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const message = params.message;

  let bannerText = "";

  if (message === "verify-new-email") {
    bannerText =
      "Please verify your new email address, then sign in again.";
  } else if (message === "password-updated") {
    bannerText =
      "Password updated successfully. Please sign in again.";
  } else if (message === "account-updated") {
    bannerText =
      "Account updated. Verify your new email if needed, then sign in again.";
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-4xl font-bold">Login</h1>
        <p className="mb-8 text-zinc-400">
          Sign in or create an account to manage your profile and access the
          platform.
        </p>

        {bannerText && (
          <div className="mb-6 rounded-lg border border-emerald-800 bg-emerald-950/40 p-4 text-sm text-emerald-300">
            {bannerText}
          </div>
        )}

        <LoginForm />
      </div>
    </main>
  );
}
