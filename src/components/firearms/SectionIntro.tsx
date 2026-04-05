type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
  id?: string;
};

export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: SectionIntroProps) {
  const alignClass = align === "center" ? "text-center items-center" : "";

  return (
    <div id={id} className={`flex flex-col gap-3 ${alignClass}`.trim()}>
      {eyebrow ? (
        <div className="inline-flex w-fit rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
          {eyebrow}
        </div>
      ) : null}

      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>

      <p className="max-w-3xl text-sm leading-6 text-zinc-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}
