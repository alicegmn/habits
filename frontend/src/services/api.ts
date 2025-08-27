const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export type Habit = {
  id: number;
  title: string;
  description?: string | null;
  frequency: "daily" | "weekly" | "monthly" | string;
};

export type HabitCreate = {
  title: string;
  description?: string | null;
  frequency?: "daily" | "weekly" | "monthly" | string;
};

export async function listHabits(): Promise<Habit[]> {
  const res = await fetch(`${API_URL}/habits`);
  if (!res.ok) throw new Error("Failed to load habits");
  return res.json();
}

export async function createHabit(data: HabitCreate): Promise<Habit> {
  const res = await fetch(`${API_URL}/habits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create habit");
  return res.json();
}
