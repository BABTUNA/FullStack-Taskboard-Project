# FullStack Taskboard Project

A small full-stack task board built as a Web102 learning project. Users can create an
account, sign in, and organize personal tasks across To do, In progress, and Done.

## Project map

```text
client/                 React 18 and Vite interface
  src/auth/             authentication state
  src/components/       task cards and forms
  src/pages/            login, registration, and board pages
server/                 Express API
  db/                   PostgreSQL schema, migrations, and seed data
  src/middleware/       authentication, validation, and errors
  src/repositories/     SQL access for users and tasks
  src/routes/           authentication and task endpoints
  src/services/         registration and login logic
docs/                   requirements, architecture, and retrospective
compose.yaml            local client, API, and database services
```

## Stack

- React 18 with React Router and Vite 3
- Node.js 18 and Express 4
- PostgreSQL 14
- Jest, Supertest, Vitest, and Testing Library
- Docker Compose and Nginx

## Local setup

Copy `.env.example` to `.env` and replace the sample password and JWT secret. Then
start the three services with `docker compose up --build`. The application is exposed
at `http://localhost:8080`; the browser sends `/api` requests through Nginx to Express.

For work outside Docker, install the root workspaces with `npm install`, run the API
with `npm run dev --workspace server`, and run Vite with `npm run dev --workspace client`.
The API expects `DATABASE_URL` and `JWT_SECRET` environment variables.

## Main API routes

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Exchange credentials for a JWT |
| GET | `/api/auth/me` | Read the authenticated user |
| GET/POST | `/api/tasks` | List or create owned tasks |
| GET/PUT/DELETE | `/api/tasks/:id` | Work with one owned task |

## Notes

This repository is a reconstruction of an accidentally deleted learning project.
The implementation and commit sequence were recreated from the original project
outline, and the historical commit dates record that intended development timeline.
The preserved Flashcards repository history remains available on the
`legacy-flashcards` branch.

See [architecture](docs/architecture.md), [requirements](docs/requirements.md), and
the [project retrospective](docs/retrospective.md) for additional context.
