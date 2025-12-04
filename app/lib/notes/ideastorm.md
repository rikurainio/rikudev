1. The Hook
Title: Ideastorm – AI-Validated SaaS Idea Database for Builders
One-Liner: Ideastorm is a Next.js SaaS platform that surfaces 10,000+ startup ideas, validates them with real-world market data and AI scoring, and presents them in an actionable dashboard for founders and indie hackers.
My Role: Full Stack Developer & Technical Architect
Timeline: ~6–8 weeks (from initial scaffolding to production-ready MVP)
2. The Context
The Problem
Builders and founders waste weeks brainstorming, validating, and discarding unproven ideas. They lack a single place where ideas are aggregated from real communities, enriched with market signals, and analyzed for difficulty, scalability, and revenue potential.
The Solution
Ideastorm continuously scrapes idea-rich sources (e.g., Reddit), runs each idea through an AI analysis pipeline to generate structured scores and metadata, stores this enriched dataset in PostgreSQL via Drizzle ORM, and then exposes it through a secure Next.js dashboard where users can explore, filter, and deep-dive into validated opportunities.
3. Under the Hood (Technical Deep Dive)
The Stack
Next.js (App Router): Powers the marketing site and authenticated dashboard (app/page.tsx, app/dashboard/page.tsx) with server components for data fetching and client components for rich UI/animation, ideal for a modern SaaS UX and SEO-friendly landing page.
React + Framer Motion: Used extensively for animated UI (e.g., hero sections and portfolio/test visuals in app/page.tsx and app/test/page.tsx), making complex data feel approachable and interactive without sacrificing performance.
PostgreSQL + Drizzle ORM: A typed schema layer in db/schema.ts models ideas, AI scores, and auth tables, enabling safe, composable queries (e.g., app/dashboard/page.tsx, app/dashboard/validation/page.tsx) with migrations managed via Drizzle tooling.
NextAuth + Drizzle Adapter: Centralized authentication in auth.ts and app/api/auth/[...nextauth]/route.ts with a Drizzle-backed adapter ensures secure, session-based access control to the ideas database.
OpenRouter (LLM API): The scraper subproject (scraper/src/ai.ts) integrates a language model to transform raw community posts into structured business intelligence fields like difficulty, market potential, SWOT, and Business Model Canvas.
The Challenge
Technical Challenge: Turning unstructured community posts into rich, structured, queryable idea records that the product UI can reliably depend on.
Raw Reddit posts are fetched and filtered in scraper/src/reddit.ts, then passed into the AI analysis layer in scraper/src/ai.ts.
The analyzeIdea function in scraper/src/ai.ts constructs a detailed, constrained prompt that instructs the model to return a strict JSON object covering:
Core description fields (title, description, niche, targetAudience)
Quantitative scores (difficultyScore, scalabilityScore, marketPotentialScore, ideaScore)
Structured strategy data (techStack, keywords, painPoints, competitors, marketingChannels, swotAnalysis, businessModelCanvas, mvpFeatures)
The function then:
Calls the OpenRouter chat API with a system prompt for “expert business analyst and technical architect.”
Defensively strips optional ```json fences before parsing, and returns null on failure to avoid breaking the ingestion pipeline.
How the Code Solves It (End-to-End):
The schema for ideas in db/schema.ts mirrors the AI output shape: integer scores, text explanations, and multiple jsonb fields (techStack, keywords, painPoints, competitors, mvpFeatures, swotAnalysis, businessModelCanvas, metadata, etc.), with an isAnalyzed flag to indicate completion.
The database layer (db/index.ts) wires PostgreSQL with Drizzle, providing a typed db instance that the dashboard pages consume.
The dashboard pages then query this structured data:
app/dashboard/page.tsx fetches the latest ideas via db.select().from(ideas).orderBy(desc(ideas.createdAt)).limit(50) and passes them to DashboardClient.
app/dashboard/validation/page.tsx filters for high-confidence ideas via gt(ideas.marketPotentialScore, 7) and sorts by marketPotentialScore, surfacing the strongest opportunities.
The idea detail experience in app/dashboard/idea/[id]/client.tsx (IdeaDetailClient) renders:
Animated radial charts for Difficulty, Scalability, and Demand scores using SVG + Framer Motion.
Rich AI narrative (complexityAnalysis, targetAudience, monetizationModel, estimatedCost, timeToMvp).
Clickable, visual chips for the recommended tech stack derived from jsonb fields.
Together, this pipeline creates a closed loop: scrape → AI structure → store → query → visualize.
4. Retrospective (Code Review)
Lessons Learned (What Went Well)
The data model in db/schema.ts is intentionally designed around the product’s analytical needs, not just raw content. By mapping AI output fields directly into typed columns and jsonb structures, the app can easily power multiple views (latest, validated, detailed breakdown) without additional transformation layers. The separation of concerns between scraping (scraper/src/*), persistence (db/*), and presentation (app/dashboard/*) makes the architecture extensible and maintainable.
Future Improvements
Introduce stronger runtime validation and typing around AI responses (e.g., Zod schemas in the scraper pipeline) to avoid parse-time failures in scraper/src/ai.ts, and add automated tests for the end-to-end ingestion flow (scrape → analyze → insert → dashboard query). Additionally, expanding filtering, search, and user-driven saved-idea features (building on savedIdeas in db/schema.ts) would turn the dataset into a more personalized discovery experience.