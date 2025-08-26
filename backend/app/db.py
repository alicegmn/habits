import os
from sqlalchemy import text, create_engine

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/postgres")

# simple sync engine (enough for smoke-tests in CI)
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
