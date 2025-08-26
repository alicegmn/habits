from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"msg": "HabitHub backend is running. Testing."}