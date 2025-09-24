const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

export async function getHabits() {
  const res = await fetch(`${API_URL}/habits`);
  if (!res.ok) throw new Error("Failed to fetch habits");
  return res.json();
}

export async function addHabit(data: {
  user_id: number;
  title: string;
  description?: string;
  frequency?: string;
}) {
  const res = await fetch(`${API_URL}/habits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add habit");
  return res.json();
}

export async function updateHabit(
  id: number,
  data: Partial<{
    title: string;
    description: string;
    frequency: string;
  }>
) {
  const res = await fetch(`${API_URL}/habits/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update habit");
  return res.json();
}

export async function deleteHabit(id: number) {
  const res = await fetch(`${API_URL}/habits/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete habit");
  return res.json();
}
