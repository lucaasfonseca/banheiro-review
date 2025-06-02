import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ghbuiqpsmgywbrxrflgi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoYnVpcXBzbWd5d2JyeHJmbGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDE3NjcsImV4cCI6MjA2NDQ3Nzc2N30._mQ8ZQB0yWwrkYIwh4GbTvocDJBbnXEebStd2J-6tIw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
