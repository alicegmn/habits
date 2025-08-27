from sqlalchemy import Column, Integer, String, Text, DateTime, func
from .db import Base

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    frequency = Column(String(50), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())