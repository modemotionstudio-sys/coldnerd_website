import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://digzspnffmdrqpagxswi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpZ3pzcG5mZm1kcnFwYWd4c3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjg2MDEsImV4cCI6MjA5MzgwNDYwMX0.6_6pu-EKBxlAQc9TrktlhblAL1AYZtUuT88OX7PmQeQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
