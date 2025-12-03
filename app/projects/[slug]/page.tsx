import Link from "next/link";
import { DATA } from "../../lib/data";
import { notFound } from "next/navigation";

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

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 md:py-32 font-mono text-zinc-900 bg-white">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 mb-12 transition-colors"
      >
        <span className="mr-2">←</span>
        Back to portfolio
      </Link>

      {/* Project Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold tracking-tighter mb-4">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-sm text-zinc-900 border-b border-zinc-300 pb-0.5"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* Project Image */}
      <div className="mb-12 aspect-video bg-zinc-100 overflow-hidden">
        <img
          src={project.image}
          alt={`Preview of ${project.title}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Project Description */}
      <section className="mb-12">
        <p className="text-lg text-zinc-900 leading-relaxed max-w-2xl">
          {project.description}
        </p>
      </section>

      {/* External Link */}
      {project.link && (
        <section className="mb-12">
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-zinc-900 pb-0.5 transition-colors hover:underline underline-offset-4 decoration-zinc-900"
          >
            View project
            <span className="ml-2">→</span>
          </Link>
        </section>
      )}
    </main>
  );
}

