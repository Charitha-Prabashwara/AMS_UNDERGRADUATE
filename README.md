# AMS (Academic Management System) — Backend + Frontend

Practical, production-oriented Academic Management System built with Node.js/Express (backend) and React/Vite (frontend). This repo demonstrates real-world patterns and engineering practices recruiters and hiring managers value: modular architecture, automated tests, clear separation of concerns, and documented setup for local development and deployment.

---

## Why review this project

- Real-world stack: Express, Mongoose (MongoDB), JWT auth, bcrypt, Vite + React.
- Clean separation: controllers, services, repositories, DTOs, middleware and UI components.
- Design patterns: Builder, Singleton, Repository abstractions applied where appropriate.
- Testing: Jest + Supertest for services and API integration tests.
- Practical engineering: dotenv config, password hashing, input validation (Joi), error handling middleware.
- Ready for evaluation: contains example tests, .env.example, and sensible scripts to run locally.

---

## Tech stack

- Backend: Node.js, Express 5, Mongoose, Jest, Supertest
- Frontend: React, Vite, Material-UI (MUI)
- Auth & Security: bcrypt, jsonwebtoken
- Validation: Joi
- Dev tools: nodemon, dotenv
- DB: MongoDB (local or Atlas)

---

## Repository layout (annotated)

- backend/
  - src/
    - app.js — express app setup (middleware, routes)
    - server.js — server bootstrap
    - classes/ — domain entities & builders (User, Student, Lecturer, Department, etc.)
    - classes/DATABASE/ — repository layer (BaseRepository, UserRepository, DepartmentRepository) — database abstraction
    - controllers/ — route handlers
    - services/ — business logic (UserAccountService, PasswordHashService)
    - models/ — Mongoose schemas
    - middleware/ — error handling, DTO validation, translators
    - routes/ — route composition (admin routes, base.route)
  - test/ — unit & integration tests (services, entities, API)
  - .env.example — required env variables

- frontend/admin/
  - src/
    - pages/ — React pages (dashboard, auth, component-overview, home)
    - layout/ — Dashboard & Auth layout components (Header, Drawer, Footer)
    - components/ — reusable UI pieces (MainCard, Loadable)
    - routes/ — route configuration (MainRoutes, LoginRoutes)
    - assets/, themes/ — styles, MUI theme customizations

---

## Quick start (developer)

1. Clone the repo
   ```
   git clone https://github.com/<your-username>/AMS_UNDERGRADUATE.git
   cd AMS_UNDERGRADUATE
   ```

2. Backend (run API)
   ```
   cd backend
   cp .env.example .env
   # edit .env to set MONGO_URI, PORT, JWT_SECRET, etc.
   npm install
   npm run start        # uses nodemon (development)
   # or for production
   node src/server.js
   ```
   - Default: app listens on `process.env.PORT` (set in .env). If not set, default commonly 3000.

3. Frontend (run Admin UI)
   ```
   cd frontend/admin
   npm install
   npm run dev          # Vite dev server (port printed in terminal, commonly 5173)
   ```
   - Open the URL printed by Vite (e.g., http://localhost:5173). If a proxy is configured, API requests route to backend.

4. Run tests (backend)
   ```
   cd backend
   npm test
   ```
   - Tests include unit tests for services and some integration tests for APIs.

---

## Environment variables (minimal)

Copy `backend/.env.example` to `backend/.env` and set values:

- MONGO_URI=mongodb://localhost:27017/ams
- PORT=3000
- JWT_SECRET=your_secret_key
- REDIS_URL (optional) — if using ioredis
- Other values as indicated in `.env.example`

Frontend may use Vite env (e.g., VITE_API_URL) — check `frontend/admin/.env` or `vite.config.mjs`.

---

## Design & architecture notes (for interview)

- Domain-driven classes in `/classes` encapsulate entity behavior and use Builder pattern for flexible construction.
- The repository layer (`classes/DATABASE`) abstracts Mongoose operations — controllers and services depend on repository abstractions rather than direct models (Dependency Inversion).
- Services layer implements business rules (separation of concerns), making unit testing straightforward.
- DTOs and validation middleware ensure input contracts and consistent error handling.
- Error handling pipeline converts domain errors into well-formed API responses (see middleware/ErrorHandler.js).

Be prepared to explain:
- Why Repository + Service + Controller separation improves testability and maintainability.
- How Builder pattern improves entity construction and readability.
- How JWT, password hashing, and validation are chained in the auth flow.

---

## Production considerations & next steps

- Add centralized logging (winston or pino) and structured logs (JSON).
- Add health checks and readiness probes for containerized deployment.
- Harden security: helmet, rate limiting, CORS policy, input sanitization.
- CI/CD: add GitHub Actions to run lint, tests, and build pipelines.
- Increase test coverage: add integration tests covering authentication and critical flows.
- Add containerization: Dockerfile(s) and docker-compose for local multi-service testing (API + MongoDB).

---

## How recruiters/hiring managers can evaluate quickly

- Run the app locally (backend + frontend). Confirm API endpoints listed in `routes/`.
- Run `npm test` in backend for automated verification of core services.
- Inspect `classes/` and `classes/DATABASE/` to validate use of design patterns and repository abstractions.
- Review `test/` to see unit-testing style and edge-case coverage.
- Ask for a short walkthrough: auth flow, user creation, and how errors are handled.

---

## Contributing & contact

- Contributions accepted via PR. Follow repository style (prettier/eslint config present).
- To discuss this project or schedule a walkthrough, contact via GitHub profile or email in profile.

---

## License

This project uses ISC license (see `backend/package.json`). Replace with preferred license if required.

---

Thank you for reviewing. This repository is designed to be a concise, realistic sample of backend + frontend engineering practices — suitable for interview take-home reviews and portfolio demonstrations.