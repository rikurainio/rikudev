import { DATA } from "@/app/lib/data";

export const metadata = {
  title: "Hobbies | " + DATA.name,
  description: `Hobbies and interests of ${DATA.name}.`,
};

const hobbies = [
  "pokemon card collecting",
  "league of legends",
  "gym and calisthenics",
  "running",
];

export default function PersonalPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-600 font-sans selection:bg-emerald-500 selection:text-white">
      <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <section>
          <h1 className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-400">
            Hobbies
          </h1>
          <div className="divide-y divide-neutral-200">
            {hobbies.map((hobby) => (
              <div key={hobby} className="py-5">
                <h2 className="text-lg md:text-xl tracking-tight font-normal text-neutral-900 capitalize">
                  {hobby}
                </h2>
              </div>
            ))}
          </div>
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
