"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AccountSecurityFormProps = {
  currentEmail: string;
};

export default function AccountSecurityForm({
  currentEmail,
}: AccountSecurityFormProps) {
  const supabase = createClient();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const wantsPasswordChange =
        newPassword.trim().length > 0 || confirmPassword.trim().length > 0;

      if (!wantsPasswordChange) {
        setError("Enter a new password first.");
        setSaving(false);
        return;
      }

      if (newPassword.length < 6) {
        setError("New password must be at least 6 characters.");
        setSaving(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Password confirmation does not match.");
        setSaving(false);
        return;
      }

      const { error: passwordError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (passwordError) {
        throw new Error(passwordError.message);
      }

      await supabase.auth.signOut();
      window.location.href = "/login?message=password-updated";
      return;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="mb-6 text-2xl font-bold">Account Security</h2>

      <div className="mb-6">
        <label className="mb-2 block text-sm text-zinc-400">Current Email</label>
        <input
          type="text"
          value={currentEmail}
          disabled
          className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-3 text-zinc-500 outline-none"
        />
        <p className="mt-2 text-xs text-zinc-500">
          Email change is not available yet.
        </p>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter a new password"
          className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm">Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
          className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
        />
        <p className="mt-2 text-xs text-zinc-500">
          Updating your password will sign you out and require a new login.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-800 bg-red-950/40 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-4 rounded-lg border border-emerald-800 bg-emerald-950/40 p-3 text-sm text-emerald-300">
          {message}
        </div>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="rounded-lg bg-white px-5 py-3 font-medium text-black disabled:opacity-50"
      >
        {saving ? "Saving..." : "Update Password"}
      </button>
    </section>
  );
}