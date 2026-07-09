import Link from "next/link";
import Image from "next/image";
import { DATA } from "./lib/data";
import { getAllPosts } from "./lib/blog";

export default async function Portfolio() {
  const blogPosts = await getAllPosts();
  const latestPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });

  return (
    <main className="min-h-screen bg-white text-neutral-600 font-sans selection:bg-emerald-500 selection:text-white">

      {/* --- HERO: SWIRL-CLIPPED PROJECT MURAL --- */}
      <h1 className="sr-only">Selected work</h1>

      {/* SVG clip-path definition (scales with the element via objectBoundingBox) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="project-swirl" clipPathUnits="objectBoundingBox">
            <path d="M0,0.28 C0.12,0.06 0.30,0.05 0.42,0.20 C0.55,0.36 0.70,0.40 0.82,0.24 C0.90,0.13 0.96,0.12 1,0.16 L1,0.84 C0.90,0.70 0.78,0.66 0.66,0.80 C0.52,0.96 0.36,0.96 0.24,0.82 C0.15,0.71 0.07,0.72 0,0.78 Z" />
          </clipPath>
        </defs>
      </svg>

      <section className="pt-6 md:pt-10">
        {/* Clipped mural band */}
        <div
          className="relative h-[42vh] w-full sm:h-[54vh]"
          style={{ clipPath: "url(#project-swirl)" }}
        >
          <div className="flex h-full w-full">
            {DATA.projects.map((project) => (
              <Link
                key={project.title}
                href={`/projects/${project.slug}`}
                className="group relative flex-1 overflow-hidden bg-neutral-100"
              >
                <Image
                  src={`/${project.image}`}
                  alt={project.title}
                  fill
                  sizes="33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/40">
                  <span className="text-lg font-medium tracking-tight text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:text-2xl">
                    {project.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Captions */}
        <div className="mx-auto mt-10 max-w-[1360px] px-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            {DATA.projects.map((project) => (
              <Link
                key={project.title}
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-medium tracking-tight text-neutral-900 group-hover:text-emerald-600">
                    {project.title}
                  </h2>
                  <span className="shrink-0 text-neutral-300 group-hover:text-emerald-600">
                    →
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-light leading-relaxed text-neutral-500">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 pt-20 pb-20 md:pt-28 md:pb-28">

        {/* --- EXPERIENCE --- */}
        <section className="mb-20 md:mb-28">
          <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-400">
            Experience
          </h2>
          <div className="divide-y divide-neutral-200">
            {DATA.jobs.map((job) => {
              const isOngoing = job.period.includes("Present");
              const logo = "logo" in job ? (job.logo as string) : undefined;
              return (
                <div key={job.company} className="flex gap-4 py-6">
                  <div className="mt-1 h-10 w-10 shrink-0 overflow-hidden rounded-md bg-neutral-100 ring-1 ring-neutral-200">
                    {logo ? (
                      <Image
                        src={logo}
                        alt={`${job.company} logo`}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-sm font-medium text-neutral-400">
                        {job.company.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-6">
                      <div className="flex min-w-0 items-baseline gap-3">
                        <h3 className="text-lg md:text-xl tracking-tight font-normal text-neutral-900">
                          {job.company}
                        </h3>
                        {isOngoing && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-emerald-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Ongoing
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 text-xs uppercase tracking-widest text-neutral-400">
                        {job.period.split(" – ")[0]}
                      </span>
                    </div>
                    <p className="mt-1 text-base text-neutral-500">{job.role}</p>
                    <p className="mt-3 text-base font-light leading-relaxed text-neutral-500">
                      {job.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- WRITING --- */}
        {latestPosts.length > 0 && (
          <section className="mb-20 md:mb-28">
            <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-400">
              Writing
            </h2>
            <div className="divide-y divide-neutral-200">
              {latestPosts.slice(0, 5).map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-5"
                >
                  <h3 className="text-lg font-normal text-neutral-900 group-hover:text-emerald-600">
                    {article.metadata.title}
                  </h3>
                  <span className="shrink-0 text-xs uppercase tracking-widest text-neutral-400">
                    {new Date(article.metadata.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* --- FOOTER --- */}
        <footer className="mt-24 flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral-200 pt-8">
          {Object.entries(DATA.links).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-emerald-600"
            >
              {name}
            </a>
          ))}
        </footer>

      </div>
    </main>
  );
}
