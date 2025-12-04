1. The Hook
Title: Drafter.lol – Real-Time League of Legends Drafting & Analytics Platform
One-Liner: Drafter.lol is a real-time drafting and analytics tool for League of Legends teams, coaches, and broadcasters to run professional-style drafts and analyze pick/ban data.
My Role: Full Stack Developer (Next.js, Socket.IO, Database, DevOps)
Timeline: ~8–10 weeks (from initial architecture to production-ready deployment)
2. The Context
The Problem
Coaches, teams, and content creators often run League of Legends drafts using ad‑hoc tools (spreadsheets, basic lobbies, or screen-sharing) that don’t support structured pick/ban flows, custom formats (like Fearless), or post-game analytics. This makes it hard to practice drafts, review decisions, and share a polished experience with teams or audiences.
The Solution
Drafter.lol provides a dedicated web platform where users can create draft “rooms,” configure series formats (including Fearless best-of series), run drafts in real time with multiple participants, and later analyze the resulting data via dashboards and custom queries. A Next.js front end handles the UI and routes, while a separate Socket.IO service manages real-time state for rooms and users, backed by a shared database for persistent drafts and analytics.
3. Under the Hood (Technical Deep Dive)
The Stack
Next.js 15 + React 19 (apps/next-app): Used for the main web application to deliver a fast, SEO‑friendly, app‑router–based UI, including pages like the home room-creation flow (src/app/page.tsx) and analytics views.
Socket.IO + Express (apps/socketio-app/src/server.ts): Powers low-latency, bidirectional communication for draft rooms, handling user connections, team assignments, draft events, and monitoring namespaces.
PostgreSQL + Drizzle ORM (packages/database): Central relational data store for drafts, users, and analytics, with a typed schema and utility functions such as customDraftQuery and getDraftGraphsData used in API routes.
Redis + Upstash Ratelimit (apps/next-app/src/lib/redis.ts usage): Provides efficient, external rate limiting for sensitive endpoints (e.g., custom draft queries) to prevent abuse while keeping latency low.
Auth & Payments (Better Auth, OAuth, Polar, UploadThing): Better Auth manages user sessions and tiers (used to gate high-cost features), while Polar and UploadThing integrate monetization and file upload flows into the app.
The Challenge – Real-Time, Multi-Role Draft Rooms
One of the core technical challenges was building a robust real-time drafting system that supports many concurrent rooms, multiple user roles, and strict control over who can perform actions, all while remaining observable and secure. This logic is orchestrated in apps/socketio-app/src/server.ts.
From that file, the system:
Defines multiple Socket.IO namespaces:
/guest for regular participants.
/pro for API-token–authenticated clients (e.g., premium or automation tools).
/monitor for an authenticated monitoring dashboard.
Implements origin and token validation:
The guest namespace validates the Origin header against the configured Next.js URL before allowing a connection, rejecting invalid origins with clear logs.
The pro namespace uses getUserApiToken (from the shared database package) to validate API tokens via socket.handshake.auth.token, ensuring only authorized clients can join professional sessions.
Manages room and user lifecycle:
A central RoomHandler instance coordinates room creation, user addition/removal, and access to per-room draftHandler and stateHandler.
On "join-room" in the guest namespace, the server validates the room ID, creates the room if needed, adds the user, joins them to the appropriate Socket.IO room, and sends initial state via stateHandler.getInitialState(currentUser).
On disconnect or room changes, the server calls roomHandler.deleteUserFromRoom and ensures the user leaves the previous room cleanly, preventing “ghost users” and memory bloat.
Enforces role-specific actions and safety checks:
Events like "change-team", "change-position", "draft-choice", and "draft-choice-lock" all:
Validate that a room exists.
Validate that the current user is initialized.
Sanitize and validate payloads (e.g., allowing only "blueDrafter" | "redDrafter" | "spectator" for positions).
This prevents invalid states and provides detailed logs prefixed by origin (e.g., "Guest Socket", "Pro Socket") to simplify debugging.
Provides observability via the monitor namespace:
An authenticated monitor connection (socket.handshake.auth.token must equal "ISDRAFTERDOWNXD") can emit "get-data" to receive:
A summary of rooms and connected users.
Whether drafts in each room have started.
Global user counts and current server RAM usage.
This makes it possible to track health and capacity of the real-time system without impacting the main user experience.
Together, this design solves the complexity of real-time, multi-user drafts by centralizing room logic in RoomHandler, enforcing strict validation at each event, and exposing a monitoring channel for operational visibility.
Additional Example – Tiered, Rate-Limited Custom Queries
Another notable challenge is safely exposing powerful analytics queries. In apps/next-app/src/app/api/draft/route.ts, the POST handler:
Fetches the current session via getServerSideSession and verifies that the user is authenticated and their tier is within VALID_TIERS.
Applies a per-user rate limit (50 requests per 24 hours) using rateLimiter("custom-query:${userId}", LIMIT, 24 * 60 * 60), and returns a structured error (429) with the remaining quota if exceeded.
Calls customDraftQuery (from the shared database package) only when the above checks pass, returning the selected drafts along with the remaining limit.
This combination of auth, tier-based access control, and rate limiting allows advanced analytics features while protecting the database and keeping the overall system fair and performant.
4. Retrospective (Code Review)
Lessons Learned (What Went Well)
Separation of Concerns via Monorepo: Splitting the system into a Next.js app, a Socket.IO app, and a shared database package (all coordinated by Turborepo) keeps responsibilities clear, encourages reuse (e.g., database types and actions shared across services), and makes it straightforward to scale or deploy services independently.
Defensive, Explicit Event Handling: The Socket.IO server and API routes consistently validate input, check authentication/authorization, and log meaningful messages, which significantly reduces the risk of invalid states and simplifies debugging in a real-time environment.
Future Improvements (Where to Grow Next)
Stricter Typing and Shared Contracts: While TypeScript is used, some areas (e.g., any in customDraftQuery mapping, newQuery: any in useLocalStorageQueries) could benefit from stronger, shared types or Zod schemas to enforce contracts between front end, Socket.IO events, and database actions.
Automated Testing & Monitoring: Adding unit/integration tests around critical flows (room lifecycle, draft events, and rate-limited APIs), along with more structured production logging and metrics (beyond the existing /monitor namespace), would further harden the platform as usage scales.