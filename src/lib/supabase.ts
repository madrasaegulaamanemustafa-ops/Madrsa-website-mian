import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://srtsliweuqivnsngmzbn.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNydHNsaXdldXFpdm5zbmdtemJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDQ5ODEsImV4cCI6MjA1NzYyMDk4MX0.X_b";

// Check whether a valid production Supabase key is configured
export const isSupabaseConfigured = (): boolean => {
  const url = import.meta.env.VITE_SUPABASE_URL || "";
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
  if (!url || !key || key.endsWith(".X_b") || key.length < 50 || key.split(".").length !== 3) {
    return false;
  }
  return true;
};

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

/**
 * Executes a Promise/PromiseLike with a strict timeout to avoid freezing or crashing when offline.
 */
export async function withTimeout<T>(
  promiseLike: PromiseLike<T> | Promise<T>,
  ms = 2500,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Supabase request timed out after ${ms}ms`)), ms);
  });

  return Promise.race([
    Promise.resolve(promiseLike).finally(() => {
      if (timer) clearTimeout(timer);
    }),
    timeoutPromise,
  ]);
}
