from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_db_health_ok():
    r = client.get("/health/db")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}