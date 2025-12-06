import Link from "next/link";
import Image from "next/image";
import { DATA } from "./lib/data";
import { SpotifyNowPlaying } from "./components/spotify-now-playing";
import { SocialLinksWithPreviews } from "./components/social-links-with-previews";

export default function Portfolio() {
  const categoryOrder: Record<string, number> = {
    "programming language": 0,
    framework: 1,
    markup: 1,
    styling: 1,
    "styling framework": 1,
    runtime: 1,
    database: 2,
    cloud: 2,
    engine: 2,
    tool: 3,
    "design tool": 4,
    pokemon: 5,
  };

  const sortedSkills = [...DATA.skills].sort((a, b) => {
    const aCategoryOrder = categoryOrder[a.category] ?? 99;
    const bCategoryOrder = categoryOrder[b.category] ?? 99;
    if (aCategoryOrder !== bCategoryOrder) return aCategoryOrder - bCategoryOrder;

    return a.name.localeCompare(b.name);
  });

  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Responsive two-column layout without scroll lock */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* --- LEFT COLUMN --- */}
        <header className="lg:col-span-5 flex flex-col gap-14 py-12 md:py-20 lg:py-24 animate-in fade-in slide-in-from-left-4 duration-700">
          
          {/* Identity & Status */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100">
                <img
                  src="/avatar.png"
                  alt={DATA.name}
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-900">
                {DATA.name}
              </h1>
            </div>
            
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
                  <SocialLinksWithPreviews
                    links={DATA.links}
                    linkClassName="text-sm font-medium cursor-pointer text-zinc-400 hover:text-zinc-900 transition-colors capitalize border-b border-transparent hover:border-zinc-900 pb-0.5"
                  />
                </div>
            </div>
          </div>

          {/* Mobile Projects Section - appears after hero, before Experience */}
          <div className="lg:hidden">
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-6">
              Projects
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {DATA.projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>

          {/* ... Rest of the sections (Experience, Toolkit, etc.) ... */}
          {/* EXPERIENCE SECTION */}
          <section>
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4 ml-1">
              Experience
            </h2>
            {/* The Container Card */}
            <div className="flex flex-col gap-6 bg-zinc-50/50 rounded-2xl p-6">
              {DATA.jobs.map((job) => (
                <div key={job.company} className="flex flex-col gap-1 group">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-semibold text-zinc-900">
                      {job.company}
                    </h3>
                    <span className="text-xs text-zinc-400 font-mono tabular-nums">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 font-normal">
                    {job.role}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION SECTION */}
          <section>
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4 ml-1">
              Education
            </h2>
            {/* The Container Card */}
            <div className="flex flex-col gap-6 bg-zinc-50/50 rounded-2xl p-6">
              {DATA.education.map((edu) => (
                <div key={`${edu.institution}-${edu.degree}`} className="flex flex-col gap-1 group">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-semibold text-zinc-900">
                      {edu.institution}
                    </h3>
                    <span className="text-xs text-zinc-400 font-mono tabular-nums">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 font-normal">
                    {edu.degree}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4 ml-1">
              Toolkit
            </h2>
            
            {/* The Container Card */}
            <div className="bg-zinc-50/50 rounded-2xl p-6">
              <div className="flex flex-wrap gap-2">
                {sortedSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-default"
                    title={skill.category}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </section>

   

          <footer className="pt-8 text-xs text-zinc-400 font-mono">
            <span>&copy; {new Date().getFullYear()} {DATA.name}.</span>
          </footer>
        </header>


        {/* --- RIGHT COLUMN (Desktop Projects) --- */}
        <section className="hidden lg:block lg:col-span-6 lg:col-start-7 py-12 md:py-20 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards">
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

function ProjectCard({ project }: { project: typeof DATA.projects[0] }) {
  // Per-project overlay base colors (hex values from your comment above)
  const projectOverlayColor: Record<string, string> = {
    "drafter-lol": "#171718",
    ideastorm: "#e5e5fa",
    mennaa: "#9cf250",
    "sasken-cv-database": "#f8f9fa",
    linkedinsanity: "#212225",
  };

  const projectTextColor: Record<
    string,
    { title: string; meta: string }
  > = {
    "drafter-lol": {
      title: "text-white",
      meta: "text-zinc-300",
    },
    ideastorm: {
      title: "text-zinc-900",
      meta: "text-zinc-700",
    },
    mennaa: {
      title: "text-zinc-900",
      meta: "text-zinc-700",
    },
    "sasken-cv-database": {
      title: "text-zinc-900",
      meta: "text-zinc-700",
    },
    linkedinsanity: {
      title: "text-white",
      meta: "text-zinc-300",
    },
  };

  const baseColor = projectOverlayColor[project.slug] ?? "#18181b";
  const fromColor = `${baseColor}E6`; // ~90% opacity
  const midColor = `${baseColor}99`; // ~60% opacity
  const textColors =
    projectTextColor[project.slug] ??
    {
      title: "text-white",
      meta: "text-zinc-300",
    };

  return (
    <Link 
      href={`/projects/${project.slug}`}
      className="group relative block w-full aspect-video bg-zinc-100 overflow-hidden rounded-xl lg:rounded-2xl border border-transparent hover:border-zinc-200 transition-colors"
    >
      <img 
        key={project.slug}
        src={`/${project.image}`} 
        alt={project.title} 
        loading="lazy"
        className="object-cover w-full h-full md:transition-all md:duration-500 md:ease-out md:group-hover:grayscale-0 md:group-hover:scale-105"
      />
      
      <div
        className="absolute inset-0 opacity-100 lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100 flex flex-col justify-end p-3 lg:p-8"
        style={{
          background: `linear-gradient(to top, ${fromColor} 0%, ${midColor} 40%, transparent 100%)`,
        }}
      >
          <h3
            className={`${textColors.title} text-sm lg:text-2xl font-bold tracking-tight`}
          >
            {project.title}
          </h3>
          <p className={`${textColors.meta} text-xs lg:text-base font-light mt-0.5 lg:mt-1 hidden lg:block`}>
            {project.tech.slice(0, 3).join("  •  ")}
          </p>
          <p
            className={`${textColors.meta} text-xs lg:text-sm font-normal mt-1 lg:mt-3 max-w-xl leading-relaxed hidden lg:block`}
          >
            {project.description}
          </p>
      </div>
    </Link>
  );
}