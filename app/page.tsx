import Link from "next/link";
import { DATA } from "./lib/data";
// import { SpotifyNowPlaying } from "./components/spotify-now-playing";
import { getAllPosts } from "./lib/blog";
import Image from "next/image";

export default async function Portfolio() {
  const blogPosts = await getAllPosts();
  const latestPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });

  const accentColors: Record<string, string> = {
    emerald: 'hover:bg-emerald-500/10',
    violet: 'hover:bg-violet-500/10',
    sky: 'hover:bg-sky-500/10',
    amber: 'hover:bg-amber-500/10',
    rose: 'hover:bg-rose-500/10',
  };

  return (
    <main className="min-h-screen selection:bg-white selection:text-black bg-stone-950 text-stone-400 font-sans overflow-x-hidden w-full">
      <div className="mx-auto px-4 md:px-6 min-[1920px]:px-20 min-[2300px]:px-60 py-12 md:py-24 max-w-full">
        
        {/* --- MAIN HERO: PROJECTS & EXPERIENCE --- */}
        <header className="flex flex-col gap-8 md:gap-12 mb-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 xl:gap-24 pt-4 md:pt-12">
            <div className="lg:col-span-7 min-w-0">
              <h2 className="text-5xl sm:text-6xl xl:text-7xl tracking-tighter text-white font-medium break-words">
                PROJECTS
              </h2>
            </div>
            <div className="lg:col-span-5 hidden lg:block min-w-0">
              <h2 className="text-5xl sm:text-6xl xl:text-7xl tracking-tighter text-white font-medium break-words">
                EXPERIENCE
              </h2>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-16 xl:gap-24 w-full">
          
          {/* --- LEFT COLUMN: PROJECTS --- */}
          <section className="lg:col-span-7 space-y-12 md:space-y-16 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {DATA.projects.map((project) => (
                <Link
                  key={project.title}
                  href={`/projects/${project.slug}`}
                  className={`group relative flex flex-col overflow-hidden bg-stone-800 rounded-xl transition-all duration-500 ${
                    accentColors[project.accentColor as keyof typeof accentColors] || 'hover:bg-stone-700'
                  }`}
                >
                  <div className="relative w-full aspect-[16/6] overflow-hidden">
                    <Image
                      width={1200}
                      height={800}
                      src={`/${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-6 md:p-10 relative z-10 space-y-4 md:space-y-6 min-w-0">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl text-white group-hover:text-stone-200 transition-colors tracking-tighter font-normal break-words">
                      {project.title}
                    </h3>
                    <p className="text-lg md:text-xl text-stone-400 font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* --- RIGHT COLUMN: EXPERIENCE & INFO --- */}
          <section className="lg:col-span-5 space-y-12 md:space-y-16 min-w-0">
            
            {/* Experience Bento */}
            <div className="space-y-8 md:space-y-12">
              <h2 className="text-5xl sm:text-6xl xl:text-7xl tracking-tighter text-white font-medium lg:hidden break-words">
                EXPERIENCE
              </h2>
              <div className="grid gap-6 md:gap-8">
                {DATA.jobs.slice(0, 4).map((job) => (
                  <div 
                    key={job.company} 
                    className="group p-6 md:p-10 bg-stone-800 rounded-xl flex flex-col gap-6 md:gap-8 transition-all duration-300 hover:bg-stone-700 min-w-0"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="space-y-2 md:space-y-3 min-w-0">
                        <h3 className="text-3xl sm:text-4xl text-white group-hover:text-stone-200 transition-colors tracking-tighter font-normal break-words">
                          {job.company}
                        </h3>
                        <p className="text-lg md:text-xl text-stone-400 font-medium break-words">{job.role}</p>
                      </div>
                      <span className="text-sm font-medium text-stone-500 uppercase tracking-tight sm:mt-2 md:mt-3 shrink-0">
                        {job.period.split(' – ')[0]}
                      </span>
                    </div>
                    <p className="text-base md:text-lg text-stone-400 leading-relaxed font-light line-clamp-3">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Writing Bento */}
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-5xl sm:text-6xl xl:text-7xl tracking-tighter text-white font-medium lg:hidden break-words">
                WRITING
              </h2>
              <div className="grid gap-3">
                {latestPosts.slice(0, 3).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group flex items-center justify-between p-4 md:p-5 bg-stone-800 rounded-xl hover:bg-stone-700 transition-all min-w-0"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-[10px] text-stone-500 font-mono w-12 shrink-0 uppercase tracking-tighter">
                        {new Date(article.metadata.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <h3 className="text-sm md:text-base font-normal text-stone-300 group-hover:text-white transition-colors truncate">
                        {article.metadata.title}
                      </h3>
                    </div>
                    <span className="text-stone-600 group-hover:text-stone-400 transition-colors shrink-0">→</span>
                  </Link>
                ))}
              </div>
            </div>

          </section>
        </div>

        <footer className="mt-24 md:mt-32 pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-sm font-medium text-stone-500 uppercase tracking-tight">
              {DATA.name} &copy; {new Date().getFullYear()}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {Object.entries(DATA.links).map(([name, url]) => (
              <a 
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-stone-500 hover:text-white transition-colors uppercase tracking-tight"
              >
                {name}
              </a>
            ))}
          </div>
        </footer>

      </div>
    </main>
  );
}