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
    <main className="min-h-screen selection:bg-white selection:text-black bg-stone-950 text-stone-400 font-sans overflow-x-hidden w-full">
      <div className="mx-auto px-4 md:px-6 min-[1920px]:px-20 min-[2300px]:px-60 py-12 md:py-24 max-w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <h2 className="text-5xl sm:text-6xl xl:text-7xl tracking-tighter text-white font-medium uppercase">
              Hobbies
            </h2>
          </div>

          <div className="grid gap-4 md:gap-6">
            {hobbies.map((hobby) => (
              <div 
                key={hobby} 
                className="group p-6 md:p-8 bg-stone-800 rounded-xl flex items-center gap-6 transition-all duration-300 hover:bg-stone-700"
              >
                <span className="h-2 w-2 rounded-full bg-stone-600 group-hover:bg-stone-400 transition-colors shrink-0" />
                <h3 className="text-2xl md:text-3xl text-white group-hover:text-stone-200 transition-colors tracking-tighter font-normal capitalize">
                  {hobby}
                </h3>
              </div>
            ))}
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
