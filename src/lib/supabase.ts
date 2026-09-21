import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://srtsliweuqivnsngmzbn.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNydHNsaXdldXFpdm5zbmdtemJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDQ5ODEsImV4cCI6MjA1NzYyMDk4MX0.X_b";

// Initialize Supabase Client with dedicated 'madrasa' schema
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: "madrasa",
  },
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
