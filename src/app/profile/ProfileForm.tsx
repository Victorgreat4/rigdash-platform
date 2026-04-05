"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ProfileFormProps = {
  userId: string;
  email: string;
  initialUsername: string;
  initialAvatarPath: string;
};

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ProfileForm({
  userId,
  email,
  initialUsername,
  initialAvatarPath,
}: ProfileFormProps) {
  const supabase = createClient();

  const [username, setUsername] = useState(initialUsername);
  const [avatarPath, setAvatarPath] = useState(initialAvatarPath);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const avatarUrl = useMemo(() => {
    if (!avatarPath) return "";

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(avatarPath);

    return publicUrl;
  }, [avatarPath, supabase]);

  function validateUsername(value: string) {
    const trimmed = value.trim();

    if (trimmed.length < 3) return "Username must be at least 3 characters.";
    if (trimmed.length > 20) return "Username must be at most 20 characters.";
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      return "Username can only contain letters, numbers, and underscores.";
    }

    return "";
  }

  function handleFileChange(file: File | null) {
    setError("");
    setMessage("");

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG, and WEBP images are allowed.");
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError("Image must be 2 MB or smaller.");
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setHasUnsavedChanges(true);
    setMessage("New profile picture selected. Click Save Profile to apply it.");
  }

  async function uploadAvatarIfNeeded(): Promise<string> {
    if (!selectedFile) {
      return avatarPath;
    }

    const extension = selectedFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const timestamp = Date.now();
    const filePath = `${userId}/avatar-${timestamp}.${extension}`;

    const { data: existingFiles, error: listError } = await supabase.storage
      .from("avatars")
      .list(userId);

    if (listError) {
      throw new Error(listError.message);
    }

    if (existingFiles && existingFiles.length > 0) {
      const filesToRemove = existingFiles.map((file) => `${userId}/${file.name}`);

      const { error: removeError } = await supabase.storage
        .from("avatars")
        .remove(filesToRemove);

      if (removeError) {
        throw new Error(removeError.message);
      }
    }

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, selectedFile, {
        upsert: false,
        contentType: selectedFile.type,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    return filePath;
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const usernameError = validateUsername(username);
      if (usernameError) {
        setError(usernameError);
        setSaving(false);
        return;
      }

      const finalAvatarPath = await uploadAvatarIfNeeded();

      const { error: upsertError } = await supabase.from("profiles").upsert({
        id: userId,
        username: username.trim(),
        avatar_path: finalAvatarPath || null,
      });

      if (upsertError) {
        throw new Error(upsertError.message);
      }

      setAvatarPath(finalAvatarPath);
      setSelectedFile(null);
      setPreviewUrl("");
      setHasUnsavedChanges(false);
      setMessage("Profile saved successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="mb-6 text-2xl font-bold">Profile</h2>

      <div className="mb-6">
        <label className="mb-2 block text-sm text-zinc-400">Current Email</label>
        <input
          type="text"
          value={email}
          disabled
          className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-3 text-zinc-500 outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setHasUnsavedChanges(true);
          }}
          placeholder="Your display name"
          className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
        />
        <p className="mt-2 text-xs text-zinc-500">
          3–20 characters. Letters, numbers, underscores only.
        </p>
      </div>

      <div className="mb-6">
        <label className="mb-3 block text-sm">Profile Picture</label>

        {previewUrl || avatarUrl ? (
          <div className="mb-4">
            <img
              src={previewUrl || avatarUrl}
              alt="Profile avatar"
              className="h-24 w-24 rounded-full border border-zinc-700 object-cover"
            />
            {previewUrl && (
              <p className="mt-2 text-xs text-amber-400">
                Preview only. Save Profile to apply this new picture.
              </p>
            )}
          </div>
        ) : (
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-zinc-800 bg-black text-sm text-zinc-500">
            No avatar
          </div>
        )}

        <label className="inline-flex cursor-pointer items-center rounded-lg border border-zinc-700 bg-black px-4 py-2 text-sm text-white hover:border-zinc-500">
          Choose New Picture
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
            className="hidden"
          />
        </label>

        {selectedFile && (
          <p className="mt-2 text-sm text-zinc-400">
            Selected: {selectedFile.name}
          </p>
        )}

        <p className="mt-2 text-xs text-zinc-500">
          JPG, PNG, or WEBP. Max 2 MB.
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
        disabled={saving || !hasUnsavedChanges}
        className="rounded-lg bg-white px-5 py-3 font-medium text-black disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </section>
  );
}
