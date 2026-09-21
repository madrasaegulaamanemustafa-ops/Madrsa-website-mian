import { supabase, withTimeout, isSupabaseConfigured } from "./supabase";

export interface StudentResult {
  id: string;
  name: string;
  rollNo: string;
  classId: string;
  className: string;
  rank: number; // 1, 2, 3, 4, 5, etc.
  percentage: number; // e.g. 98.5
  marksObtained?: string; // e.g. "492/500"
  grade: string; // e.g. "Mumtaz (A+)", "Jayyid Jiddan (A)"
  remarks?: string;
  term: string; // e.g. "Monthly Fatah-E-Battle — 2026"
  avatar?: string;
  dateAdded?: string;
}

interface SupabaseClassRow {
  id: string;
  name: string;
  description?: string | null;
  order_num?: number | null;
}

interface SupabaseStudentRow {
  id: string;
  name: string;
  roll_no?: string | null;
  class_id: string;
  class_name: string;
  rank: number;
  percentage: number | string;
  marks_obtained?: string | null;
  grade?: string | null;
  remarks?: string | null;
  term?: string | null;
  avatar?: string | null;
}

export interface ClassCategory {
  id: string;
  name: string;
  description?: string;
  order: number;
}

export interface ResultsSettings {
  displayLimit: number; // e.g. 5 for top 5, or 3, 10, 0 for all
  activeExamTitle: string;
  sessionYear: string;
  adminPin?: string;
  adminEmail: string;
  adminPassword: string;
  showRollNumbers: boolean;
  showPercentages: boolean;
  bannerNotice: string;
}

export const DEFAULT_SETTINGS: ResultsSettings = {
  displayLimit: 5,
  activeExamTitle: "Monthly Fatah-E-Battle & Exam Results",
  sessionYear: "2026–27",
  adminPin: "7860",
  adminEmail: "admin@madrasa.com",
  adminPassword: "madrasa@admin786",
  showRollNumbers: true,
  showPercentages: true,
  bannerNotice:
    "Mubarakbaad to all successful students and their proud parents. May Allah ﷻ grant steadfastness in Deeni knowledge.",
};

export const DEFAULT_CLASSES: ClassCategory[] = [
  { id: "dars-e-nizami", name: "Dars-e-Nizami (Aalimiyat)", order: 1 },
  { id: "tajweed", name: "Tajweed & Hifz", order: 2 },
  { id: "muballiga", name: "Sisters Muballiga (Aalima)", order: 3 },
  { id: "kids-special", name: "Kids Special Batch", order: 4 },
  { id: "qirat", name: "Qirat & Tilawat", order: 5 },
  { id: "urdu-basic", name: "Basic Urdu & Deeniyat", order: 6 },
  { id: "naat-bayan", name: "Naat, Hamd & Bayan", order: 7 },
  { id: "english", name: "English Speaking for Deen", order: 8 },
];

