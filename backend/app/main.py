from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.db.database import engine
from app.api.auth import router as auth_router
from app.api.upload import router as upload_router
from app.api.public import router as public_router
from app.api.profile import router as profile_router
from app.api.certificates import router as certificates_router
from app.api.experiences import router as experiences_router
from app.api.accounts import router as accounts_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(public_router)
app.include_router(profile_router)
app.include_router(certificates_router)
app.include_router(experiences_router)
app.include_router(accounts_router)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/health/db")
def health_check_db():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"database": "connected"}
    except Exception as e:
        return {"database": "error", "detail": str(e)}