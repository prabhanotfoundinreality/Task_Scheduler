import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sytpjfjdrfjnchygjbxn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5dHBqZmpkcmZqbmNoeWdqYnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NTA3NDQsImV4cCI6MjA3MjIyNjc0NH0.uJUOoB6fOWR8EGGJC1slTu8E0N2dDoHhXSHo4P_CERA"; // from Supabase dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