export const DEFAULT_STUDENTS: StudentResult[] = [
  // Dars-e-Nizami
  {
    id: "dn-1",
    name: "Zaid Ahmad Khan",
    rollNo: "MGM-2026-042",
    classId: "dars-e-nizami",
    className: "Dars-e-Nizami (Aalimiyat)",
    rank: 1,
    percentage: 98.6,
    marksObtained: "493/500",
    grade: "Mumtaz (A+)",
    remarks: "1st Position — Gold Medalist",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "dn-2",
    name: "Muhammad Umar Farooq",
    rollNo: "MGM-2026-089",
    classId: "dars-e-nizami",
    className: "Dars-e-Nizami (Aalimiyat)",
    rank: 2,
    percentage: 97.2,
    marksObtained: "486/500",
    grade: "Mumtaz (A+)",
    remarks: "2nd Position — Silver Medalist",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "dn-3",
    name: "Abdullah Razvi",
    rollNo: "MGM-2026-114",
    classId: "dars-e-nizami",
    className: "Dars-e-Nizami (Aalimiyat)",
    rank: 3,
    percentage: 95.8,
    marksObtained: "479/500",
    grade: "Mumtaz (A+)",
    remarks: "3rd Position — Bronze Medalist",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "dn-4",
    name: "Bilal Qadri",
    rollNo: "MGM-2026-018",
    classId: "dars-e-nizami",
    className: "Dars-e-Nizami (Aalimiyat)",
    rank: 4,
    percentage: 94.0,
    marksObtained: "470/500",
    grade: "Jayyid Jiddan (A)",
    remarks: "4th Position Distinction",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "dn-5",
    name: "Hasan Raza",
    rollNo: "MGM-2026-075",
    classId: "dars-e-nizami",
    className: "Dars-e-Nizami (Aalimiyat)",
    rank: 5,
    percentage: 92.5,
    marksObtained: "462/500",
    grade: "Jayyid Jiddan (A)",
    remarks: "5th Position Distinction",
    term: "Monthly Fatah-E-Battle — 2026",
  },

  // Muballiga Sisters
  {
    id: "mb-1",
    name: "Fatima Zahra",
    rollNo: "MGM-SIS-007",
    classId: "muballiga",
    className: "Sisters Muballiga (Aalima)",
    rank: 1,
    percentage: 99.0,
    marksObtained: "495/500",
    grade: "Mumtaz (A+)",
    remarks: "1st Position — Gold Medalist",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "mb-2",
    name: "Ayesha Siddiqua",
    rollNo: "MGM-SIS-034",
    classId: "muballiga",
    className: "Sisters Muballiga (Aalima)",
    rank: 2,
    percentage: 97.8,
    marksObtained: "489/500",
    grade: "Mumtaz (A+)",
    remarks: "2nd Position — Silver Medalist",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "mb-3",
    name: "Mariam Noori",
    rollNo: "MGM-SIS-052",
    classId: "muballiga",
    className: "Sisters Muballiga (Aalima)",
    rank: 3,
    percentage: 96.4,
    marksObtained: "482/500",
    grade: "Mumtaz (A+)",
    remarks: "3rd Position — Bronze Medalist",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "mb-4",
    name: "Zainab Bano",
    rollNo: "MGM-SIS-021",
    classId: "muballiga",
    className: "Sisters Muballiga (Aalima)",
    rank: 4,
    percentage: 94.6,
    marksObtained: "473/500",
    grade: "Jayyid Jiddan (A)",
    remarks: "4th Position Distinction",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "mb-5",
    name: "Kulsum Fatimah",
    rollNo: "MGM-SIS-091",
    classId: "muballiga",
    className: "Sisters Muballiga (Aalima)",
    rank: 5,
    percentage: 93.0,
    marksObtained: "465/500",
    grade: "Jayyid Jiddan (A)",
    remarks: "5th Position Distinction",
    term: "Monthly Fatah-E-Battle — 2026",
  },

  // Kids Special
  {
    id: "kd-1",
    name: "Muhammad Ali (Age 8)",
    rollNo: "MGM-KID-012",
    classId: "kids-special",
    className: "Kids Special Batch",
    rank: 1,
    percentage: 99.5,
    marksObtained: "199/200",
    grade: "Mumtaz Star (A+)",
    remarks: "Kids Champion & Quiz Winner",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "kd-2",
    name: "Ibrahim Khan (Age 7)",
    rollNo: "MGM-KID-045",
    classId: "kids-special",
    className: "Kids Special Batch",
    rank: 2,
    percentage: 98.0,
    marksObtained: "196/200",
    grade: "Mumtaz Star (A+)",
    remarks: "Kids 2nd Position",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "kd-3",
    name: "Sara Fatimah (Age 9)",
    rollNo: "MGM-KID-083",
    classId: "kids-special",
    className: "Kids Special Batch",
    rank: 3,
    percentage: 96.5,
    marksObtained: "193/200",
    grade: "Mumtaz (A+)",
    remarks: "Kids 3rd Position",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "kd-4",
    name: "Yusuf Raza (Age 6)",
    rollNo: "MGM-KID-029",
    classId: "kids-special",
    className: "Kids Special Batch",
    rank: 4,
    percentage: 95.0,
    marksObtained: "190/200",
    grade: "Jayyid (A)",
    remarks: "Kids 4th Position",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "kd-5",
    name: "Hamza Qadri (Age 10)",
    rollNo: "MGM-KID-099",
    classId: "kids-special",
    className: "Kids Special Batch",
    rank: 5,
    percentage: 93.5,
    marksObtained: "187/200",
    grade: "Jayyid (A)",
    remarks: "Kids 5th Position",
    term: "Monthly Fatah-E-Battle — 2026",
  },

  // Tajweed & Hifz
  {
    id: "tj-1",
    name: "Hafiz Huzaifa",
    rollNo: "MGM-TJ-005",
    classId: "tajweed",
    className: "Tajweed & Hifz",
    rank: 1,
    percentage: 99.2,
    marksObtained: "496/500",
    grade: "Mumtaz (A+)",
    remarks: "Flawless Makharij & Ahkaam",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "tj-2",
    name: "Hafiz Saqib Raza",
    rollNo: "MGM-TJ-022",
    classId: "tajweed",
    className: "Tajweed & Hifz",
    rank: 2,
    percentage: 97.5,
    marksObtained: "487/500",
    grade: "Mumtaz (A+)",
    remarks: "2nd Position",
    term: "Monthly Fatah-E-Battle — 2026",
  },
  {
    id: "tj-3",
    name: "Abdul Rahman",
    rollNo: "MGM-TJ-061",
    classId: "tajweed",
    className: "Tajweed & Hifz",
    rank: 3,
    percentage: 95.5,
    marksObtained: "477/500",
    grade: "Mumtaz (A+)",
    remarks: "3rd Position",
    term: "Monthly Fatah-E-Battle — 2026",
  },
];

