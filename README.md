# Repsy

A Telegram Mini App for learning English vocabulary with spaced repetition.

## Stack

- **Backend** (`backend/`): FastAPI, aiogram 3, SQLAlchemy + asyncpg, Alembic
- **Frontend** (`frontend/`): React + TypeScript + Vite, TanStack Query, Zustand, SCSS
- **Infra**: Docker Compose (PostgreSQL 17, Redis 7, ngrok)

## Run locally

```bash
docker-compose up --build
```
