import Link from "next/link";

type GenomicsSectionNavProps = {
  active: "notebook" | "cell-reprogramming";
};

const navItems = [
  {
    id: "notebook",
    label: "Lab Notebook",
    href: "/genomics",
  },
  {
    id: "cell-reprogramming",
    label: "Cell Reprogramming",
    href: "/genomics/cell-reprogramming",
  },
] satisfies Array<{
  id: GenomicsSectionNavProps["active"];
  label: string;
  href: string;
}>;

export default function GenomicsSectionNav({
  active,
}: GenomicsSectionNavProps) {
  return (
    <nav
      aria-label="Genomics sections"
      className="border-b border-stone-800 bg-stone-950 px-6"
    >
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto py-4">
        {navItems.map((item) => {
          const isActive = item.id === active;

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-cyan-400 bg-cyan-950/50 text-cyan-100"
                  : "border-stone-700 text-stone-300 hover:border-stone-500 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