// Helper functions for LocalStorage caching + Firestore live sync
const LOCAL_STORAGE_KEY_STUDENTS = "mgm_results_students_v1";
const LOCAL_STORAGE_KEY_CLASSES = "mgm_results_classes_v1";
const LOCAL_STORAGE_KEY_SETTINGS = "mgm_results_settings_v1";

// ----------------- LOCAL-FIRST ZERO-LATENCY STORAGE -----------------

export function getLocalSettings(): ResultsSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY_SETTINGS);
    if (local) return { ...DEFAULT_SETTINGS, ...JSON.parse(local) };
  } catch (err) {
    console.warn("Error reading local settings:", err);
  }
  return DEFAULT_SETTINGS;
}

export function getLocalClasses(): ClassCategory[] {
  if (typeof window === "undefined") return DEFAULT_CLASSES;
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY_CLASSES);
    if (local) return JSON.parse(local);
  } catch (err) {
    console.warn("Error reading local classes:", err);
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_CLASSES, JSON.stringify(DEFAULT_CLASSES));
  } catch (err) {
    console.warn("Error caching default classes:", err);
  }
  return DEFAULT_CLASSES;
}

export function getLocalStudents(): StudentResult[] {
  if (typeof window === "undefined") return DEFAULT_STUDENTS;
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY_STUDENTS);
    if (local) return JSON.parse(local);
  } catch (err) {
    console.warn("Error reading local students:", err);
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_STUDENTS, JSON.stringify(DEFAULT_STUDENTS));
  } catch (err) {
    console.warn("Error caching default students:", err);
  }
  return DEFAULT_STUDENTS;
}

// 1. Settings
export async function getResultsSettings(): Promise<ResultsSettings> {
  const current = getLocalSettings();

  // Non-blocking background sync only if Supabase is configured
  if (typeof window !== "undefined" && isSupabaseConfigured()) {
    withTimeout(supabase.from("settings").select("*").eq("id", "results_config").single(), 2500)
      .then(({ data, error }) => {
        if (data && !error) {
          const mapped: ResultsSettings = {
            displayLimit: data.display_limit ?? DEFAULT_SETTINGS.displayLimit,
            activeExamTitle: data.active_exam_title || DEFAULT_SETTINGS.activeExamTitle,
            sessionYear: data.session_year || DEFAULT_SETTINGS.sessionYear,
            adminPin: data.admin_pin || DEFAULT_SETTINGS.adminPin,
            adminEmail: data.admin_email || DEFAULT_SETTINGS.adminEmail,
            adminPassword: data.admin_password || DEFAULT_SETTINGS.adminPassword,
            showRollNumbers: data.show_roll_numbers ?? true,
            showPercentages: data.show_percentages ?? true,
            bannerNotice: data.banner_notice || DEFAULT_SETTINGS.bannerNotice,
          };
          localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(mapped));
        }
      })
      .catch((err) => {
        console.debug("Settings sync skipped:", err?.message);
      });
  }

  return current;
}

