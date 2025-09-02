import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { supabase } from "../supabaseClient";
import AddTask from "./AddTask";
import TaskModal from "./TaskModal";
import "./CalendarView.css";

export default function CalendarView() {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  // Fetch tasks from Supabase
  async function fetchTasks() {
    const { data, error } = await supabase.from("tasks").select("*");
    if (!error) setTasks(data || []);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  function handleTaskAdded(newTask) {
    setTasks((prev) => [...prev, newTask]);
  }

  // Toggle completion
  async function handleToggle(taskId, completed) {
    const { data, error } = await supabase
      .from("tasks")
      .update({ completed })
      .eq("id", taskId)
      .select()
      .single();

    if (!error && data) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed } : t))
      );
    }
  }

  // Delete task
  async function handleDelete(taskId) {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (!error) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  }

  // Dots on calendar
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

  // Tasks for selected date
  const tasksForSelectedDate = tasks.filter(
    (task) => new Date(task.date).toDateString() === date.toDateString()
  );

  // Open modal when a date is clicked
  function handleDateClick(selectedDate) {
    setDate(selectedDate);
    setShowModal(true);
  }

  return (
    <div className="calendar-container">
      <h1>Task Scheduler</h1>

      <Calendar
        onClickDay={handleDateClick}
        value={date}
        tileContent={tileContent}
      />

      <AddTask onTaskAdded={handleTaskAdded} />

      {showModal && (
        <TaskModal
          date={date}
          tasks={tasksForSelectedDate}
          onClose={() => setShowModal(false)}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      )}
    </div>
  );
}
