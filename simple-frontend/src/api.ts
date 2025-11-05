export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getNotes() {
  const res = await fetch(`${API_URL}/notes`);
  return res.json();
}

export async function addNote(text: string) {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return res.json();
}