export async function saveResultsSettings(settings: ResultsSettings): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }
  if (!isSupabaseConfigured()) return;

  try {
    await withTimeout(
      supabase.from("settings").upsert({
        id: "results_config",
        display_limit: settings.displayLimit,
        active_exam_title: settings.activeExamTitle,
        session_year: settings.sessionYear,
        admin_pin: settings.adminPin || "7860",
        admin_email: settings.adminEmail,
        admin_password: settings.adminPassword,
        show_roll_numbers: settings.showRollNumbers,
        show_percentages: settings.showPercentages,
        banner_notice: settings.bannerNotice,
      }),
      2500,
    );
  } catch (error) {
    console.warn("Supabase sync offline/timed out, saved locally:", error);
  }
}

// 2. Classes
export async function getClasses(): Promise<ClassCategory[]> {
  const current = getLocalClasses();

  // Background sync only if Supabase is configured
  if (typeof window !== "undefined" && isSupabaseConfigured()) {
    withTimeout(supabase.from("classes").select("*").order("order_num", { ascending: true }), 2500)
      .then(({ data, error }) => {
        if (data && data.length > 0 && !error) {
          const mapped: ClassCategory[] = (data as SupabaseClassRow[]).map((d) => ({
            id: d.id,
            name: d.name,
            description: d.description || undefined,
            order: d.order_num ?? 1,
          }));
          localStorage.setItem(LOCAL_STORAGE_KEY_CLASSES, JSON.stringify(mapped));
        }
      })
      .catch((err) => {
        console.debug("Classes sync skipped:", err?.message);
      });
  }

  return current;
}

export async function saveClass(cls: ClassCategory): Promise<void> {
  const current = getLocalClasses();
  const existingIndex = current.findIndex((c) => c.id === cls.id);
  let updated: ClassCategory[];
  if (existingIndex >= 0) {
    updated = current.map((c) => (c.id === cls.id ? cls : c));
  } else {
    updated = [...current, cls];
  }
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY_CLASSES, JSON.stringify(updated));
  }
  if (!isSupabaseConfigured()) return;

  try {
    await withTimeout(
      supabase.from("classes").upsert({
        id: cls.id,
        name: cls.name,
        description: cls.description || null,
        order_num: cls.order,
      }),
      2500,
    );
  } catch (error) {
    console.warn("Supabase saveClass offline/timed out, saved locally:", error);
  }
}

export async function deleteClass(classId: string): Promise<void> {
  const current = getLocalClasses();
  const updated = current.filter((c) => c.id !== classId);
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY_CLASSES, JSON.stringify(updated));
  }
  if (!isSupabaseConfigured()) return;

  try {
    await withTimeout(supabase.from("classes").delete().eq("id", classId), 2500);
  } catch (error) {
    console.warn("Supabase deleteClass offline/timed out, saved locally:", error);
  }
}

// 3. Students
export async function getStudents(): Promise<StudentResult[]> {
  const current = getLocalStudents();

  // Background sync only if Supabase is configured
  if (typeof window !== "undefined" && isSupabaseConfigured()) {
    withTimeout(supabase.from("students").select("*").order("rank", { ascending: true }), 2500)
      .then(({ data, error }) => {
        if (data && data.length > 0 && !error) {
          const mapped: StudentResult[] = (data as SupabaseStudentRow[]).map((d) => ({
            id: d.id,
            name: d.name,
            rollNo: d.roll_no || "",
            classId: d.class_id,
            className: d.class_name,
            rank: d.rank,
            percentage: Number(d.percentage) || 0,
            marksObtained: d.marks_obtained || "",
            grade: d.grade || "Mumtaz (A+)",
            remarks: d.remarks || "",
            term: d.term || "Annual Examination",
            avatar: d.avatar || undefined,
          }));
          localStorage.setItem(LOCAL_STORAGE_KEY_STUDENTS, JSON.stringify(mapped));
        }
      })
      .catch((err) => {
        console.debug("Students sync skipped:", err?.message);
      });
  }

  return current;
}

