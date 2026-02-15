import Link from "next/link";
import { DATA } from "./lib/data";
import { SpotifyNowPlaying } from "./components/spotify-now-playing";
import { SocialLinksWithPreviews } from "./components/social-links-with-previews";
import { getAllLeetCodePosts } from "./lib/leetcode";
import { getAllPosts } from "./lib/blog";

export default async function Portfolio() {
  const sortedSkills = [...DATA.skills].sort((a, b) => a.name.localeCompare(b.name));
  const leetcodePosts = await getAllLeetCodePosts();
  const blogPosts = await getAllPosts();

  // Combine and take latest for the blog section
  const allArticles = [
    ...leetcodePosts.map(p => ({ ...p, type: 'leetcode' as const })),
    ...blogPosts.map(p => ({ ...p, type: 'blog' as const }))
  ].sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });

  return (
    <main className="min-h-screen bg-transparent text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* --- LEFT COLUMN --- */}
        <header className="lg:col-span-12 xl:col-span-5 flex flex-col gap-12 py-12 md:py-20 lg:py-24 animate-in fade-in slide-in-from-left-4 duration-700">

          {/* Identity & Status */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="relative h-20 w-20 rounded-sm overflow-hidden">
                <img
                  src="/avatar.png"
                  alt={DATA.name}
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900">
                  {DATA.name}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 py-0.5 bg-zinc-50 rounded-sm border border-zinc-100">
                    OPEN TO WORK
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xl text-zinc-600 leading-6.5 tracking-tight max-w-lg font-light">
              Building web apps, trying to become a better dev day by day.
              Currently shipping <span className="text-zinc-900 font-medium">Drafter.lol</span> and documenting my <span className="text-zinc-900 font-medium">LeetCode</span> journey.
            </p>

            <SpotifyNowPlaying />

            {/* NAVIGATION */}
            <nav className="flex flex-wrap items-center gap-5">
              <div className="flex flex-wrap gap-3">
                <Link href="/leetcode" className="group relative flex flex-col px-5 py-2 rounded-sm border border-orange-200 bg-orange-100/50 hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-200/50 hover:border-orange-600 transition-all duration-300 overflow-hidden">
                  <span className="text-sm font-bold text-orange-900 group-hover:text-white transition-colors">LeetCode</span>
                  <span className="text-[10px] text-orange-700 uppercase tracking-tighter font-bold group-hover:text-orange-100 transition-colors">
                    {leetcodePosts.length} Problems Solved
                  </span>
                </Link>
                <Link href="/blog" className="group relative flex flex-col px-5 py-2 rounded-sm border border-blue-200 bg-blue-100/50 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-600 transition-all duration-300 overflow-hidden">
                  <span className="text-sm font-bold text-blue-900 group-hover:text-white transition-colors">Articles</span>
                  <span className="text-[10px] text-blue-700 uppercase tracking-tighter font-bold group-hover:text-blue-100 transition-colors">Tech Thoughts</span>
                </Link>
                <Link href="/personal" className="group relative flex flex-col px-5 py-2 rounded-sm border border-purple-200 bg-purple-100/50 hover:bg-purple-500 hover:shadow-xl hover:shadow-purple-200/50 hover:border-purple-600 transition-all duration-300 overflow-hidden">
                  <span className="text-sm font-bold text-purple-900 group-hover:text-white transition-colors">About</span>
                  <span className="text-[10px] text-purple-700 uppercase tracking-tighter font-bold group-hover:text-purple-100 transition-colors">My Story</span>
                </Link>
              </div>

              <div className="flex gap-4">
                <SocialLinksWithPreviews
                  links={DATA.links}
                  linkClassName="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors capitalize underline decoration-zinc-200 underline-offset-4 hover:decoration-zinc-900"
                />
              </div>
            </nav>
          </div>

          {/* EXPERIENCE & EDUCATION - Compacted */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12">
            <section>
              <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-6">
                Work Experience
              </h2>
              <div className="space-y-6 border-l border-zinc-100 pl-4">
                {DATA.jobs.map((job) => (
                  <div key={job.company} className="relative">
                    <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-zinc-200 ring-4 ring-white" />
                    <div className="flex flex-col">
                      <h3 className="text-sm font-bold text-zinc-900">{job.company}</h3>
                      <p className="text-xs text-zinc-500 font-medium">{job.role}</p>
                      <span className="text-[10px] text-zinc-400 font-mono mt-1">{job.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-6">
                Education
              </h2>
              <div className="space-y-6 border-l border-zinc-100 pl-4">
                {DATA.education.map((edu) => (
                  <div key={edu.degree} className="relative">
                    <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-zinc-200 ring-4 ring-white" />
                    <div className="flex flex-col">
                      <h3 className="text-sm font-bold text-zinc-900">{edu.institution}</h3>
                      <p className="text-xs text-zinc-500 font-medium">{edu.degree}</p>
                      <span className="text-[10px] text-zinc-400 font-mono mt-1">{edu.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* TOOLKIT - Minimal tags */}
          <section>
            <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-6">
              Toolkit
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {sortedSkills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-2 py-1 text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-100 rounded-md hover:bg-zinc-100 transition-colors"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          <footer className="mt-auto pt-12 text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {DATA.name} // ALL RIGHTS RESERVED
          </footer>
        </header>


        {/* --- RIGHT COLUMN (Featured Projects & Blog) --- */}
        <section className="lg:col-span-12 xl:col-span-7 xl:col-start-6 py-12 md:py-20 lg:py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-backwards">
          <div className="flex flex-col gap-12">

            {/* COMPACT PROJECTS BENTO */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-zinc-900 uppercase tracking-[0.3em]">
                  Projects
                </h2>
                <div className="h-px flex-1 bg-zinc-100 ml-6 hidden sm:block" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {DATA.projects.map((project, index) => {
                  const isLarge = index === 0;
                  return (
                    <div
                      key={project.title}
                      className={`${isLarge ? 'col-span-2' : 'col-span-1'} group relative`}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        className="relative block w-full aspect-[4/3] md:aspect-auto md:h-full bg-zinc-100 overflow-hidden rounded-sm border border-zinc-200/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                      >
                        <img
                          src={`/${project.image}`}
                          alt={project.title}
                          loading="lazy"
                          className="object-cover w-full h-full transition-all duration-700 group-hover:scale-[1.05]"
                        />

                        {/* Shimmer Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                        <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className={`font-bold tracking-tight text-white leading-tight ${isLarge ? 'text-lg md:text-xl' : 'text-[11px] md:text-sm'}`}>
                              {project.title}
                            </h3>
                            {isLarge && (
                              <div className="text-white/70 group-hover:text-white transition-colors">
                                <svg className="w-4 h-4 transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {isLarge && (
                            <p className="text-[11px] md:text-sm text-zinc-300 font-light mt-1 line-clamp-1">
                              {project.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.tech.slice(0, isLarge ? 4 : 2).map((t) => (
                              <span key={t} className="px-1.5 py-0.5 text-[7px] md:text-[8px] font-bold text-white/90 uppercase tracking-tighter bg-white/5 backdrop-blur-md rounded border border-white/10">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>


            {/* BLOG BENTO GRID */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-zinc-900 uppercase tracking-[0.3em]">
                  Recent Writing
                </h2>
                <div className="h-px flex-1 bg-zinc-100 ml-6 hidden sm:block" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {allArticles.slice(0, 5).map((article, index) => {
                  const isLeetCode = article.type === 'leetcode';
                  const isMain = index === 0;

                  return (
                    <article
                      key={article.slug}
                      className={`${isMain ? 'md:col-span-2 md:row-span-2' : article.type === 'leetcode' ? 'md:col-span-1' : 'md:col-span-1'} group`}
                    >
                      <Link
                        href={isLeetCode ? `/leetcode/${article.slug}` : `/blog/${article.slug}`}
                        className={`flex flex-col h-full p-6 rounded-sm border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${isMain
                          ? 'bg-zinc-900 text-white border-zinc-800'
                          : 'bg-white text-zinc-900 border-zinc-100 hover:border-zinc-200'
                          }`}
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-center justify-between mb-4">
                            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isMain ? 'text-zinc-400' : 'text-zinc-500'}`}>
                              {isLeetCode ? (
                                <span className="flex items-center gap-1.5">
                                  <span className={`h-1.5 w-1.5 rounded-full ${article.metadata.difficulty === 'Easy' ? 'bg-green-500' :
                                    article.metadata.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                                    }`} />
                                  LeetCode {article.metadata.difficulty}
                                </span>
                              ) : 'Article'}
                            </span>
                            <span className={`text-[10px] font-mono ${isMain ? 'text-zinc-500' : 'text-zinc-400'}`}>
                              {new Date(article.metadata.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>

                          <h3 className={`${isMain ? 'text-3xl' : 'text-lg'} font-bold tracking-tight mb-3 leading-tight group-hover:opacity-80 transition-opacity`}>
                            {article.metadata.title}
                          </h3>

                          {isMain && (
                            <p className="text-zinc-400 font-light leading-relaxed mb-6 line-clamp-3 italic">
                              "{article.metadata.description}"
                            </p>
                          )}

                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {article.metadata.tags.slice(0, 2).map(tag => (
                                <span key={tag} className={`text-[9px] font-bold uppercase tracking-tighter ${isMain ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className={`${isMain ? 'bg-white text-zinc-900' : 'bg-zinc-900 text-white'} p-2 rounded-full transform group-hover:scale-110 transition-transform`}>
                              <svg className="w-3.2 h-3.2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}

                {/* View More Card */}
                <Link
                  href="/blog"
                  className="md:col-span-1 group flex flex-col items-center justify-center p-6 rounded-sm border-2 border-dashed border-zinc-100 bg-zinc-50/50 transition-all hover:bg-zinc-100 hover:border-zinc-200"
                >
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Explore All</span>
                  <span className="text-sm font-bold text-zinc-900 group-hover:underline underline-offset-4 decoration-2">Writing Archive &rarr;</span>
                </Link>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}