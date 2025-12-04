import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { DATA } from "../../lib/data";

const PROJECT_DETAILS: Record<string, ReactNode> = {
  "drafter-lol": (
    <div className="space-y-8 text-sm leading-relaxed font-sans text-zinc-800">
      <section className="space-y-2">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900">
          Overview
        </h2>
        <p>
          Drafter.lol is a real-time drafting and analytics platform for League of
          Legends teams, coaches, and broadcasters. It lets you run professional
          pick/ban drafts, support formats like Fearless, and then review the results
          with structured analytics instead of screenshots and spreadsheets.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          My role & scope
        </h3>
        <p>
          I owned the full stack: Next.js app router front end, a dedicated Socket.IO
          real-time service, the database schema and queries, and the deployment story.
          The project went from scratch to a production-ready draft tool in roughly 8–10
          weeks.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Under the hood
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Next.js 15 + React 19</span> for the main web
            app, using the app router for SEO-friendly marketing pages and
            room/analytics views.
          </li>
          <li>
            <span className="font-medium">Socket.IO + Express</span> in a separate
            service to handle low-latency draft rooms, user connections and event
            streams.
          </li>
          <li>
            <span className="font-medium">PostgreSQL + Drizzle</span> as the shared
            relational store for drafts, users and analytics queries.
          </li>
          <li>
            <span className="font-medium">Redis + rate limiting</span> to protect custom
            analytics endpoints, especially expensive, ad‑hoc queries.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Interesting challenges
        </h3>
        <p>
          The hardest part was getting real-time rooms to feel rock solid under many
          concurrent users: handling reconnects, enforcing who can draft, and keeping
          room state consistent between the Socket.IO layer and the database. I designed
          a dedicated room handler that owns lifecycle and validation logic, plus a
          monitoring namespace that exposes live room stats and memory usage for ops.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          What I’d improve next
        </h3>
        <p>
          The next step would be adding stronger end-to-end typing between the front
          end, Socket.IO events and database layer, plus automated tests around the
          critical flows: room lifecycle, draft events, and rate‑limited analytics APIs.
        </p>
      </section>
    </div>
  ),
  ideastorm: (
    <div className="space-y-8 text-sm leading-relaxed font-sans text-zinc-800">
      <section className="space-y-2">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900">
          Overview
        </h2>
        <p>
          Ideastorm is a SaaS platform for builders and founders who want a steady
          stream of validated startup ideas. It aggregates idea-rich content, enriches
          it with AI, and exposes everything through a searchable dashboard instead of
          forcing users to scrape Reddit threads by hand.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          My role & scope
        </h3>
        <p>
          I acted as full stack developer and technical architect, taking the project
          from initial scaffolding to a production-ready MVP in roughly 6–8 weeks. That
          included the Next.js app, the database schema, and the AI ingestion pipeline.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Under the hood
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Next.js (app router)</span> for the marketing
            site and authenticated dashboard, mixing server components for data fetching
            with client components for rich UI and animation.
          </li>
          <li>
            <span className="font-medium">PostgreSQL + Drizzle ORM</span> to model
            ideas, scores and metadata as typed schemas with jsonb fields for structured
            AI output.
          </li>
          <li>
            <span className="font-medium">NextAuth + Drizzle adapter</span> to secure
            the dashboard and keep sessions tied to the same schema the analytics uses.
          </li>
          <li>
            <span className="font-medium">OpenRouter LLM API</span> in a separate
            scraper project that turns raw community posts into structured business
            intelligence (scores, SWOT, suggested tech stack, MVP features, and more).
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Interesting challenges
        </h3>
        <p>
          The main challenge was getting from messy, unstructured posts to a schema the
          product can trust. I designed a constrained JSON output format, defensive
          parsing around the LLM responses, and a schema in Drizzle that maps 1:1 to the
          analysis result. That lets the dashboard slice ideas by difficulty, market
          potential or niche without bolting on extra transformation layers.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          What I’d improve next
        </h3>
        <p>
          I’d add stronger runtime validation (e.g. Zod) around AI responses in the
          ingestion pipeline, plus integration tests that cover the whole flow: scrape →
          analyze → insert → dashboard query. On the product side, richer filtering and
          saved-idea features would turn the dataset into a more personal discovery
          tool.
        </p>
      </section>
    </div>
  ),
  mennaa: (
    <div className="space-y-8 text-sm leading-relaxed font-sans text-zinc-800">
      <section className="space-y-2">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900">
          Overview
        </h2>
        <p>
          mennää.exe started as a small Godot experiment, not an attempt to become a
          game developer or launch a polished indie title. The real goal was to build
          something end‑to‑end in Godot, ship it, and learn by doing — treating the
          project as a full lifecycle exercise rather than a portfolio showpiece.
        </p>
        <p>
          The game grew from a simple prototype into a finished, coherent experience,
          and along the way it taught me a lot about structure, iteration and how to
          keep even a tiny project from turning into spaghetti.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Download
        </h3>
        <p>
          <a
            href="https://drive.google.com/file/d/1O0ektc_0tjkeyghO7lGYMpI8UhmLWCwM/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-900 border-b border-zinc-900 pb-0.5 hover:opacity-70 transition-opacity"
          >
            Download mennää.exe
          </a>
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Getting started with Godot
        </h3>
        <p>
          Godot was appealing because it removes friction: you can open the engine, drop
          a few nodes into a scene, write a short script and see results immediately.
          That tight feedback loop kept me building instead of over‑planning. I started
          with a basic prototype focused on movement and interaction, and only once it
          felt fun to control did I begin layering in more mechanics.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Scenes, nodes & modular structure
        </h3>
        <p>
          One of the biggest design decisions (which Godot naturally nudges you
          towards) was breaking the game into many small, independent scenes. Instead of
          a single giant script controlling everything, each piece — player, enemies,
          interactions, UI — owns its own logic.
        </p>
        <p>
          That structure made iteration fast and safe: if a mechanic felt off, I could
          tweak just that scene without worrying about side effects elsewhere. It kept
          the project maintainable and was a good reminder that clean architecture isn&apos;t
          just for big systems.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Building the core gameplay
        </h3>
        <p>
          I focused early on making the player feel responsive. Even simple mechanics
          feel much better when input is snappy and movement is predictable, so I spent
          time tuning acceleration, speed, friction and timing in code. Godot&apos;s
          scripting made it easy to iterate quickly on the &quot;feel&quot; of movement and
          interaction.
        </p>
        <p>
          Once that felt right, I layered in small interactions, reactions and simple
          enemy logic. Rather than designing complex systems, I stuck to straightforward
          condition checks and short scripts — clarity over cleverness. Often the
          simplest version of a mechanic ended up being the best one.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Adding polish
        </h3>
        <p>
          With the basic loop working, I spent time on polish: small animations, short
          effects and subtle feedback cues that make the game more readable and more
          satisfying to play. None of these were huge features, but together they pushed
          the project from &quot;prototype&quot; to &quot;finished&quot;.
        </p>
        <p>
          It reinforced an important lesson: polish isn&apos;t just a final coat of paint at
          the end of a project. It&apos;s part of how you communicate with the player, and
          in many cases small details matter more than big new systems.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          What I learned
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Finishing something small is more valuable than sketching something big.</li>
          <li>If your architecture is clean, iteration becomes effortless.</li>
          <li>Visual debugging forces you to understand your own logic better.</li>
          <li>Cutting features is a skill.</li>
          <li>Shipping builds confidence.</li>
        </ul>
        <p>
          More than anything, mennää.exe was practice for the full lifecycle: idea,
          design, implementation, iteration and release. That end‑to‑end process made me
          sharper in ways tutorials don&apos;t, and the same habits carry directly into my
          professional work.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Why it&apos;s in my portfolio
        </h3>
        <p>
          It&apos;s a small project, and that&apos;s exactly why it matters. It shows that I can
          pick up a new tool, understand it quickly, build something coherent and
          actually finish it. The mindset behind mennää.exe — simple foundation, fast
          iterations, constant refinement — is the same way I approach larger software
          projects.
        </p>
      </section>
    </div>
  ),
  linkedinsanity: (
    <div className="space-y-8 text-sm leading-relaxed font-sans text-zinc-800">
      <section className="space-y-2">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900">
          Overview
        </h2>
        <p>
          LinkedInsanity is a desktop automation tool that helps job seekers apply to
          large numbers of LinkedIn “Easy Apply” jobs without manually clicking through
          each form. It wraps a fairly sophisticated browser automation core in a UI
          that non‑technical users can actually run.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          My role & scope
        </h3>
        <p>
          I built both sides: the Node.js + Playwright automation core and the Electron
          + React client. The project took around 4–6 weeks from initial spike to a
          working tool that can log in, discover jobs, and submit applications at scale.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Under the hood
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Node.js + Playwright</span> to control a real
            Chromium instance, navigate LinkedIn, and behave like a human: scrolling,
            waiting, and interacting with job cards.
          </li>
          <li>
            <span className="font-medium">Electron + React + TypeScript</span> to ship a
            cross‑platform desktop app that wraps the automation in a friendly UI.
          </li>
          <li>
            <span className="font-medium">SQLite</span> for lightweight persistence of
            job IDs and application history, making sure the tool never re‑applies to
            the same position twice.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Interesting challenges
        </h3>
        <p>
          The hardest problem was orchestrating the full “discover → parse form →
          submit” loop safely. I split the core into focused modules: fetching job
          cards, resolving LinkedIn tracking IDs, interpreting dynamic application
          forms, and finally constructing the exact payloads LinkedIn expects. That
          separation makes it much easier to adapt when LinkedIn changes a single piece
          of the flow.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          What I’d improve next
        </h3>
        <p>
          Longer term, I’d migrate the Node core to TypeScript, move all user data into
          a proper configuration layer, and add tests around the form‑parsing and
          tracking‑ID logic to catch LinkedIn changes early.
        </p>
      </section>
    </div>
  ),
  "sasken-cv-database": (
    <div className="space-y-8 text-sm leading-relaxed font-sans text-zinc-800">
      <section className="space-y-2">
        <h2 className="text-base font-semibold tracking-tight text-zinc-900">
          Overview
        </h2>
        <p>
          The Sasken CV Database is an internal web platform for managing employee CVs,
          skills and project history in one place. It gives HR, managers and sales a
          live view of the company’s talent instead of chasing outdated documents and
          spreadsheets.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          My role & scope
        </h3>
        <p>
          I worked as a full‑stack developer on a React + TypeScript + Django REST
          codebase, focusing on both the front‑end experience and backend services that
          power search, analytics and automated reminders.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Under the hood
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">React + TypeScript</span> (with modern
            tooling) for a fast, type‑safe SPA with role‑aware navigation and route
            guards.
          </li>
          <li>
            <span className="font-medium">Django + Django REST Framework</span> split
            into focused apps for employees, experience, statistics and reminders.
          </li>
          <li>
            <span className="font-medium">PostgreSQL + Celery</span> for relational data
            and background jobs that send reminder emails and keep profiles up to date.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          Interesting challenges
        </h3>
        <p>
          A big challenge was coordinating authentication, permissions and route
          protection without hurting UX. On the front end we use a global auth store and
          a root route guard that initializes the user once, redirects unauthenticated
          users to login, and wires role‑based permissions into the UI. On the backend,
          dedicated statistics and reminder services compute things like skills
          distribution and which employees need nudges to update their CVs.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
          What I’d improve next
        </h3>
        <p>
          I’d like to push the shared contracts between frontend and backend further
          using stricter typing and DTO‑style interfaces, and extend the existing test
          suite around analytics filters, reminder selection logic and the
          auth/permissions bootstrap.
        </p>
      </section>
    </div>
  ),
};

