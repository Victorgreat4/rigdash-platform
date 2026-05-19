import Link from "next/link";

export default function RigDashDesktopPage() {
    return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
            <div className="mx-auto max-w-5xl space-y-12">
                <section className="space-y-5">
                    <div className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
                        Windows Desktop App
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl font-bold tracking-tight">
                            RigDash Desktop
                        </h1>

                        <p className="max-w-3xl text-lg text-zinc-400">
                            A focused Windows companion app for fast access to your gaming
                            workflow, tools, and desktop utility shortcuts.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <a
                            href="#download"
                            className="rounded-lg bg-white px-5 py-3 font-medium text-black"
                        >
                            Download Latest Version
                        </a>

                        <Link
                            href="/tools"
                            className="rounded-lg border border-zinc-700 px-5 py-3 font-medium text-white"
                        >
                            Back to Tools
                        </Link>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                        <h2 className="mb-2 text-xl font-semibold">Fast Access</h2>
                        <p className="text-sm text-zinc-400">
                            Launch your most important workflow actions without digging
                            through folders, menus, or tabs.
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                        <h2 className="mb-2 text-xl font-semibold">Gaming Utility</h2>
                        <p className="text-sm text-zinc-400">
                            Keep key tools and routines close at hand while staying lightweight
                            and focused.
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                        <h2 className="mb-2 text-xl font-semibold">Windows Native</h2>
                        <p className="text-sm text-zinc-400">
                            Built for Windows desktop use, with a simple download and direct
                            local execution flow.
                        </p>
                    </div>
                </section>

                <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
                            Platform: Windows
                        </span>
                        <span className="rounded-full border border-emerald-700 px-3 py-1 text-sm text-emerald-300">
                            Status: Released
                        </span>
                        <span className="rounded-full border border-blue-700 px-3 py-1 text-sm text-blue-300">
                            Ongoing Development
                        </span>
                    </div>

                    <h2 className="mb-3 text-2xl font-bold">What RigDash Desktop is for</h2>
                    <p className="max-w-3xl text-zinc-400">
                        RigDash Desktop is a compact desktop-side control layer for gaming and utility
                        workflow. The website acts as the home, overview, and download surface, while
                        the Windows app delivers the fast local experience. The first public build is
                        now available, with more updates planned over time.
                    </p>
                </section>

                <section className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                        <h2 className="mb-4 text-2xl font-bold">Planned Features</h2>

                        <ul className="list-disc space-y-3 pl-5 text-zinc-300">
                            <li>Quick launcher for important tools</li>
                            <li>Focused gaming workflow shortcuts</li>
                            <li>Lightweight desktop control panel</li>
                            <li>Direct access to core utility actions</li>
                            <li>Future iteration and release updates</li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                        <h2 className="mb-4 text-2xl font-bold">Release Info</h2>

                        <div className="space-y-3 text-zinc-400">
                            <p>
                                <span className="font-medium text-white">Current version:</span> v1.0.0
                            </p>
                            <p>
                                <span className="font-medium text-white">Distribution:</span> Google Drive
                                download
                            </p>
                            <p>
                                <span className="font-medium text-white">Package type:</span> ZIP archive
                            </p>
                            <p>
                                <span className="font-medium text-white">Platform:</span> Windows x64
                            </p>
                            <p>
                                <span className="font-medium text-white">Release state:</span> Initial public
                                build
                            </p>
                        </div>
                    </div>
                </section>

                <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                    <h2 className="mb-4 text-2xl font-bold">Screenshots</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border border-zinc-800 bg-black p-3">
                            <img
                                src="/images/tools/rigdash-desktop-1.png"
                                alt="RigDash Desktop screenshot 1"
                                className="w-full rounded-lg border border-zinc-800 object-cover"
                            />
                            <p className="mt-3 text-sm text-zinc-400">
                                Main desktop view.
                            </p>
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-black p-3">
                            <img
                                src="/images/tools/rigdash-desktop-2.png"
                                alt="RigDash Desktop screenshot 2"
                                className="w-full rounded-lg border border-zinc-800 object-cover"
                            />
                            <p className="mt-3 text-sm text-zinc-400">
                                Secondary view / feature panel.
                            </p>
                        </div>
                    </div>
                </section>

                <section
                    id="download"
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-6"
                >
                    <h2 className="mb-3 text-2xl font-bold">Download</h2>
                    <p className="mb-6 text-zinc-400">
                        The first public Windows build of RigDash Desktop is now available for
                        download.
                    </p>

                    <div className="mb-6 space-y-2 text-zinc-400">
                        <p>
                            <span className="font-medium text-white">Version:</span> v1.0.0
                        </p>
                        <p>
                            <span className="font-medium text-white">Platform:</span> Windows x64
                        </p>
                        <p>
                            <span className="font-medium text-white">Package:</span> ZIP archive
                        </p>
                    </div>

                    <a
                        href="https://drive.google.com/uc?export=download&id=1_Toc47KV3fVKYqbD3Z-GtoxygKjdiewK"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-lg bg-white px-5 py-3 font-medium text-black"
                    >
                        Download Latest Version
                    </a>
                </section>
            </div>
        </main>
    );
}
