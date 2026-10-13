# Task Manager V2

A simple full-stack Task Manager showing React + Tailwind (frontend) and Node/Express + SQLite (backend).

## Structure

```
TaskManagerV2/
├── backend/    Express API + SQLite (better-sqlite3)
└── frontend/   React + Vite + Tailwind CSS
```

## Run it

Backend (port 5000):
```
cd backend
npm install
npm run dev
```

Frontend (port 5173, proxies /api to backend):
```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## API

| Method | Endpoint        | Description           |
|--------|-----------------|-----------------------|
| GET    | /api/tasks      | List all tasks        |
| GET    | /api/tasks/:id  | Get one task          |
| POST   | /api/tasks      | Create task           |
| PUT    | /api/tasks/:id  | Update task           |
| DELETE | /api/tasks/:id  | Delete task           |

Features: add, edit, toggle complete, delete, filter (all/active/completed).