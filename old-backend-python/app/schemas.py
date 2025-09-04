from pydantic import BaseModel

class HabitBase(BaseModel):
    title: str
    description: str | None = None
    frequency: str

class HabitCreate(HabitBase):
    pass

class HabitOut(HabitBase):
    id: int

    class Config:
        orm_mode = True
