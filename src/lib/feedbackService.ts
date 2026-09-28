import { supabase, withTimeout, isSupabaseConfigured } from "./supabase";

export type FeedbackRole = "student" | "parent";

export interface FeedbackItem {
  id: string;
  name: string;
  role: FeedbackRole;
  courseName?: string;
  rating: number; // 1 to 5
  message: string;
  location?: string;
  createdAt: string;
  verified?: boolean;
}

const LOCAL_STORAGE_KEY_FEEDBACK = "mgm_feedbacks_data_v1";

export const DEFAULT_FEEDBACKS: FeedbackItem[] = [
  {
    id: "fb-1",
    name: "Muhammad Farhan",
    role: "student",
    courseName: "Dars-e-Nizami (Aalimiyat)",
    rating: 5,
    message:
      "Alhamdulillah! The online Dars-e-Nizami classes are exceptionally detailed. The teachers explain Arabic grammar (Nahw & Sarf) with extreme patience and clarity. Recorded lectures make revision so easy.",
    location: "Mumbai, Maharashtra",
    createdAt: "2026-09-15T10:30:00.000Z",
    verified: true,
  },
  {
    id: "fb-2",
    name: "Dr. Tariq Siddiqui",
    role: "parent",
    courseName: "Kids Special Batch",
    rating: 5,
    message:
      "I enrolled both my son and daughter (ages 7 & 10) in the Kids Special Batch. Within 3 months, their Quran pronunciation with Tajweed and daily Sunnah Duas improved tremendously. Safe, Islamic environment at home!",
    location: "Lucknow, UP",
    createdAt: "2026-09-18T14:20:00.000Z",
    verified: true,
  },
  {
    id: "fb-3",
    name: "Fatima Khan",
    role: "student",
    courseName: "Sisters Muballiga (Aalima)",
    rating: 5,
    message:
      "Being a homemaker, I never thought I could complete Aalima course. Madrasa E Gulaaman E Mustafa made it possible with strict female-only privacy, female teachers, and flexible timings. JazakAllah Khair!",
    location: "Hyderabad, Telangana",
    createdAt: "2026-09-20T08:45:00.000Z",
    verified: true,
  },
  {
    id: "fb-4",
    name: "Shabana Begum",
    role: "parent",
    courseName: "Sisters Muballiga (Aalima)",
    rating: 5,
    message:
      "My daughter is studying in the Muballiga course. The discipline, monthly exams, and direct teacher guidance are outstanding. The offline certificate is also genuine and recognized.",
    location: "Delhi NCR",
    createdAt: "2026-09-22T16:15:00.000Z",
    verified: true,
  },
  {
    id: "fb-5",
    name: "Abdul Qadir",
    role: "student",
    courseName: "Tajweed & Hifz",
    rating: 5,
    message:
      "Makharij corrections in live Tilawat classes are unmatched. The Qari Sahib listens to every student individually. Just ₹300/month fee is a huge blessing for the Muslim Ummah.",
    location: "Kolkata, WB",
    createdAt: "2026-09-24T12:00:00.000Z",
    verified: true,
  },
  {
    id: "fb-6",
    name: "Mohammad Irfan",
    role: "parent",
    courseName: "Basic Urdu & Deeniyat",
    rating: 5,
    message:
      "My children can now read Urdu books fluently and understand Basic Fiqh rules (Namaz, Wuzu, Taharat). Highly recommended for every Islamic parent.",
    location: "Bangalore, Karnataka",
    createdAt: "2026-09-26T09:10:00.000Z",
    verified: true,
  },
];

export function getLocalFeedbacks(): FeedbackItem[] {
  if (typeof window === "undefined") return DEFAULT_FEEDBACKS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_FEEDBACK);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY_FEEDBACK, JSON.stringify(DEFAULT_FEEDBACKS));
      return DEFAULT_FEEDBACKS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_FEEDBACKS;
  } catch (e) {
    console.error("Failed to read local feedbacks:", e);
    return DEFAULT_FEEDBACKS;
  }
}

