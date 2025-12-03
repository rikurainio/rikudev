import Link from "next/link";
import { DATA } from "./lib/data";
import { SpotifyNowPlaying } from "./components/spotify-now-playing";
import { LinkPreview } from "./components/link-preview";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      
      {/* Scroll-lock on desktop */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 lg:h-screen lg:overflow-hidden">
        
        {/* --- LEFT COLUMN --- */}
        <header className="lg:col-span-5 flex flex-col gap-14 py-12 md:py-20 lg:py-24 lg:overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-left-4 duration-700">
          
          {/* Identity & Status */}
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-900">
              {DATA.name}
            </h1>
            
            <div className="flex items-center gap-2 -mt-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Available for new projects
                </span>
            </div>
            {/* Spotify Now Playing */}
            <SpotifyNowPlaying />

            {/* <p className="text-xl text-zinc-600 leading-relaxed max-w-md font-light">
              {DATA.about}
            </p> */}


            {/* NAVIGATION AREA: Combined Internal & External Links */}
            <div className="flex flex-wrap items-center gap-6 -mt-">
                
                {/* 1. INTERNAL ROUTES (Blog, Personal) */}
                <div className="flex gap-4">
                    <Link 
                        href="/blog" 
                        className="text-sm font-medium text-zinc-900 border-b border-zinc-900 pb-0.5 transition-all hover:opacity-70"
                    >
                        Blog
                    </Link>
                    <Link 
                        href="/personal" 
                        className="text-sm font-medium text-zinc-900 border-b border-zinc-900 pb-0.5 transition-all hover:opacity-70"
                    >
                        Me
                    </Link>
                </div>

                {/* Divider (Optional, removes visual clutter if deleted) */}
                <span className="text-zinc-300">/</span>

                {/* 2. EXTERNAL SOCIALS (Existing) */}
                <div className="flex gap-4">
                    {Object.entries(DATA.links).map(([key, url]) => 
                        url.startsWith('mailto:') || url.endsWith('.pdf') || key.toLowerCase() === 'resume' ? (
                            <a 
                                key={key}
                                href={url}
                                className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors capitalize border-b border-transparent hover:border-zinc-900 pb-0.5"
                            >
                                {key}
                            </a>
                        ) : (
                            <LinkPreview 
                                key={key}
                                href={url}
                                className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors capitalize border-b border-transparent hover:border-zinc-900 pb-0.5"
                                previewText={key}
                            >
                                {key}
                            </LinkPreview>
                        )
                    )}
                </div>
            </div>
          </div>

          {/* ... Rest of the sections (Experience, Toolkit, etc.) ... */}
          <section>
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-8">
              Experience
            </h2>
            <div className="flex flex-col gap-8">
              {DATA.jobs.map((job) => (
                <div key={job.company} className="flex justify-between items-baseline group">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold text-zinc-900">
                      {job.company}
                    </h3>
                    <p className="text-base text-zinc-500 font-light">
                      {job.role}
                    </p>
                  </div>
                  <span className="text-sm text-zinc-400 font-mono tabular-nums">
                    {job.period}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
             <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-6">
              Toolkit
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-base text-zinc-600 font-light">
               {DATA.skills.map((skill) => (
                 <span key={skill} className="hover:text-zinc-900 transition-colors cursor-default">
                   {skill}
                 </span>
               ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-8">
              Education
            </h2>
            <div className="flex flex-col gap-8">
              {DATA.education.map((edu) => (
                <div key={`${edu.institution}-${edu.degree}`} className="flex justify-between items-baseline group">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold text-zinc-900">
                      {edu.institution}
                    </h3>
                    <p className="text-base text-zinc-500 font-light">
                      {edu.degree}
                    </p>
                  </div>
                  <span className="text-sm text-zinc-400 font-mono tabular-nums">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <footer className="pt-8 text-xs text-zinc-400 font-mono">
            <span>&copy; {new Date().getFullYear()} {DATA.name}.</span>
          </footer>
        </header>


        {/* --- RIGHT COLUMN --- */}
        <section className="lg:col-span-6 lg:col-start-7 py-12 md:py-20 lg:py-24 lg:h-screen lg:overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <div className="grid grid-cols-1 gap-8">
            {DATA.projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

// Project Card (Unchanged)
function ProjectCard({ project }: { project: typeof DATA.projects[0] }) {
  return (
    <Link 
      href={`/projects/${project.slug}`}
      className="group relative block w-full aspect-video bg-zinc-100 overflow-hidden rounded-2xl border border-transparent hover:border-zinc-200 transition-colors"
    >
      <img 
        key={project.slug}
        src={`/${project.image}`} 
        alt={project.title} 
        loading="lazy"
        className="object-cover w-full h-full md:transition-all md:duration-500 md:ease-out md:group-hover:grayscale-0 md:group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-linear-to-t from-zinc-900/90 via-zinc-900/40 to-transparent opacity-100 md:opacity-0 md:bg-zinc-900/60 md:transition-opacity md:duration-300 md:group-hover:opacity-100 flex flex-col justify-end p-8">
          <h3 className="text-white text-2xl font-bold tracking-tight">
            {project.title}
          </h3>
          <p className="text-zinc-300 text-base font-light mt-1">
            {project.tech.slice(0, 3).join("  •  ")}
          </p>
      </div>
    </Link>
  );
}