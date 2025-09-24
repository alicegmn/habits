import { useEffect, useState } from "react";
import { getHabits, addHabit, deleteHabit, updateHabit } from "../lib/api";
import { Button, Card, CardTitle, Input, Badge } from "../components/ui";

type Habit = {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  frequency?: string;
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getHabits()
      .then((data) => setHabits(data))
      .catch(console.error);
  }, []);

  const handleAdd = async () => {
    if (!title) return;
    const newHabit = await addHabit({ user_id: 1, title }); // temporärt hårdkodat user_id
    setHabits((prev) => [...prev, newHabit]);
    setTitle("");
  };

  const handleDelete = async (id: number) => {
    await deleteHabit(id);
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const handleUpdate = async (id: number) => {
    if (!title) return;
    const updatedHabit = await updateHabit(id, { title });
    setHabits((prev) => prev.map((h) => (h.id === id ? updatedHabit : h)));
    setTitle("");
  };

  return (
    <section className="container py-6 space-y-6">
      <Card>
        <CardTitle>Your Habits</CardTitle>
        <div className="mt-4 flex flex-wrap gap-2">
          {habits.map((habit) => (
            <Badge key={habit.id} className="flex items-center gap-2">
              {habit.title}
              <Button variant="ghost" onClick={() => handleDelete(habit.id)}>
                ✕
              </Button>
              <Button variant="outline" onClick={() => handleUpdate(habit.id)}>
                Update
              </Button>
            </Badge>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Add a New Habit</CardTitle>
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="I'm going to..."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </Card>
    </section>
  );
}