export async function getFeedbacks(): Promise<FeedbackItem[]> {
  const local = getLocalFeedbacks();

  if (typeof window !== "undefined" && isSupabaseConfigured()) {
    try {
      const { data, error } = await withTimeout(
        supabase.from("feedbacks").select("*").order("created_at", { ascending: false }),
        3500,
      );

      if (data && !error && data.length > 0) {
        const mapped: FeedbackItem[] = data.map((d: Record<string, unknown>) => ({
          id: String(d.id),
          name: String(d.name || "Anonymous"),
          role: (d.role === "parent" ? "parent" : "student") as FeedbackRole,
          courseName: String(d.course_name || d.courseName || "General Course"),
          rating: Number(d.rating) || 5,
          message: String(d.message || ""),
          location: d.location ? String(d.location) : undefined,
          createdAt: String(d.created_at || d.createdAt || new Date().toISOString()),
          verified: Boolean(d.verified ?? true),
        }));

        // Replace local cache with authoritative database dataset to ensure deleted reviews are removed
        localStorage.setItem(LOCAL_STORAGE_KEY_FEEDBACK, JSON.stringify(mapped));
        return mapped;
      }
    } catch (err) {
      console.debug("Feedbacks sync skipped, using cache:", err);
    }
  }

  return local;
}

const SUBMISSION_COOLDOWN_KEY = "mgm_last_feedback_timestamp";
const COOLDOWN_SECONDS = 30;

export async function addFeedback(
  feedback: Omit<FeedbackItem, "id" | "createdAt" | "verified"> & { honeypot?: string },
): Promise<FeedbackItem> {
  // 1. Honeypot check (trap automated bot spam)
  if (feedback.honeypot && feedback.honeypot.trim().length > 0) {
    throw new Error("Bot submission detected.");
  }

  // 2. Client submission rate limiting (cooldown)
  if (typeof window !== "undefined") {
    const lastTime = localStorage.getItem(SUBMISSION_COOLDOWN_KEY);
    if (lastTime) {
      const elapsed = (Date.now() - parseInt(lastTime, 10)) / 1000;
      if (elapsed < COOLDOWN_SECONDS) {
        throw new Error(
          `Please wait ${Math.ceil(COOLDOWN_SECONDS - elapsed)} seconds before submitting another feedback.`,
        );
      }
    }
  }

  // 3. Input sanitization & validation
  const cleanName = feedback.name.trim().slice(0, 100);
  const cleanMessage = feedback.message.trim().slice(0, 1000);
  const cleanLocation = feedback.location ? feedback.location.trim().slice(0, 100) : undefined;
  const cleanCourse = feedback.courseName ? feedback.courseName.trim().slice(0, 100) : undefined;
  const cleanRating = Math.max(1, Math.min(5, Math.round(feedback.rating || 5)));

  if (!cleanName || cleanName.length < 2) {
    throw new Error("Name must be at least 2 characters.");
  }
  if (!cleanMessage || cleanMessage.length < 5) {
    throw new Error("Feedback message must be at least 5 characters.");
  }

  const generatedId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `fb-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const newFeedback: FeedbackItem = {
    id: generatedId,
    name: cleanName,
    role: feedback.role === "parent" ? "parent" : "student",
    courseName: cleanCourse,
    rating: cleanRating,
    message: cleanMessage,
    location: cleanLocation,
    createdAt: new Date().toISOString(),
    verified: false,
  };

  const current = getLocalFeedbacks();
  const updated = [newFeedback, ...current];

  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY_FEEDBACK, JSON.stringify(updated));
    localStorage.setItem(SUBMISSION_COOLDOWN_KEY, Date.now().toString());
  }

  if (isSupabaseConfigured()) {
    try {
      await withTimeout(
        supabase.from("feedbacks").insert({
          id: newFeedback.id,
          name: newFeedback.name,
          role: newFeedback.role,
          course_name: newFeedback.courseName,
          rating: newFeedback.rating,
          message: newFeedback.message,
          location: newFeedback.location || null,
          created_at: newFeedback.createdAt,
          verified: true,
        }),
        3500,
      );
    } catch (error) {
      console.warn("Supabase feedback insert offline, saved locally:", error);
    }
  }

  return newFeedback;
}

export async function deleteFeedback(id: string): Promise<boolean> {
  const current = getLocalFeedbacks();
  const updated = current.filter((f) => f.id !== id);

  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY_FEEDBACK, JSON.stringify(updated));
  }

  if (isSupabaseConfigured()) {
    try {
      await withTimeout(supabase.from("feedbacks").delete().eq("id", id), 3500);
    } catch (error) {
      console.warn("Supabase feedback delete offline, deleted locally:", error);
    }
  }

  return true;
}
