import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://srtsliweuqivnsngmzbn.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNydHNsaXdldXFpdm5zbmdtemJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NzY4ODQsImV4cCI6MjA5ODQ1Mjg4NH0.vouixVTDwwch71z4OXaH2KKXGqIEvBGiat-Eyt2IyGw";

// Check whether a valid production Supabase key is configured
export const isSupabaseConfigured = (): boolean => {
  const url = import.meta.env.VITE_SUPABASE_URL || "https://srtsliweuqivnsngmzbn.supabase.co";
  const key =
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNydHNsaXdldXFpdm5zbmdtemJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NzY4ODQsImV4cCI6MjA5ODQ1Mjg4NH0.vouixVTDwwch71z4OXaH2KKXGqIEvBGiat-Eyt2IyGw";
  if (!url || !key || key.endsWith(".X_b") || key.length < 50 || key.split(".").length !== 3) {
    return false;
  }
  return true;
};

// Initialize Supabase Client with 'public' schema and auth persistence
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
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
