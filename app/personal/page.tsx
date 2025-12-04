import Link from 'next/link'
import { DATA } from '@/app/lib/data'
import { CopyButton } from '@/app/components/copy'

export const metadata = {
  title: 'About Me | ' + DATA.name,
  description: `About ${DATA.name} - ${DATA.role}`,
}

export default function PersonalPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Back Link */}
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>

        {/* Header */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            About Me
          </h1>
          <p className="text-xl text-zinc-600 font-light">
            {DATA.about}
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Hello, I'm {DATA.name.split(' ')[0]}</h2>
            <div className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed">
              <p>
                I'm a {DATA.role.toLowerCase()} passionate about building great software and solving complex problems.
                I love working with modern web technologies and creating applications that make a difference.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open source projects,
                or sharing knowledge with the developer community.
              </p>
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-2xl font-bold mb-8">Experience</h2>
            <div className="space-y-8">
              {DATA.jobs.map((job) => (
                <div
                  key={job.company}
                  className="border-l-2 border-zinc-200 pl-6"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-900">
                        {job.role}
                      </h3>
                      <p className="text-lg text-zinc-600">
                        {job.company}
                      </p>
                    </div>
                    <span className="text-sm text-zinc-500 font-mono tabular-nums">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-zinc-600 leading-relaxed mt-2">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold mb-8">Education</h2>
            <div className="space-y-6">
              {DATA.education.map((edu) => (
                <div
                  key={`${edu.institution}-${edu.degree}`}
                  className="border-l-2 border-zinc-200 pl-6"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-900">
                        {edu.institution}
                      </h3>
                      <p className="text-lg text-zinc-600">
                        {edu.degree}
                      </p>
                    </div>
                    <span className="text-sm text-zinc-500 font-mono tabular-nums">
                      {edu.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {DATA.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100 transition-colors"
                  title={skill.category}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-zinc-600 mb-6 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="flex flex-wrap gap-4">
              {Object.entries(DATA.links).map(([key, url]) => {
                const isEmail = url.startsWith('mailto:') || key.toLowerCase() === 'email'

                if (isEmail) {
                  const emailAddress = url.replace(/^mailto:/, '')
                  return (
                    <CopyButton
                      key={key}
                      text={emailAddress}
                      contentName="Email address"
                      className="text-base font-medium text-zinc-900 border-b border-zinc-900 pb-0.5 hover:opacity-70 transition-opacity capitalize"
                    >
                      {key}
                    </CopyButton>
                  )
                }

                return (
                  <a
                    key={key}
                    href={url}
                    target={url.startsWith('http') ? '_blank' : undefined}
                    rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-base font-medium text-zinc-900 border-b border-zinc-900 pb-0.5 hover:opacity-70 transition-opacity capitalize"
                  >
                    {key}
                  </a>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

 