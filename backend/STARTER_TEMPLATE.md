# NestJS Modular Monolith Starter Template

This starter keeps a **single deployable NestJS backend** while enforcing module boundaries for future service extraction.

## Included starter modules

- Auth (`src/modules/auth`)
- Organizations (`src/modules/organizations`)
- Users (`src/modules/user`)
- CRM (`src/modules/crm`)
- WhatsApp (`src/modules/whatsapp`)
- Meta Ads (`src/modules/meta-ads`)
- Automation (`src/modules/automation`)
- Billing (`src/modules/billing`)
- Webhooks (`src/modules/webhook`)

## Infrastructure integrations

- Redis module (`src/integrations/redis`)
- Kafka producer abstraction (`src/integrations/kafka`)
- Prisma (`src/prisma`)

## Suggested growth path

1. Keep API + domain logic in module folders.
2. Move shared contracts to `src/common`.
3. Replace in-memory starter services with Prisma repositories.
4. Push async workflows to Kafka and Redis-backed workers.
5. Extract heavy modules as microservices only when required.
