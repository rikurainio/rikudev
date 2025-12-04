1. The Hook
Title: CVApp – Centralized CV Management and Skills Intelligence for Engineering Teams
One-Liner: CVApp is an internal web platform that centralizes employees’ CVs, skills, and project history to give HR, managers, and sales a real-time view of talent across the organization.
My Role: Full Stack Developer (React + TypeScript + Django REST)
Timeline: [Insert 8–12 Weeks]
2. The Context
The Problem
In many engineering organizations, employee CVs live in scattered documents, outdated spreadsheets, or personal files. HR and sales teams struggle to answer simple questions like “Who has experience with this tool?”, “Which teams have gaps in key skills?”, or “Whose CV is out of date?” Managers lack visibility into their team’s experience, and employees are rarely nudged to keep their profiles accurate and complete. This leads to lost opportunities, slower staffing decisions, and inconsistent client-facing CVs.
The Solution
CVApp provides a centralized system where employee profiles, education, work experience, skills, tools, and projects are managed in one place. A React + TypeScript frontend backed by a Django REST API gives different roles (HR, managers, employees) secure access to update and search CV data, while analytics endpoints surface statistics like skills distribution and CV completeness. Automated reminder logic and background tasks proactively notify employees to update incomplete or outdated profiles, ensuring data quality without manual chasing from HR.
3. Under the Hood (Technical Deep Dive)
The Stack
React + TypeScript (Vite): The frontend (frontend/src/main.tsx) is built with React 19 and TypeScript, providing a fast, type-safe SPA experience with modern tooling and hot module reload via Vite.
TanStack Router: Routing is handled by @tanstack/react-router (frontend/src/main.tsx, frontend/src/routes/__root.tsx), chosen for its type-safe, file-based routing, nested layouts, and first-class support for data-aware route lifecycle hooks like beforeLoad.
Zustand: Global state such as authentication and permissions is managed with Zustand (frontend/src/stores/auth.ts, frontend/src/stores/permissions.ts), providing a minimalistic, boilerplate-free alternative to heavier state management libraries while remaining easy to test and reason about.
Django + Django REST Framework: The backend (backend/core/settings.py, backend/apps/*) uses Django and DRF for a robust, scalable API layer with built-in admin, authentication, and ORM support; this enables complex querying and aggregation over employees, experience, and statistics with clear separation into apps like employee, experience, statistics, and reminders.
PostgreSQL + Celery: PostgreSQL (configured in backend/core/settings.py) is used for relational data consistency around employees, skills, and projects, while Celery tasks in apps like employee and reminders handle scheduled emails and change notifications without blocking API traffic.
The Challenge – Coordinated Auth, Permissions, and Route Protection
A key technical challenge in CVApp is ensuring that only authenticated users with the right role-based permissions can access specific routes and actions, while keeping the UX smooth and avoiding unnecessary API calls.
On the frontend, this is handled centrally in the root TanStack Router route (frontend/src/routes/__root.tsx) and the authentication store (frontend/src/stores/auth.ts):
The RootLayout component uses the useAuthStore state to decide when to show the main navigation and content:
__root.tsx loads global CSS, renders an AppNavbar only when a user is present, and wraps everything in an Outlet so child routes render under a shared layout.
A dedicated NotFound component is registered at the root route level to gracefully handle unknown URLs.
The beforeLoad hook in the root route coordinates one-time authentication initialization and routing:
On every app load, beforeLoad calls useAuthStore.getState().init() exactly once per session to fetch the current user profile from the backend (fetchProfile) and populate the store.
If no authenticated user is found and the user is not on the login route (ROUTES.LOGIN), beforeLoad throws a redirect to send the user to the login page, guaranteeing that protected routes are never rendered anonymously.
This logic keeps the routing layer declarative while enforcing authentication at the very top of the route tree.
The useAuthStore itself (frontend/src/stores/auth.ts) encapsulates the complexity of loading the current user and synchronizing permissions:
On successful initialization, the store stores the AuthUser object, marks isInitialized, and derives the user’s primary role (defaulting to "employee").
It then triggers the permission store’s fetchPermissionsByRole(primaryRole), pulling role-based permissions once and caching them locally.
If the profile request fails with 401/403, or returns no user, the store resets the user to null and clears permissions, handling error states gracefully without leaking backend details into UI components.
The store exposes hasPermission and can helpers that simply delegate to the permission store’s hasPermission, enabling components and routes to enforce fine-grained authorization checks through a single, simple interface.
On the backend, the statistics and reminders systems provide deeper examples of high-level problem solving:
backend/apps/statistics/apis.py defines a generic StatisticsBaseApi and StatisticsListApi that:
Interpret query parameters like scope (company vs. team), start_date, and end_date, parsing and validating them in reusable helpers (get_scope_and_manager, get_date_range).
Dynamically constrain what managers can see by forcing scope="team" for users with the MANAGER role and automatically deriving the manager’s user ID.
Implement a generic get_stats() abstraction that downstream analytics endpoints override, while get_queryset wraps arbitrary list-like results into something DRF’s pagination and serialization can handle.
Concrete analytics endpoints like EmployeesPerTechnologyApi, TotalExperienceByTechnologyApi, and SkillsDistributionApi then:
Call dedicated selector functions (e.g. get_employees_per_technology, get_total_experience_by_technology, get_skills_distribution) with the computed scope and date filters.
Apply optional query-parameter-based filtering and ordering (e.g. by name, employee_count, or percentage) to support rich dashboard views without changing the underlying SQL or ORM logic.
backend/apps/reminders/services.py complements this by computing which employees should be notified:
_get_last_update_for_employee inspects both Employee and related WorkExp records to find the latest updated_at, ensuring “last updated” truly reflects any profile or experience change.
_is_profile_complete encodes business rules for what “complete” means (bio, skills description, and at least one work experience) in a single place.
get_matching_employees_for_reminder then ties it all together: it loads only active employees, prefetches their work experiences, computes how many days have passed since the last update, and classifies them based on the reminder mode (INCOMPLETE, NOT_UPDATED, or BOTH), generating a ReminderPreviewEmployee dataclass containing IDs, names, status, and human-readable match reasons.
Together, these pieces form a cohesive system: the frontend uses TanStack Router and Zustand to guard routes and hydrate user/permission state, while the backend provides role-aware statistics and reminder services that keep CV data fresh and actionable. Referencing concrete files: frontend/src/routes/__root.tsx, frontend/src/stores/auth.ts, backend/apps/statistics/apis.py, and backend/apps/reminders/services.py.
4. Retrospective (Code Review)
Lessons Learned (What Went Well)
Modular Architecture & Clear Boundaries: The project is structured as a monorepo with a clean separation between backend/ (Django apps like employee, experience, statistics, reminders) and frontend/ (React + Vite). Within Django, functionality is further decomposed into apps with apis.py, selectors.py, services.py, and filters.py, which cleanly separate API concerns from business logic and querying. On the frontend, global concerns like routing and auth are centralized in routes/__root.tsx, routeTree.gen.ts, and the Zustand stores, making the codebase easier to extend and reason about.
Future Improvements (What I’d Do Next)
Stricter Typing, Contracts, and Testing Around Cross-Cutting Logic: While the structure is solid, there’s an opportunity to add stricter TypeScript types and shared DTO-like interfaces between frontend and backend to reduce drift in API shapes (especially for analytics endpoints and reminder previews). Similarly, expanding automated tests beyond the existing Django pytest and Vitest setup—particularly around complex flows like statistics filtering, reminder selection logic (backend/apps/reminders/services.py), and auth/permission initialization (frontend/src/stores/auth.ts)—would further harden the system and make future refactors safer.