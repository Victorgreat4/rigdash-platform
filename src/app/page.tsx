import { supabase } from "../lib/supabase";

type TestRow = {
  id: number;
  title: string | null;
  created_at: string;
};

export default async function Home() {
  let statusMessage = "Loading data from Supabase...";
  let errorMessage = "";
  let rows: TestRow[] = [];

  try {
    const { data, error } = await supabase
      .from("test")
      .select("id, title, created_at")
      .order("id", { ascending: true });

    if (error) {
      statusMessage = "Connected to Supabase, but query failed.";
      errorMessage = error.message;
    } else {
      statusMessage = "Supabase query worked.";
      rows = data ?? [];
    }
  } catch (error) {
    statusMessage = "Supabase connection failed.";
    errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">RigDash Platform</h1>
        <p className="text-lg mb-6">{statusMessage}</p>

        {errorMessage && (
          <pre className="mb-6 rounded-lg bg-zinc-900 p-4 text-sm text-red-400 whitespace-pre-wrap">
            {errorMessage}
          </pre>
        )}

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-semibold mb-4">Test rows</h2>

          {rows.length === 0 ? (
            <p className="text-zinc-400">No rows found in the test table.</p>
          ) : (
            <ul className="space-y-4">
              {rows.map((row) => (
                <li key={row.id} className="rounded-lg bg-zinc-900 p-4">
                  <p><strong>ID:</strong> {row.id}</p>
                  <p><strong>Title:</strong> {row.title ?? "No title"}</p>
                  <p><strong>Created:</strong> {row.created_at}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}