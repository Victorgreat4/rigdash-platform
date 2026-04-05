import Link from "next/link";

type StudyModeLinkProps = {
  href: string;
  enabled: boolean;
};

export default function StudyModeLink({
  href,
  enabled,
}: StudyModeLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex rounded-full px-4 py-2 text-sm transition ${
        enabled
          ? "border border-emerald-700 bg-emerald-950/40 text-emerald-100 hover:border-emerald-600"
          : "border border-zinc-700 text-zinc-200 hover:border-zinc-500 hover:text-white"
      }`}
    >
      {enabled ? "Exit study mode" : "Enter study mode"}
    </Link>
  );
}