export async function saveStudent(student: StudentResult): Promise<void> {
  const current = getLocalStudents();
  const existingIndex = current.findIndex((s) => s.id === student.id);
  let updated: StudentResult[];
  if (existingIndex >= 0) {
    updated = current.map((s) => (s.id === student.id ? student : s));
  } else {
    updated = [...current, student];
  }
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY_STUDENTS, JSON.stringify(updated));
  }
  if (!isSupabaseConfigured()) return;

  try {
    await withTimeout(
      supabase.from("students").upsert({
        id: student.id,
        name: student.name,
        roll_no: student.rollNo || null,
        class_id: student.classId,
        class_name: student.className,
        rank: student.rank,
        percentage: student.percentage,
        marks_obtained: student.marksObtained || null,
        grade: student.grade || "Mumtaz (A+)",
        remarks: student.remarks || null,
        term: student.term,
        avatar: student.avatar || null,
      }),
      2500,
    );
  } catch (error) {
    console.warn("Supabase saveStudent offline/timed out, saved locally:", error);
  }
}

export async function deleteStudent(studentId: string): Promise<void> {
  const current = getLocalStudents();
  const updated = current.filter((s) => s.id !== studentId);
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY_STUDENTS, JSON.stringify(updated));
  }
  if (!isSupabaseConfigured()) return;

  try {
    await withTimeout(supabase.from("students").delete().eq("id", studentId), 2500);
  } catch (error) {
    console.warn("Supabase deleteStudent offline/timed out, saved locally:", error);
  }
}

// Seed initial dataset directly to LocalStorage and bulk-sync to Supabase in a single batch
export async function seedAllDefaultsToSupabase(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(LOCAL_STORAGE_KEY_CLASSES, JSON.stringify(DEFAULT_CLASSES));
    localStorage.setItem(LOCAL_STORAGE_KEY_STUDENTS, JSON.stringify(DEFAULT_STUDENTS));
  }
  if (!isSupabaseConfigured()) return;

  try {
    // 1. Settings
    await withTimeout(
      supabase.from("settings").upsert({
        id: "results_config",
        display_limit: DEFAULT_SETTINGS.displayLimit,
        active_exam_title: DEFAULT_SETTINGS.activeExamTitle,
        session_year: DEFAULT_SETTINGS.sessionYear,
        admin_pin: DEFAULT_SETTINGS.adminPin || "7860",
        admin_email: DEFAULT_SETTINGS.adminEmail,
        admin_password: DEFAULT_SETTINGS.adminPassword,
        show_roll_numbers: DEFAULT_SETTINGS.showRollNumbers,
        show_percentages: DEFAULT_SETTINGS.showPercentages,
        banner_notice: DEFAULT_SETTINGS.bannerNotice,
      }),
      3000,
    );

    // 2. Bulk upsert classes
    const classesPayload = DEFAULT_CLASSES.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description || null,
      order_num: c.order,
    }));
    await withTimeout(supabase.from("classes").upsert(classesPayload), 3000);

    // 3. Bulk upsert students
    const studentsPayload = DEFAULT_STUDENTS.map((s) => ({
      id: s.id,
      name: s.name,
      roll_no: s.rollNo || null,
      class_id: s.classId,
      class_name: s.className,
      rank: s.rank,
      percentage: s.percentage,
      marks_obtained: s.marksObtained || null,
      grade: s.grade || "Mumtaz (A+)",
      remarks: s.remarks || null,
      term: s.term,
      avatar: s.avatar || null,
    }));
    await withTimeout(supabase.from("students").upsert(studentsPayload), 3000);
  } catch (error) {
    console.warn("Supabase bulk seed skipped/timed out, defaults loaded locally:", error);
  }
}

// Alias for database seeding
export const seedAllDefaultsToDatabase = seedAllDefaultsToSupabase;
