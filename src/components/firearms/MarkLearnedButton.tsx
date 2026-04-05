"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

type MarkLearnedButtonProps = {
  entryType: "cartridge" | "weapon";
  cartridgeId?: string;
  weaponId?: string;
  initialLearned: boolean;
  isLoggedIn: boolean;
};

export default function MarkLearnedButton({
  entryType,
  cartridgeId,
  weaponId,
  initialLearned,
  isLoggedIn,
}: MarkLearnedButtonProps) {
  const supabase = createClient();
  const [isLearned, setIsLearned] = useState(initialLearned);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleMarkLearned() {
    if (!isLoggedIn) {
      setMessage("Sign in to save study progress.");
      return;
    }

    startTransition(async () => {
      setMessage("");

      const payload =
        entryType === "cartridge"
          ? {
              entry_type: "cartridge",
              cartridge_id: cartridgeId ?? null,
              weapon_id: null,
              learned_at: new Date().toISOString(),
            }
          : {
              entry_type: "weapon",
              cartridge_id: null,
              weapon_id: weaponId ?? null,
              learned_at: new Date().toISOString(),
            };

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Sign in to save study progress.");
        return;
      }

      const { error } = await supabase.from("study_progress").upsert({
        user_id: user.id,
        ...payload,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setIsLearned(true);
      setMessage("Marked as learned.");
    });
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleMarkLearned}
        disabled={isPending || isLearned}
        className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLearned ? "Learned" : isPending ? "Saving..." : "Mark as learned"}
      </button>

      {message ? (
        <p className="text-sm text-zinc-400">{message}</p>
      ) : (
        <p className="text-sm text-zinc-500">
          {isLearned
            ? "This entry is saved as learned in your study progress."
            : "Use this simple action now; later it can expand into streaks, decks, and spaced repetition."}
        </p>
      )}
    </div>
  );
}
