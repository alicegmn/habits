from fastapi import FastAPI
from .db import engine
from sqlalchemy import text

app = FastAPI()

@app.get("/")
def root():
    return {"msg": "HabitHub backend is running"}

@app.get("/health/db")
def health_db():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"db": "ok"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database unavailable: {str(e)}")
