# REB Studio — AI-Native Website-as-a-Service

## What This Is
A monorepo with two apps:
- **apps/web** (@reb/web) — Client platform: dashboard, AI agent, admin, public site, onboarding, all API routes
- **apps/marketing** (@reb/marketing) — REB agency landing page at reb.studio

## Architecture
- **Monorepo**: pnpm workspaces + turborepo
- **Framework**: Next.js 16, React 19, Tailwind 4, TypeScript
- **AI**: Vercel AI SDK v6 + Google Gemini 2.5 Flash
- **Storage**: Redis (production) / local JSON files (dev)
- **Auth**: JWT via jose, middleware-protected routes
- **Integrations**: Square OAuth + catalog sync + webhooks
- **Validation**: Zod schemas for all content sections

## Commands
- `pnpm dev` — run both apps via turbo
- `pnpm dev:web` — web app only (port 3000)
- `pnpm dev:marketing` — marketing only (port 3001)
- `pnpm build` — build all apps

## Content Model
8 sections: hero, services, story, testimonials, events, providers, contact, settings
Each has: TypeScript type, Zod schema, default data, API endpoint, admin editor

## Key Patterns
- Storage abstraction: `getContent(section)` / `setContent(section, data)` — Redis or file
- AI agent tools: `read_section` + `update_section` with Zod validation + array guard
- Square sync: OAuth → fetch catalog → map to content types → smart merge preserving user edits

## Value Hypothesis
Local business owners will pay $199/mo for a custom-built site + AI agent that handles all content updates via chat — IF the site looks more professional than what they have and the AI responds faster than texting their web person.

## Do NOT Build
- Drag-and-drop visual editor
- Client-facing code editor
- Self-serve site generation
- Email marketing / newsletter
- E-commerce / checkout
- Social media management
- Multi-tenant (not yet — prove single-tenant first)

## Git Rules
- NEVER add "Co-Authored-By" lines to commits
