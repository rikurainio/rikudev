import Link from "next/link";
import { DATA } from "./lib/data";
import { SpotifyNowPlaying } from "./components/spotify-now-playing";
import { SocialDropdown } from "./components/social-dropdown";
import { getAllLeetCodePosts } from "./lib/leetcode";
import { getAllPosts } from "./lib/blog";

export default async function Portfolio() {
  const sortedSkills = [...DATA.skills].sort((a, b) => a.name.localeCompare(b.name));
  const leetcodePosts = await getAllLeetCodePosts();
  const blogPosts = await getAllPosts();

  const skillsByCategory = sortedSkills.reduce((acc, skill) => {
    const cat = skill.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof DATA.skills>);

  const allArticles = [
    ...leetcodePosts.map(p => ({ ...p, type: 'leetcode' as const })),
    ...blogPosts.map(p => ({ ...p, type: 'blog' as const }))
  ].sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });

  const accentColors: Record<string, string> = {
    emerald: 'group-hover:bg-emerald-500/10',
    violet: 'group-hover:bg-violet-500/10',
    sky: 'group-hover:bg-sky-500/10',
    amber: 'group-hover:bg-amber-500/10',
    rose: 'group-hover:bg-rose-500/10',
  };

  return (
    <main className="min-h-screen selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

        {/* --- LEFT COLUMN: IDENTITY & INFO --- */}
        <header className="lg:col-span-5 flex flex-col gap-6 py-10 md:py-14">
          {/* DISCORD-STYLE PROFILE CARD */}
          <div className="flex flex-col gap-8">
            {/* CARD TOP INFO */}
            <div className="flex flex-row items-start gap-5">
              {/* Avatar with Status */}
              <div className="relative shrink-0">
                <div className="h-20 w-20 rounded-sm overflow-hidden bg-zinc-800 border-2 border-zinc-900 ring-1 ring-zinc-800 transition-all">
                  <img
                    src="/avatar.png"
                    alt={DATA.name}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Identity Info */}
              <div className="flex-1 pt-1">
                <h1 className="text-2xl font-black tracking-tight text-white leading-none">
                  {DATA.name}
                </h1>
                <p className="text-zinc-500 text-sm font-bold mt-1.5 uppercase tracking-widest leading-none">
                  {DATA.role}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="px-2 py-0.5 bg-zinc-950 text-[10px] font-black text-emerald-500 border border-zinc-800/50 rounded-xs uppercase tracking-[0.2em]">
                    Available for work
                  </div>
                </div>
              </div>
            </div>

            {/* CARD BIO / STATUS SECTION */}
            <div className="space-y-6">

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">About Me</h2>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    Designing and building <span className="text-white">minimalist, high-performance</span> interfaces.
                    Currently focused on Improving through <span className="text-white">LeetCode</span>.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Currently Playing</h2>
                  <SpotifyNowPlaying />
                </div>
              </div>
            </div>

            {/* BUTTONS IN CARD FOOTER STYLE */}
            <div className="pt-2">
              <nav className="flex flex-wrap items-center gap-2">
                <Link href="/leetcode" className="px-3.5 py-1.5 bg-zinc-950/50 border border-zinc-800/80 rounded-sm text-[13px] font-bold text-zinc-400 hover:text-white hover:border-zinc-500 transition-all flex items-center gap-2 group/nav">
                  LeetCode
                  <span className="text-[10px] text-zinc-600 font-black tracking-tighter group-hover:text-zinc-300 transition-colors uppercase">{leetcodePosts.length}</span>
                </Link>
                <Link href="/blog" className="px-3.5 py-1.5 bg-zinc-950/50 border border-zinc-800/80 rounded-sm text-[13px] font-bold text-zinc-400 hover:text-white hover:border-zinc-500 transition-all flex items-center">
                  Writing
                </Link>
                <SocialDropdown links={DATA.links} />
              </nav>
            </div>
          </div>

          {/* EXPERIENCE & EDUCATION SECTION */}
          <div className="flex flex-col gap-10 pt-2">
            <section className="space-y-5">
              <h2 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-3">
                Experience
                <div className="h-px flex-1 bg-zinc-900" />
              </h2>
              <div className="space-y-8">
                {DATA.jobs.map((job) => (
                  <div key={job.company} className="flex flex-col gap-1 group">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-zinc-200 group-hover:text-white transition-colors">{job.company}</h3>
                      <span className="text-sm text-zinc-700 font-mono">{job.period}</span>
                    </div>
                    <p className="text-base text-zinc-500 font-medium">{job.role}</p>
                    <p className="text-base text-zinc-500 leading-relaxed mt-2 font-light">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-3">
                Education
                <div className="h-px flex-1 bg-zinc-900" />
              </h2>
              <div className="space-y-5">
                {DATA.education.map((edu) => (
                  <div key={edu.degree} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-zinc-200">{edu.institution}</h3>
                      <span className="text-sm text-zinc-700 font-mono">{edu.period}</span>
                    </div>
                    <p className="text-base text-zinc-500 font-medium">{edu.degree}</p>
                    <p className="text-base text-zinc-500 leading-relaxed mt-2 font-light">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-5 pb-8">
              <h2 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-3">
                Toolkit
                <div className="h-px flex-1 bg-zinc-900" />
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {sortedSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-2 py-1 text-sm font-medium text-zinc-600 border border-zinc-900 bg-zinc-950 rounded-sm hover:text-zinc-300 hover:border-zinc-700 transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </header>


        {/* --- RIGHT COLUMN: PROJECTS & CONTENT --- */}
        <section className="lg:col-span-7 py-10 md:py-14 space-y-12">
          {/* PROJECTS */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-[0.3em]">Featured Projects</h2>
              <div className="h-px flex-1 bg-zinc-900/50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DATA.projects.map((project, idx) => (
                <Link
                  key={project.title}
                  href={`/projects/${project.slug}`}
                  className={`group relative flex flex-col overflow-hidden bg-zinc-950/30 border border-zinc-900 rounded-sm transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-900/20 ${idx === 0 ? 'md:col-span-2' : ''}`}
                >
                  <div className={`${idx === 0 ? 'aspect-[2.4/1]' : 'aspect-video'} w-full overflow-hidden border-b border-zinc-900/30 relative`}>
                    <img
                      src={`/${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

                    {/* Tech Overlays */}
                    {/* <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      {project.tech.slice(0, 3).map(t => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-bold bg-zinc-950/90 backdrop-blur-md text-zinc-300 border border-zinc-800 rounded-xs uppercase tracking-widest"
                        >
                          {t}
                        </span>
                      ))}
                    </div> */}
                  </div>

                  <div className="p-5 flex-1 flex flex-col gap-3 relative z-10">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-zinc-300 transition-colors leading-tight tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-base text-zinc-500 font-light leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Interaction Hint */}
                    <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-zinc-700 uppercase tracking-[0.2em] group-hover:text-zinc-400 transition-colors">
                      View Project
                      <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${accentColors[project.accentColor as keyof typeof accentColors] || ''}`} />
                </Link>
              ))}
            </div>
          </div>

          {/* RECENT WRITING */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-[0.3em]">Latest Writings</h2>
              <div className="h-px flex-1 bg-zinc-900/50" />
            </div>

            <div className="flex flex-col border border-zinc-900 rounded-sm divide-y divide-zinc-900">
              {allArticles.slice(0, 4).map((article) => {
                const isLeetCode = article.type === 'leetcode';
                return (
                  <Link
                    key={article.slug}
                    href={isLeetCode ? `/leetcode/${article.slug}` : `/blog/${article.slug}`}
                    className="group flex items-center justify-between p-3 bg-transparent hover:bg-zinc-900/20 transition-all gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-[10px] text-zinc-800 font-mono w-10 shrink-0 uppercase tracking-tighter">
                        {new Date(article.metadata.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <h3 className="text-base font-normal text-zinc-500 group-hover:text-zinc-200 transition-colors truncate">
                        {article.metadata.title}
                      </h3>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-xs border border-zinc-900 shrink-0 ${isLeetCode ? 'text-zinc-700 bg-zinc-950' : 'text-zinc-600 bg-zinc-950'}`}>
                      {isLeetCode ? 'L-Code' : 'Blog'}
                    </span>
                  </Link>
                );
              })}

              <Link
                href="/blog"
                className="group flex items-center justify-between p-3 hover:bg-zinc-900/40 transition-all"
              >
                <span className="text-xs font-bold text-zinc-700 group-hover:text-zinc-500 uppercase tracking-[0.2em]">Archive</span>
                <span className="text-zinc-800 group-hover:text-white text-sm">→</span>
              </Link>
            </div>
          </div>

          <footer className="pt-24 flex flex-col gap-4 border-t border-zinc-900">
            <div className="flex justify-between items-center text-sm font-mono text-zinc-800 uppercase tracking-widest">
              <span>{DATA.name} &copy; {new Date().getFullYear()}</span>
            </div>
          </footer>
        </section>

      </div>
    </main>
  );
}