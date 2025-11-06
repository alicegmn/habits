import { useEffect, useState } from "react";
import { getNotes, addNote } from "./api";

type Note = { id: number; text: string };

export default function App() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		loadNotes();
	}, []);

	async function loadNotes() {
		const data = await getNotes();
		setNotes(data);
	}

	async function handleAdd() {
		if (!input.trim()) return;
		await addNote(input);
		setInput("");
		loadNotes();
	}

	return (
		<main
			style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
		>
			<div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
				<h2>Simple Notes (React + TS)</h2>

				<div>
					<input
						placeholder="Write note..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button onClick={handleAdd}>Add Note</button>
				</div>

				<ul>
					{notes.map((n) => (
						<li key={n.id}>{n.text}</li>
					))}
				</ul>
			</div>
		</main>
	);
}
