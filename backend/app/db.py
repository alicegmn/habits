import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

DEFAULT_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/habitsdb"
DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_URL)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)