import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "./AddTask.css";

export default function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !date) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, date, time, notes, completed: false }])
      .select()
      .single();

    if (!error && data) {
      clearForm();
      onTaskAdded(data); // update parent state instead of reload
    }
  }

  function clearForm() {
    setTitle("");
    setDate("");
    setTime("");
    setNotes("");
  }

  return (
    <div className="addtask-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">Add</button>
        <button type="button" onClick={clearForm}>
          Clear
        </button>
      </form>
    </div>
  );
}
