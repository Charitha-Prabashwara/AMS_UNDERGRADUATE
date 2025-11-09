# AMS (Academic Management System) — Backend + Frontend 📚⚙️

Practical, production-oriented Academic Management System built with Node.js/Express (backend) and React/Vite (frontend). This repo demonstrates real-world engineering practices: modular architecture, automated tests, clear separation of concerns, and a straightforward local development setup — ideal for recruiter review. ✅


## Tech stack 🧰

- Backend: Node.js, Express 5, Mongoose, Jest, Supertest  
- Frontend: React, Vite, Material-UI (MUI)  
- Auth & Security: bcrypt, jsonwebtoken  
- Validation: Joi  
- Dev tools: nodemon, dotenv  
- DB: MongoDB (local or Atlas) 🗄️

---

## Repository layout (annotated) 🗂️

- backend/  
  - src/  
    - app.js — express app setup (middleware, routes)  
    - server.js — server bootstrap  
    - classes/ — domain entities & builders (User, Student, Lecturer, Department, etc.)  
    - classes/DATABASE/ — repository layer (BaseRepository, UserRepository, DepartmentRepository) — DB abstraction  
    - controllers/ — route handlers  
    - services/ — business logic (UserAccountService, PasswordHashService)  
    - models/ — Mongoose schemas  
    - middleware/ — error handling, DTO validation, translators  
    - routes/ — route composition (admin routes, base.route)  
  - test/ — unit & integration tests (services, entities, API) 🧾  
  - .env.example — required env variables

- frontend/admin/  
  - src/  
    - pages/ — React pages (dashboard, auth, component-overview, home) 🖥️  
    - layout/ — Dashboard & Auth layout components (Header, Drawer, Footer)  
    - components/ — reusable UI pieces (MainCard, Loadable)  
    - routes/ — route configuration (MainRoutes, LoginRoutes)  
    - assets/, themes/ — styles, MUI theme customizations 🎨

---

## Quick start (developer) ⚡

1. Clone the repo  
   ```bash
   git clone https://github.com/<your-username>/AMS_UNDERGRADUATE.git
   cd AMS_UNDERGRADUATE
   ```

2. Backend (run API)  
   ```bash
   cd backend
   cp .env.example .env
   # edit .env to set MONGO_URI, PORT, JWT_SECRET, etc.
   npm install
   npm run start        # development (nodemon)
   # or for production
   node src/server.js
   ```
   - App listens on `process.env.PORT` (set in .env). Default commonly 3000.

3. Frontend (run Admin UI)  
   ```bash
   cd frontend/admin
   npm install
   npm run dev          # Vite dev server (port printed, e.g., 5173)
   ```
   - Open the Vite URL (e.g., http://localhost:5173). API proxy may route requests to backend.

4. Run tests (backend)  
   ```bash
   cd backend
   npm test
   ```
   - Tests include unit tests for services and some integration tests. 🧪

---

## Environment variables (minimal) 🔧

Copy `backend/.env.example` → `backend/.env` and set:

- MONGO_URI=mongodb://localhost:27017/ams  
- PORT=3000  
- JWT_SECRET=your_secret_key  
- REDIS_URL (optional)  
- See `.env.example` for additional values.

Frontend may use Vite env (e.g., VITE_API_URL) — check `frontend/admin/.env` or `vite.config.mjs`.

---

## Design & architecture notes (for interview) 🧭

- Domain-driven classes in `/classes` encapsulate entity behavior and use the Builder pattern for flexible construction. 🏗️  
- Repository layer (`classes/DATABASE`) abstracts Mongoose — controllers/services depend on repository abstractions (Dependency Inversion). 🔁  
- Services implement business rules (separation of concerns), simplifying unit testing. 🧩  
- DTOs + validation middleware enforce input contracts and consistent error responses. 🔍  
- Error pipeline converts domain errors into well-formed API responses (see `middleware/ErrorHandler.js`). 🛡️

Be prepared to explain:  
- Why Repository + Service + Controller separation improves testability and maintainability.  
- How Builder pattern improves entity construction and readability.  
- How JWT, password hashing, and validation are chained in the auth flow.

---

## Production considerations & next steps 📈

- Add centralized logging (winston/pino) and structured logs (JSON). 📊  
- Add health checks and readiness probes for containerized deployment. 🩺  
- Harden security: helmet, rate limiting, CORS policy, input sanitization. 🔐  
- CI/CD: GitHub Actions for lint, tests, and build pipelines. 🔁  
- Increase test coverage: add integration tests for auth and critical flows. 🧪  
- Containerization: Dockerfile(s) and docker-compose for local multi-service testing (API + MongoDB). 🐳

---

## How recruiters / hiring managers can evaluate quickly ✅

- Run backend + frontend locally to verify endpoints and UI.  
- Run `npm test` in `backend/` for automated verification of core services.  
- Inspect `classes/` and `classes/DATABASE/` to validate design patterns and repository abstractions.  
- Review `test/` to see unit-testing style and edge-case coverage.  
- Request a 10–15 minute walkthrough of auth flow, user creation, and error handling.

---

## Contributing & contact 🤝

- Contributions accepted via PR. Follow project style (prettier/eslint present).  
- To discuss this project or request a walkthrough, contact via GitHub profile or email on your profile.

---

## License 🏷️

This project uses the ISC license (see `backend/package.json`). Replace with your preferred license if needed.

---

Thanks for reviewing — this repository is a concise, realistic sample of backend + frontend engineering practices, suitable for interview take-home reviews and portfolio demonstrations. 🎯