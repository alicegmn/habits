import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

DEFAULT_URL = "postgresql+psycopg://username:password@localhost:5432/database"
DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_URL)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)