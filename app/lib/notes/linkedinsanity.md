1. The Hook
Title
LinkedInsanity: Automated LinkedIn “Easy Apply” Job Application Engine
One-Liner
A desktop tool that logs into LinkedIn, discovers “Easy Apply” job postings, and auto-submits tailored applications at scale for job seekers.
My Role
Full Stack Developer (Electron + Node.js + Playwright)
Timeline
[4–6 weeks]
2. The Context
The Problem
Job seekers waste hours manually scrolling LinkedIn, opening each “Easy Apply” posting, filling out repetitive forms, and tracking where they’ve already applied. It’s tedious, error-prone, and difficult to do consistently at volume.
The Solution
This project automates that workflow end-to-end: it securely captures a logged-in LinkedIn session, crawls “Easy Apply” job listings, parses LinkedIn’s internal application forms, and programmatically submits applications while tracking which jobs have already been handled—all wrapped in an Electron desktop app for non-technical users.
3. Under the Hood (Technical Deep Dive)
The Stack
Node.js + Playwright: Used in the linkedinsanity-core package to control a Chromium browser, mimic real user behavior, and reliably navigate LinkedIn’s authenticated flows without reverse‑engineering the full front-end.
Electron + React + TypeScript: The linkedinsanity-client app provides a cross-platform desktop shell with a modern React UI and type-safe renderer, making the automation accessible as a one-click tool.
SQLite (via node:sqlite): Implemented in job_storage.js to persist job IDs and titles, preventing duplicate applications and enabling a minimal, embedded data store without external dependencies.
LinkedIn GraphQL/REST APIs: Leveraged in modules like form_spec.js, tracking_id.js, and easy_apply.js to fetch job card metadata, application forms, and submit applications using the same endpoints as the official UI.
The Challenge
The most complex piece of logic lives in fetch_job_ids_headless.js inside the iterate_jobs_headless function. The challenge was to safely and efficiently mass-apply to jobs while behaving like a human user and coordinating multiple moving parts:
Headless navigation & human-like behavior: Using Playwright’s chromium instance, the script logs into a stored LinkedIn session (via auth/auth.json), paginates through search results, and scrolls through job cards (JOB_CARD_SELECTOR) with randomized waits and mouse wheel movements to reduce bot-like patterns.
De-duplication and persistence: As each job card is discovered, it’s checked against an in-memory Set and the SQLite-backed job_ids table (job_id_exists / save_job_id in job_storage.js) to ensure the bot never re-applies to the same job.
Tracking ID resolution: For each new job, the code calls get_job_card_decorations and get_tracking_id from tracking_id.js, using a TrackingIdHelper map to correlate LinkedIn’s internal tracking IDs with job postings—an essential piece for valid “Easy Apply” submissions.
Dynamic form parsing & submission: Once a tracking ID is available, get_easy_apply_form in form_spec.js fetches the application form schema from LinkedIn’s GraphQL endpoint and parse_easy_apply_form_data maps each required field (text, multiple choice, phone, geo, date ranges) into a correctly shaped payload. Finally, easy_apply in easy_apply.js constructs the full request (including cookies, headers, tracking metadata, and resume upload URNs) and posts it to the official Easy Apply API.
Together, this pipeline turns what is normally a manual, multi-step UI process into an orchestrated headless workflow that can discover, validate, and apply to jobs in a loop, with safeguards against duplicates and request failures.
4. Retrospective (Code Review)
Lessons Learned
One thing done particularly well is the separation of concerns across small, focused modules: cookie acquisition (cookies.js), job search crawling (fetch_job_ids_headless.js), tracking metadata resolution (tracking_id.js), form interpretation (form_spec.js), application submission (easy_apply.js), and persistence (job_storage.js). This makes the automation pipeline easier to reason about and to extend (e.g., adding new filters or form field strategies).
Future Improvements
A clear next step would be to add stronger typing and configuration boundaries to the core automation package—for example, migrating the Node core to TypeScript, externalizing hard-coded personal data (email, phone, geo, resume URNs) from form_spec.js into user-configurable settings, and adding unit/integration tests around the form parsing and tracking ID logic to catch LinkedIn API changes early.