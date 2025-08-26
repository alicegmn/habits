from fastapi import FastAPI
from .db import engine
from sqlalchemy import text

app = FastAPI()

@app.get("/")
def root():
    return {"msg": "HabitHub backend is running"}

@app.get("/health/db")
def health_db():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"db": "ok"}
