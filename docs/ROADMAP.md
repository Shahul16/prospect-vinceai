# Product roadmap

## Included in v0.1.0
- Independent Next.js product repository and dashboard UI.
- Prospect sample table with search, status filtering and add interaction.
- Prisma schema for workspaces, ICPs, prospects, campaigns, campaign steps, activities and suppressions.
- AI research and outreach draft provider adapters.
- Email delivery adapter disabled by default.
- API validation, health endpoint, Docker PostgreSQL, tests and GitHub Actions CI.

## Next increments
1. Production authentication, workspace membership, roles and tenant authorization.
2. Authenticated Prisma CRUD, CSV import/export, deduplication and audit trail.
3. Approved data-provider integrations with provenance and retention controls.
4. ICP builder, licensed lead discovery and scoring.
5. Queue/worker scheduler with sending windows, caps, retries, idempotency and just-in-time suppression checks.
6. Inbox OAuth/webhooks, thread mapping, reply classification, stop-on-reply and human-approved replies.
7. Calendar booking, CRM sync, billing and metering.
8. Security hardening, observability, backups and regional compliance workflows.

## Live-send release gate
Do not enable outbound delivery until authentication, tenant isolation, persistent suppression and unsubscribe handling, SPF/DKIM/DMARC, per-domain limits, and provider webhook verification are implemented and tested.