export async function generateStaticParams() {
  return DATA.projects.map((project) => ({
    slug: project.slug,
  }));
}

export const dynamicParams = true;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const project = DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const details = PROJECT_DETAILS[slug];

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 md:py-32 bg-white text-zinc-900">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 mb-12 transition-colors font-sans"
      >
        <span className="mr-2">←</span>
        Back to portfolio
      </Link>

      {/* Project Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold tracking-tighter mb-4 font-sans">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-sm text-zinc-900 border-b border-zinc-300 pb-0.5 font-mono"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* Project Image */}
      <div className="mb-12 aspect-video bg-zinc-100 overflow-hidden rounded-2xl border border-zinc-200">
        <img
          src={`/${project.image}`}
          alt={`Preview of ${project.title}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Short description */}
      <section className="mb-10">
        <p className="text-lg leading-relaxed max-w-2xl font-sans text-zinc-800">
          {project.description}
        </p>
      </section>

      {/* Detailed write-up (if available) */}
      {details && <section className="mb-12">{details}</section>}

      {/* External Link */}
      {project.link && (
        <section className="mt-4">
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-zinc-900 pb-0.5 transition-colors hover:underline underline-offset-4 decoration-zinc-900 font-sans"
          >
            View project
            <span className="ml-2">→</span>
          </Link>
        </section>
      )}
    </main>
  );
}

