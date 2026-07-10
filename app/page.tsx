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

      {/* --- SELECTED WORK --- */}
      <section className="mx-auto max-w-[1360px] px-6 pt-16 md:pt-24">
        <h1 className="mb-8 text-xs uppercase tracking-[0.2em] text-neutral-400 md:mb-10">
          Selected work
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {DATA.projects.map((project) => (
            <Link
              key={project.title}
              href={`/projects/${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white transition duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <Image
                  src={`/${project.image}`}
                  alt={project.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-1 flex-col pt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-medium tracking-tight text-neutral-900 group-hover:text-emerald-600">
                    {project.title}
                  </h2>
                  <span className="shrink-0 text-neutral-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-emerald-600">
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm font-light leading-relaxed text-neutral-500">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium tracking-tight text-neutral-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
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
