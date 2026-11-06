# Prospect VinceAI

AI-assisted outbound sales workspace for account research, prospect qualification, personalised outreach and campaign management.

**Release:** MVP foundation (v0.1.0), not yet production-ready.

## Included
- Responsive dashboard with prospect search, filtering and add flow (demo state).
- AI research and personalised outreach draft API routes.
- Configurable OpenAI-compatible Chat Completions adapter.
- Outbound email adapter, dry-run by default.
- Prisma/PostgreSQL schema for workspaces, ICPs, prospects, campaigns, sequences, activities and suppressions.
- Validation tests, health endpoint, Docker PostgreSQL and CI workflow.

## Local setup
Requirements: Node.js 20+, Docker and npm.

```bash
cp .env.example .env
npm install
docker compose up -d db
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Open http://localhost:3000.

## Provider configuration
Set AI_BASE_URL, AI_API_KEY and AI_MODEL for an OpenAI-compatible Chat Completions endpoint. Without credentials, AI routes return clearly labelled demo output.

Email delivery is disabled by default. EMAIL_LIVE_SEND must be explicitly set to true, with EMAIL_PROVIDER_URL and EMAIL_PROVIDER_API_KEY configured. See src/lib/providers/email.ts. Do not enable live sending until authentication, persistent suppression/unsubscribe handling, sender-domain authentication and sending limits are deployed.

## Compliance and security
Do not use purchased or scraped personal-email lists. Document lawful sourcing and the legal basis, honour objections and opt-outs promptly, identify the sender clearly, and follow recipient-market rules. Complete a UAE PDPL and destination-market review before production. Store secrets in deployment secret managers; never commit .env.

## MVP limitations
The UI uses sample data. Production authentication, workspace authorization and persistent prospect APIs are not implemented yet. Prospect and suppression write routes return preview responses. Campaign execution, external lead-data sourcing, inbox sync, CRM sync, calendar booking and billing remain roadmap work.

See docs/ROADMAP.md.
