# Personal Website

Personal website dengan React (frontend), FastAPI (backend), dan PostgreSQL (database).

## Tech Stack
- Frontend: React + Vite
- Backend: FastAPI (Python 3.10+)
- Database: PostgreSQL (Docker)
- Deployment: Vercel (frontend), Render (backend + db)

## Setup Lokal

### 1. Database (PostgreSQL via Docker)
```bash
docker-compose up -d
```


### 2. Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1   # Windows PowerShell
pip install -r requirements.txt
```

Buat file `.env` di `backend/` (contoh lihat `.env.example`):

Jalankan server:
```bash
uvicorn app.main:app --reload
```
Backend jalan di `http://127.0.0.1:8000`


### 3. Frontend
```bash
cd frontend
npm install
```

Buat file `.env` di `frontend/` (contoh lihat `.env.example`):

Jalankan dev server:
```bash
npm run dev
```
Frontend jalan di `http://localhost:5173`

## Struktur Project

personal-website/
├── backend/ # FastAPI app
├── frontend/ # React app
└── docker-compose.yml