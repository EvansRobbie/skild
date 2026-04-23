<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the Skild TanStack Start application. Here is a summary of all changes made:

- **`vite.config.ts`** — Added a reverse proxy for `/ingest`, `/ingest/static`, and `/ingest/array` routes, routing PostHog telemetry through the local dev server to avoid CORS issues and ad-blocker interference.
- **`src/routes/__root.tsx`** — Added `PostHogProvider` wrapping the entire app (outside `ClerkProvider`) so all routes have access to the PostHog client. Added a `PostHogIdentifier` component that uses Clerk's `useUser` hook to call `posthog.identify()` when a user is signed in and `posthog.reset()` on sign-out. Environment variables `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST` are referenced via `import.meta.env`.
- **`src/routes/index.tsx`** — Added `usePostHog` hook with `onClick` captures on the "Browse Registry" and "Publish Skill" CTA links.
- **`src/components/skill-card.tsx`** — Added `usePostHog` hook; `skill_install_command_copied` fires after a successful clipboard write (with skill metadata properties); `skill_upvoted` fires when the upvote button is clicked.
- **`src/components/navbar.tsx`** — Added `usePostHog` hook; `sign_in_clicked` fires when the Sign In link is clicked.
- **`.env`** — Created with `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST` values (gitignore coverage confirmed).

| Event | Description | File |
|---|---|---|
| `browse_registry_clicked` | User clicks the "Browse Registry" CTA on the homepage hero | `src/routes/index.tsx` |
| `publish_skill_clicked` | User clicks the "Publish Skill" CTA on the homepage hero | `src/routes/index.tsx` |
| `skill_install_command_copied` | User copies an install command from a skill card | `src/components/skill-card.tsx` |
| `skill_upvoted` | User clicks the upvote button on a skill card | `src/components/skill-card.tsx` |
| `sign_in_clicked` | User clicks the Sign In button in the navbar | `src/components/navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/394408/dashboard/1502652
- **Registry engagement over time** (line chart of all key actions): https://us.posthog.com/project/394408/insights/45TVy4e1
- **Sign-in to registry action conversion funnel**: https://us.posthog.com/project/394408/insights/UszaZTk4
- **Skill install command copies by skill** (bar chart by skill name): https://us.posthog.com/project/394408/insights/okScfd8e
- **Unique users engaging with the registry** (daily active users): https://us.posthog.com/project/394408/insights/Igwv2WJx
- **Skill upvotes by category** (bar chart by category): https://us.posthog.com/project/394408/insights/9mlEFJG5

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
