from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .db import engine, Base, get_db
from .models import Base, Habit
from .schemas import HabitCreate, HabitOut
from sqlalchemy import text
from . import models, schemas

app = FastAPI()

# Allow front-ends origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables if not exists (simple for now)
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"msg": "HabitHub backend is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/habits", response_model=list[schemas.HabitOut])
def list_habits(db: Session = Depends(get_db)):
    return db.query(models.Habit).all()

@app.post("/habits", response_model=schemas.HabitOut, status_code=201)
def create_habit(habit: schemas.HabitCreate, db: Session = Depends(get_db)):
    db_habit = models.Habit(**habit.dict())
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return db_habit

@app.get("/db/ping")
def db_ping():
    # enkel runda till DB — kraschar om kopplingen inte funkar
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"db": "ok"}