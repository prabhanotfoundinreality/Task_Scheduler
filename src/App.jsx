
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";  
import CalendarView from "./components/CalendarView";

export default function App() {
  const [tasks, setTasks] = useState([]);

  
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching tasks:", error.message);
    } else {
      setTasks(data);
    }
  }

  // Add new task
  async function handleAdd(task) {
    const { data, error } = await supabase
      .from("tasks")
      .insert([task])
      .select();

    if (error) {
      console.error("Error inserting task:", error.message);
    } else {
      setTasks((prev) => [...prev, ...data]); 
    }
  }

  return (
    <div className="p-6 space-y-6">
      
      <CalendarView tasks={tasks} />
    </div>
  );
}
