import { DATA } from "@/app/lib/data";

export const metadata = {
  title: "Writing | " + DATA.name,
  description: "Writing and notes from " + DATA.name + ".",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen selection:bg-white selection:text-black bg-stone-950 text-stone-400 font-sans overflow-x-hidden w-full">
      <div className="mx-auto px-4 md:px-6 min-[1920px]:px-20 min-[2300px]:px-60 py-12 md:py-24 max-w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <h1 className="text-5xl sm:text-6xl xl:text-7xl tracking-tighter text-white font-medium uppercase">
              Writing
            </h1>
          </div>

          <div className="p-6 md:p-10 bg-stone-800 rounded-xl">
            <p className="text-lg md:text-xl text-stone-400 font-light leading-relaxed">
              Nothing published here yet. This space will hold longer-form notes when they are ready.
            </p>
          </div>
        </div>

        <footer className="mt-24 md:mt-32 pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
          <p className="text-sm font-medium text-stone-500 uppercase tracking-tight">
            {DATA.name} &copy; {new Date().getFullYear()}
          </p>

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
