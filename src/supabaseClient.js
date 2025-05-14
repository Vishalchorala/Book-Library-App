import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://znebyarjbendfamyxrck.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZWJ5YXJqYmVuZGZhbXl4cmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNDU2NjYsImV4cCI6MjA2MjYyMTY2Nn0.lRv9ejaVQNoXsoa8laxChSdwTKV7JjPYhWK5L7CinpE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
