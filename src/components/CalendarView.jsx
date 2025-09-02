
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { supabase } from "../supabaseClient";
import AddTask from "./AddTask";
import "./CalendarView.css";

export default function CalendarView() {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());


  async function fetchTasks() {
    const { data, error } = await supabase.from("tasks").select("*");
    if (!error) setTasks(data || []);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  
  function handleTaskAdded(newTask) {
    setTasks((prev) => [...prev, newTask]);
  }

 
  function tileContent({ date, view }) {
    if (view === "month") {
      const hasTask = tasks.some(
        (task) => new Date(task.date).toDateString() === date.toDateString()
      );
      if (hasTask) {
        return <div className="task-dot"></div>;
      }
    }
    return null;
  }

  
  const tasksForSelectedDate = tasks.filter(
    (task) => new Date(task.date).toDateString() === date.toDateString()
  );

  return (
    <div className="calendar-container">
      <h1>Task Scheduler</h1>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
      />

      <div className="task-list">
        <h2>Tasks on {date.toDateString()}</h2>
        {tasksForSelectedDate.length > 0 ? (
          <ul>
            {tasksForSelectedDate.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong> {task.time && `at ${task.time}`}
                <br />
                {task.notes}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks for this day.</p>
        )}
      </div>

      {}
      <AddTask onTaskAdded={handleTaskAdded} />
    </div>
  );
}
