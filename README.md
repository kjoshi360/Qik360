# Qik360 Multi-Tenant SaaS

## Architecture
```text
                 ┌───────────────────────┐
                 │    Load Balancer      │
                 │   (Nginx Reverse)     │
                 └──────────┬────────────┘
                            │
            ┌───────────────┴────────────────┐
            │                                │
  ┌─────────▼─────────┐              ┌───────▼─────────┐
  │ Frontend (React)  │              │ Backend (NestJS)│
  │ Vite SPA          │─────────────►│ Modular Monolith│
  └───────────────────┘   REST API   └───┬─────┬───────┘
                                          │     │
                          ┌───────────────┘     └───────────────┐
                    ┌─────▼───────┐                   ┌──────────▼─────┐
                    │ PostgreSQL  │                   │ Redis Cache    │
                    └─────────────┘                   └────────────────┘
                                          │
                        ┌─────────────────┼───────────────────┐
                 ┌──────▼──────┐   ┌──────▼──────┐    ┌───────▼────────┐
                 │ WhatsApp API│   │ OpenAI API  │    │ n8n Automation │
                 └─────────────┘   └─────────────┘    └────────────────┘
```

## Folder structure
```text
.
├── backend
├── frontend
├── nginx
├── docker-compose.yml
└── README.md
```

## Prerequisites
- Node.js 20+
- Docker + Docker Compose
- PostgreSQL 16+
- Redis 7+

## Setup
1. Backend:
   - `cd backend && cp .env.example .env`
   - Default `DATABASE_URL` is preconfigured for Render Postgres integration: `postgresql://qik360:952gXG5aWtbnl9aCLo2HOOvW7iRGeqmv@dpg-d687anrh46gs73f9b3gg-a.oregon-postgres.render.com/qik360`
   - `npm install`
   - `npx prisma generate`
   - `npx prisma migrate dev`
   - `npm run prisma:seed`
   - `npm run start:dev`
2. Frontend:
   - `cd frontend && cp .env.example .env`
   - Ensure `VITE_API_BASE_URL` points to your backend (default: `http://localhost:3000/api/v1`)
   - `npm install`
   - `npm run dev`

## Seeded logins
- Admin: `admin@qik360.dev` / `Admin@123`
- Owner: `owner@qik360.dev` / `Owner@123`

## OpenAI API key
Set `OPENAI_API_KEY` in `backend/.env`.

## WhatsApp integration steps
1. Create Meta app + WhatsApp Business account.
2. Set `WHATSAPP_API_URL` and `WHATSAPP_WEBHOOK_SECRET`.
3. Save `phoneNumberId` + token via `POST /api/v1/whatsapp`.
4. Register webhook URL: `https://your-domain/api/v1/webhook`.

## n8n setup
1. Start n8n via compose.
2. Build workflow with webhook trigger.
3. Put URL into `N8N_WEBHOOK_URL`.
4. Use `POST /api/v1/automation`.

## API routes and contracts
- `POST /api/v1/auth/register`
  - Request: `{ "tenantName":"Acme", "email":"owner@acme.com", "password":"Owner@123", "role":"OWNER" }`
  - Response: `{ "accessToken":"jwt", "user": { "id":"...", "tenantId":"...", "role":"OWNER" } }`
- `POST /api/v1/auth/login`
  - Request: `{ "email":"owner@acme.com", "password":"Owner@123" }`
  - Response: same as register
- `GET /api/v1/{module}` for each module:
  - auth header required
  - Response: `{ "tenantId":"...", "module":"messages", "items":[] }`
- `POST /api/v1/{module}`
  - Request: `{ "name":"...", "metadata": {} }`
  - Response: `{ "tenantId":"...", "module":"...", "payload": {...} }`
- Errors:
  - `401`: `{ "statusCode": 401, "message": "Unauthorized" }`
  - `403`: `{ "statusCode": 403, "message": "Forbidden" }`
  - `429`: `{ "statusCode": 429, "message": "ThrottlerException: Too Many Requests" }`

## Billing & subscriptions
Plans: FREE, PRO, ENTERPRISE with role/plan guards in backend and filtered navigation in frontend.

## Frontend page architecture (101 pages)
- Route catalog is centralized in `frontend/src/config/platformRoutes.ts`.
- Categories implemented:
  - Promotional Website: 31 routes
  - Tenant Application: 44 routes under `/app/*`
  - Admin Panel: 26 routes under `/admin/*`
- Generic page renderer + API module mapping is implemented in `frontend/src/pages/PlatformPage.tsx`.

## Postman collection
- Import `postman/Qik360_API.postman_collection.json` into Postman.
- Update collection variables: `baseUrl`, `tenantId`, and `token` as needed.
- Run `Auth > Login Admin` first to auto-store `token` for protected requests.

## Tests
- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test`

## Build
- Backend: `cd backend && npm run build`
- Frontend: `cd frontend && npm run build`

## Deploy
Run: `docker compose up --build`
