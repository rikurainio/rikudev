import Link from "next/link";
import { DATA } from "@/app/lib/data"; // Adjust path as needed based on your project structure

export const metadata = {
  title: "Gym & League | " + DATA.name,
  description: `Gym and League of Legends page for ${DATA.name}.`,
};

const gymBlocks = {
  focus: ["Calisthenics", "Strength training", "Cardio"],
  split: [
    { day: "Day 1", title: "Push", notes: "push stuff" },
    { day: "Day 2", title: "Calisthenics skills", notes: "front lever / planche" },
    { day: "Day 3", title: "Legs", notes: "use legs" },
    { day: "Day 4", title: "Calisthenics skills", notes: "front lever / planche" },
  ],
  goals: [
    "Front lever hold",
    "4 plates bench press",
    "Improve cardio & flexibility",
    "Strengthen weak points",
  ],
};

const leagueBlocks = {
  role: "Jungle enjoyer",
  style: "",
  champs: ["Lee Sin", "Viego", "Nidalee", "Xin Zhao", "Vi"],
  goals: [
    "Get more consistent early games.",
    "Play less champions.",
  ],
};

const animeList = [
  "Attack on Titan",
  "Vinland Saga",
  "Death Note",
  "Demon Slayer",
  "Chainsaw Man",
];

const animeStillWatching = ["Monster", "Jujutsu Kaisen"];

export default function PersonalPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Responsive two-column layout */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* --- LEFT COLUMN (Header & Nav) --- */}
        <header className="lg:col-span-5 flex flex-col gap-10 py-12 md:py-20 lg:py-24 animate-in fade-in slide-in-from-left-4 duration-700">
          
          {/* Identity */}
          <div className="flex flex-col gap-6">
            <Link 
                href="/" 
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors w-fit group"
            >
                <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> Back to home
            </Link>

            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 mb-6">
                Other stuff
              </h1>
              <p className="text-xl text-zinc-600 leading-relaxed font-light">
                What I do when I&apos;m not writing code. 
              </p>
            </div>
          </div>

          {/* Quick Nav / Table of Contents equivalent */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-2">
              Contents
            </h2>
            <ul className="flex flex-col gap-2 text-sm text-zinc-500 font-medium">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-zinc-300"></span> Gym & Calisthenics
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-zinc-300"></span> League of Legends
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-zinc-300"></span> Anime
              </li>
            </ul>
          </div>
        </header>

        {/* --- RIGHT COLUMN (Content Blocks) --- */}
        <section className="lg:col-span-6 lg:col-start-7 py-12 md:py-20 lg:py-24 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards">
          
          {/* GYM SECTION */}
          <div className="flex flex-col gap-8">
            <div className="border-b border-zinc-100 pb-4">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">
                Gym & Calisthenics
              </h2>
            </div>

            {/* Weekly Split */}
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-zinc-900">Weekly Split</h3>
                <span className="text-xs font-mono text-zinc-400">3–4x / week</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gymBlocks.split.map((day) => (
                  <div key={day.day} className="bg-zinc-50/50 group flex flex-col p-4 rounded-xl border border-zinc-100 transition-colors">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">{day.day}</span>
                    <span className="font-medium text-zinc-900">{day.title}</span>
                    <span className="text-sm text-zinc-500 font-light mt-1">{day.notes}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-4">Current Goals</h3>
              <ul className="space-y-3">
                {gymBlocks.goals.map((goal) => (
                  <li key={goal} className="flex gap-3 text-zinc-600 font-light">
                    <span className="mt-2 h-1.5 w-1.5 min-w-[6px] rounded-full bg-zinc-300" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* LEAGUE SECTION */}
          <div className="flex flex-col gap-8">
            <div className="border-b border-zinc-100 pb-4">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">
                League of Legends
              </h2>
            </div>

            {/* Role & Style */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold text-zinc-900">{leagueBlocks.role}</h3>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Solo Queue</span>
              </div>
            </div>

            {/* Champs */}
            <div className="space-y-3">
               <h3 className="text-sm font-medium text-zinc-900">Champion Pool</h3>
               <div className="flex flex-wrap gap-2">
                {leagueBlocks.champs.map((champ) => (
                  <span
                    key={champ}
                    className="inline-flex items-center rounded-md border border-zinc-100 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600"
                  >
                    {champ}
                  </span>
                ))}
              </div>
            </div>

            {/* Ranked Goals */}
            <div className="p-5 rounded-2xl bg-zinc-50/50 border border-zinc-100">
               <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4">Ranked Goals</h3>
               <ul className="space-y-2">
                {leagueBlocks.goals.map((goal) => (
                  <li key={goal} className="flex gap-3 text-sm text-zinc-600">
                    <span className="text-zinc-300">—</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
            
             {/* Coaching / Misc */}
             <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold text-zinc-900">
                   Coaching
                </h3>
                <p className="text-base text-zinc-500 font-light">
                    Available for players below Master tier.
                </p>
            </div>

             {/* Placeholder Section */}
             <div className="rounded-xl border border-dashed border-zinc-200 p-6 text-center">
               <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
                 Future Integration
               </p>
               <p className="text-sm text-zinc-500 font-light">
                 Live stats or match history module coming soon.
               </p>
             </div>

          </div>

          {/* ANIME SECTION */}
          <div className="flex flex-col gap-8">
            <div className="border-b border-zinc-100 pb-4">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">
                Anime
              </h2>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-900">Watched</h3>
              <div className="flex flex-wrap gap-2">
                {animeList.map((anime) => (
                  <span
                    key={anime}
                    className="inline-flex items-center rounded-md border border-zinc-100 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600"
                  >
                    {anime}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-900">Watching</h3>
              <div className="flex flex-wrap gap-2">
                {animeStillWatching.map((anime) => (
                  <span
                    key={anime}
                    className="inline-flex items-center rounded-md border border-zinc-100 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600"
                  >
                    {anime}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}