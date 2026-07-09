import { DATA } from "@/app/lib/data";

export const metadata = {
  title: "Writing | " + DATA.name,
  description: "Writing and notes from " + DATA.name + ".",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-600 font-sans selection:bg-emerald-500 selection:text-white">
      <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <section>
          <h1 className="mb-6 text-xs uppercase tracking-[0.2em] text-neutral-400">
            Writing
          </h1>
          <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-500">
            Nothing published here yet. This space will hold longer-form notes
            when they are ready.
          </p>
        </section>

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
