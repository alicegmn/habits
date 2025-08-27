import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardSubtle,
  CardTitle,
  Input,
  Select,
  Textarea,
  Badge,
} from "../components/ui/index";

export default function Home() {
  const [habits, setHabits] = useState<string[]>([]);
  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (newHabit.trim() !== "") {
      setHabits([...habits, newHabit]);
      setNewHabit("");
    }
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <section className="grid-cards">
        <Card>
          <CardTitle>Todays habits</CardTitle>
          <CardSubtle>Kom igång med {habits.length} vanor</CardSubtle>
          <div className="mt-4 flex gap-2">
            {habits.map((habit, index) => (
              <Badge key={index} variant="primary">
                {habit}
              </Badge>
            ))}
          </div>
          <CardActions>
            <Button>Stop habit</Button>
            <Button variant="primary">Done for today</Button>
          </CardActions>
        </Card>

        <Card>
          <CardTitle>Start a new habit</CardTitle>
          <div className="mt-3 space-y-3">
            <Input
              placeholder="I'm going to..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)} // Uppdatera ny vana
            />
            <Textarea placeholder="Description..." />
            <Select defaultValue="daily">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Select>
          </div>
          <div className="mt-4">
            <Button variant="primary" onClick={addHabit}>
              Add to habits
            </Button>
          </div>
        </Card>

        <Card>
          <CardTitle>Streak</CardTitle>
          <p className="mt-2 text-4xl font-bold text-brand-600">7 🔥</p>
          <div className="mt-4 divider" />
          <CardSubtle>You're on fire!</CardSubtle>
        </Card>
      </section>
    </>
  );
}
