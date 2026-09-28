import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  getStudents,
  getClasses,
  getResultsSettings,
  getLocalStudents,
  getLocalClasses,
  getLocalSettings,
  saveStudent,
  deleteStudent,
  saveStudentsBulk,
  deleteStudentsBulk,
  saveClass,
  deleteClass,
  saveResultsSettings,
  seedAllDefaultsToDatabase,
  restoreBackupDataset,
  loginAdminWithSupabase,
  logoutAdminFromSupabase,
  getAdminAuthSession,
  StudentResult,
  ClassCategory,
  ResultsSettings,
  DEFAULT_SETTINGS,
  DEFAULT_CLASSES,
  DEFAULT_STUDENTS,
} from "@/lib/resultsService";
import {
  getFeedbacks,
  getLocalFeedbacks,
  deleteFeedback,
  FeedbackItem,
  FeedbackRole,
} from "@/lib/feedbackService";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  Mail,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit2,
  Save,
  RefreshCw,
  Sliders,
  FolderPlus,
  CheckCircle2,
  ArrowLeft,
  Download,
  Upload,
  Eye,
  EyeOff,
  MessageSquare,
  Star,
  Heart,
  GraduationCap,
  Users,
  Shield,
  AlertTriangle,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/admin/results")({
  head: () => ({
    meta: [
      {
        title: "Admin Results Portal — Madrasa E Gulaaman E Mustafa ﷺ",
      },
    ],
  }),
  component: AdminResultsPage,
});

function AdminResultsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      <AdminContent />
      <footer className="py-6 border-t border-emerald-deep/10 text-center text-xs text-foreground/60">
        Madrasa E Gulaaman E Mustafa ﷺ — Secure Administrative Portal
      </footer>
    </div>
  );
}

function AdminContent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("mgm_admin_authenticated") === "true";
    }
    return false;
  });

  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [students, setStudents] = useState<StudentResult[]>(() =>
    typeof window !== "undefined" ? getLocalStudents() : DEFAULT_STUDENTS,
  );
  const [classes, setClasses] = useState<ClassCategory[]>(() =>
    typeof window !== "undefined" ? getLocalClasses() : DEFAULT_CLASSES,
  );
  const [settings, setSettings] = useState<ResultsSettings>(() =>
    typeof window !== "undefined" ? getLocalSettings() : DEFAULT_SETTINGS,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  // Class Management State
  const [classModalOpen, setClassModalOpen] = useState<boolean>(false);
  const [newClassName, setNewClassName] = useState<string>("");
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [editingClassName, setEditingClassName] = useState<string>("");

  // Student Form State (Add / Edit)
  const [studentModalOpen, setStudentModalOpen] = useState<boolean>(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [formStudent, setFormStudent] = useState<Partial<StudentResult>>({
    name: "",
    rollNo: "",
    classId: "",
    rank: 1,
    percentage: 95,
    marksObtained: "",
  });

  // Active Admin View Tab
  const [activeAdminTab, setActiveAdminTab] = useState<"results" | "feedback">("results");

  // Feedback Moderation State
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() =>
    typeof window !== "undefined" ? getLocalFeedbacks() : [],
  );
  const [feedbackRoleFilter, setFeedbackRoleFilter] = useState<"all" | FeedbackRole>("all");
  const [feedbackSearch, setFeedbackSearch] = useState<string>("");
  const [feedbackToDelete, setFeedbackToDelete] = useState<FeedbackItem | null>(null);
  const [deletingFeedback, setDeletingFeedback] = useState<boolean>(false);

  // Fast background data synchronizer (only called after authentication)
  const loadAllData = async () => {
    try {
      const [stuData, clsData, setDoc, fbData] = await Promise.all([
        getStudents(),
        getClasses(),
        getResultsSettings(),
        getFeedbacks(),
      ]);
      setStudents(stuData);
      setClasses(clsData);
      setSettings(setDoc);
      setFeedbacks(fbData);
    } catch (e) {
      console.error("Background sync error:", e);
    }
  };

  useEffect(() => {
    async function checkActiveSession() {
      const session = await getAdminAuthSession();
      if (session) {
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("mgm_admin_authenticated", "true");
        }
      }
    }
    checkActiveSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // Handle Delete Feedback in Admin Portal
  const handleDeleteFeedbackConfirm = async () => {
    if (!feedbackToDelete) return;
    try {
      setDeletingFeedback(true);
      await deleteFeedback(feedbackToDelete.id);
      setFeedbacks((prev) => prev.filter((f) => f.id !== feedbackToDelete.id));
      showStatus("success", `Feedback from "${feedbackToDelete.name}" deleted successfully.`);
      setFeedbackToDelete(null);
    } catch (err) {
      console.error("Failed to delete feedback:", err);
      showStatus("error", "Failed to delete feedback.");
    } finally {
      setDeletingFeedback(false);
    }
  };

  // Filtered feedbacks for Admin
  const filteredAdminFeedbacks = useMemo(() => {
    return feedbacks.filter((fb) => {
      if (feedbackRoleFilter !== "all" && fb.role !== feedbackRoleFilter) {
        return false;
      }
      if (feedbackSearch.trim()) {
        const q = feedbackSearch.toLowerCase().trim();
        const matchesName = (fb.name || "").toLowerCase().includes(q);
        const matchesMsg = (fb.message || "").toLowerCase().includes(q);
        return matchesName || matchesMsg;
      }
      return true;
    });
  }, [feedbacks, feedbackRoleFilter, feedbackSearch]);

  // Secure Supabase Admin Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = enteredEmail.trim().toLowerCase();
    const cleanPass = enteredPassword.trim();

    if (!cleanEmail || !cleanPass) {
      setLoginError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setLoginError("");

    try {
      const res = await loginAdminWithSupabase(cleanEmail, cleanPass);
      if (res.success) {
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("mgm_admin_authenticated", "true");
        }
      } else {
        setLoginError(res.error || "Invalid credentials. Please verify your email and password.");
      }
    } catch (err) {
      setLoginError("Login error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdminFromSupabase();
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("mgm_admin_authenticated");
    }
    setEnteredEmail("");
    setEnteredPassword("");
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveResultsSettings(settings);
      showStatus("success", "Display settings successfully saved!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      showStatus("error", "Failed to save settings.");
    }
  };

  // Class Actions
  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = newClassName.trim();
    if (!name) return;

    const id =
      name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now().toString().slice(-4);
    const newCls: ClassCategory = {
      id,
      name,
      order: classes.length + 1,
    };

    try {
      await saveClass(newCls);
      setClasses((prev) => [...prev, newCls]);
      setNewClassName("");
      setClassModalOpen(false);
      showStatus("success", `Class "${newCls.name}" added successfully!`);
    } catch (error) {
      console.error("Failed to add class:", error);
      showStatus("error", "Failed to add class.");
    }
  };

  const handleDeleteClass = async (classId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the class "${name}" and all its student ranks?`))
      return;

    try {
      const studentsToDelete = students.filter((s) => s.classId === classId);
      await deleteClass(classId);
      if (studentsToDelete.length > 0) {
        await deleteStudentsBulk(studentsToDelete.map((s) => s.id));
      }
      setClasses((prev) => prev.filter((c) => c.id !== classId));
      setStudents((prev) => prev.filter((s) => s.classId !== classId));
      showStatus("success", `Class "${name}" and associated students deleted.`);
    } catch (error) {
      console.error("Failed to delete class and students:", error);
      showStatus("error", "Failed to delete class and associated students.");
    }
  };

  const handleUpdateClassName = async (classId: string) => {
    const newName = editingClassName.trim();
    if (!newName) return;
    const cls = classes.find((c) => c.id === classId);
    if (!cls) return;

    const updatedCls: ClassCategory = { ...cls, name: newName };
    const updatedStudents = students.map((s) =>
      s.classId === classId ? { ...s, className: newName } : s,
    );

    try {
      await saveClass(updatedCls);
      const affectedStudents = updatedStudents.filter((s) => s.classId === classId);
      if (affectedStudents.length > 0) {
        await saveStudentsBulk(affectedStudents);
      }
      setClasses((prev) => prev.map((c) => (c.id === classId ? updatedCls : c)));
      setStudents(updatedStudents);
      setEditingClassId(null);
      showStatus("success", `Class renamed to "${newName}" and students updated.`);
    } catch (error) {
      console.error("Failed to rename class:", error);
      showStatus("error", "Failed to update class name.");
    }
  };

  // Student Actions
  const openAddStudentModal = (defaultClassId?: string) => {
    setEditingStudentId(null);
    setFormStudent({
      name: "",
      rollNo: `MGM-2026-${Math.floor(100 + Math.random() * 900)}`,
      classId: defaultClassId || classes[0]?.id || "",
      rank: 1,
      percentage: 95.0,
      marksObtained: "",
      term: settings.activeExamTitle,
    });
    setStudentModalOpen(true);
  };

  const openEditStudentModal = (student: StudentResult) => {
    setEditingStudentId(student.id);
    setFormStudent({ ...student });
    setStudentModalOpen(true);
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetClassId = formStudent.classId || classes[0]?.id || "";
    if (!formStudent.name?.trim() || !targetClassId) {
      alert("Student name and class are required.");
      return;
    }

    const selectedClass = classes.find((c) => c.id === targetClassId);
    const id = editingStudentId || `stu-${Date.now()}`;
    const pct = Number(formStudent.percentage) || 0;

    const studentRecord: StudentResult = {
      id,
      name: formStudent.name.trim(),
      rollNo: formStudent.rollNo?.trim() || "",
      classId: targetClassId,
      className: selectedClass?.name || formStudent.className || "",
      rank: Number(formStudent.rank) || 1,
      percentage: pct,
      marksObtained: formStudent.marksObtained?.trim() || "",
      term: formStudent.term?.trim() || settings.activeExamTitle,
    };

    try {
      await saveStudent(studentRecord);
      if (editingStudentId) {
        setStudents((prev) => prev.map((s) => (s.id === id ? studentRecord : s)));
        showStatus("success", `Updated student "${studentRecord.name}".`);
      } else {
        setStudents((prev) => [...prev, studentRecord]);
        showStatus("success", `Added student "${studentRecord.name}".`);
      }
      setStudentModalOpen(false);
    } catch (error) {
      console.error("Failed to save student record:", error);
      showStatus("error", "Failed to save student record.");
    }
  };

  const handleDeleteStudent = async (studentId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await deleteStudent(studentId);
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
      showStatus("success", `Deleted student "${name}".`);
    } catch (error) {
      console.error("Failed to delete student:", error);
      showStatus("error", "Failed to delete student.");
    }
  };

  // Reset & Sync Initial Default Batches
  const handleSeedDefaults = async () => {
    if (
      !confirm(
        "This will reset and load the standard default student batches to your database. Proceed?",
      )
    )
      return;
    try {
      setLoading(true);
      await seedAllDefaultsToDatabase();
      await loadAllData();
      showStatus("success", "Initial student and class dataset successfully synced!");
    } catch (e) {
      console.error(e);
      showStatus("error", "Seeding failed. Please check network connection.");
    } finally {
      setLoading(false);
    }
  };

  // Backup Export / Import
  const handleExportJson = () => {
    const backupData = {
      settings,
      classes,
      students,
      exportedAt: new Date().toISOString(),
    };
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `madrasa_results_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showStatus("success", "Backup JSON downloaded successfully.");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        setLoading(true);
        const rawJson = JSON.parse(event.target?.result as string);
        if (
          rawJson &&
          typeof rawJson === "object" &&
          !("__proto__" in rawJson) &&
          Array.isArray(rawJson.classes) &&
          Array.isArray(rawJson.students)
        ) {
          const sanitizedClasses: ClassCategory[] = rawJson.classes
            .filter(
              (c: unknown): c is Record<string, unknown> => c !== null && typeof c === "object",
            )
            .map((c: Record<string, unknown>, idx: number) => ({
              id: c.id
                ? String(c.id)
                    .slice(0, 80)
                    .replace(/[^\w-]/g, "")
                : `cls-${Date.now()}-${idx}`,
              name: c.name ? String(c.name).slice(0, 150).trim() : `Class ${idx + 1}`,
              description: c.description ? String(c.description).slice(0, 300).trim() : undefined,
              order: Math.max(1, Number(c.order) || idx + 1),
            }));

          const sanitizedStudents: StudentResult[] = rawJson.students
            .filter(
              (s: unknown): s is Record<string, unknown> => s !== null && typeof s === "object",
            )
            .map((s: Record<string, unknown>, idx: number) => ({
              id: s.id
                ? String(s.id)
                    .slice(0, 80)
                    .replace(/[^\w-]/g, "")
                : `stu-${Date.now()}-${idx}`,
              name: s.name ? String(s.name).slice(0, 150).trim() : "Student",
              rollNo: s.rollNo ? String(s.rollNo).slice(0, 60).trim() : "",
              classId: s.classId
                ? String(s.classId)
                    .slice(0, 80)
                    .replace(/[^\w-]/g, "")
                : sanitizedClasses[0]?.id || "",
              className: s.className
                ? String(s.className).slice(0, 150).trim()
                : sanitizedClasses[0]?.name || "",
              rank: Math.max(1, Math.min(1000, Number(s.rank) || 1)),
              percentage: Math.max(0, Math.min(100, Number(s.percentage) || 0)),
              marksObtained: s.marksObtained ? String(s.marksObtained).slice(0, 60).trim() : "",
              remarks: s.remarks ? String(s.remarks).slice(0, 200).trim() : "",
              term: s.term
                ? String(s.term).slice(0, 150).trim()
                : rawJson.settings &&
                    typeof rawJson.settings === "object" &&
                    "activeExamTitle" in rawJson.settings
                  ? String(rawJson.settings.activeExamTitle)
                  : settings.activeExamTitle,
              avatar:
                s.avatar && typeof s.avatar === "string" && s.avatar.startsWith("https://")
                  ? s.avatar.slice(0, 500)
                  : undefined,
            }));

          const safeSettings: ResultsSettings | undefined =
            rawJson.settings && typeof rawJson.settings === "object"
              ? {
                  displayLimit: Math.max(
                    0,
                    Math.min(
                      100,
                      Number((rawJson.settings as Record<string, unknown>).displayLimit) ||
                        DEFAULT_SETTINGS.displayLimit,
                    ),
                  ),
                  activeExamTitle: String(
                    (rawJson.settings as Record<string, unknown>).activeExamTitle ||
                      DEFAULT_SETTINGS.activeExamTitle,
                  ).slice(0, 150),
                  sessionYear: String(
                    (rawJson.settings as Record<string, unknown>).sessionYear ||
                      DEFAULT_SETTINGS.sessionYear,
                  ).slice(0, 50),
                  showRollNumbers: Boolean(
                    (rawJson.settings as Record<string, unknown>).showRollNumbers ?? true,
                  ),
                  showPercentages: Boolean(
                    (rawJson.settings as Record<string, unknown>).showPercentages ?? true,
                  ),
                  bannerNotice: String(
                    (rawJson.settings as Record<string, unknown>).bannerNotice ||
                      DEFAULT_SETTINGS.bannerNotice,
                  ).slice(0, 300),
                }
              : undefined;

          await restoreBackupDataset({
            settings: safeSettings,
            classes: sanitizedClasses,
            students: sanitizedStudents,
          });
          await loadAllData();
          showStatus("success", "Imported backup dataset successfully!");
        } else {
          showStatus(
            "error",
            "Invalid backup JSON format: 'classes' and 'students' arrays are required.",
          );
        }
      } catch (err) {
        console.error("JSON parse or import error:", err);
        showStatus("error", "Failed to parse JSON file.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // 1. Authentication Gate (Email & Password)
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 max-w-md py-16">
        <div className="rounded-[2.5rem] bg-white border border-gold/40 p-8 sm:p-10 shadow-luxe text-center gold-border-glow">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-emerald text-white grid place-items-center mb-6 shadow-md">
            <Lock className="h-8 w-8 text-gold" />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-deep mb-2">
            Admin Results Portal
          </h1>
          <p className="text-xs sm:text-sm text-foreground/70 mb-6 font-medium">
            Enter your admin email and password to manage student rankings and exam sessions.
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label
                htmlFor="admin-username"
                className="block text-[11px] font-black uppercase tracking-wider text-emerald-deep mb-1.5"
              >
                Admin Email / Username
              </label>
              <div className="relative">
                <input
                  id="admin-username"
                  name="username"
                  type="text"
                  value={enteredEmail}
                  onChange={(e) => {
                    setEnteredEmail(e.target.value);
                    setLoginError("");
                  }}
                  placeholder="Enter admin email or username"
                  autoComplete="username"
                  autoFocus
                  required
                  className="w-full text-left text-sm font-semibold rounded-2xl border-2 border-emerald-deep/20 pl-10 pr-4 py-3 text-emerald-deep focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 bg-emerald-soft/20"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-deep/50" />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-[11px] font-black uppercase tracking-wider text-emerald-deep mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={enteredPassword}
                  onChange={(e) => {
                    setEnteredPassword(e.target.value);
                    setLoginError("");
                  }}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full text-left text-sm font-semibold rounded-2xl border-2 border-emerald-deep/20 pl-10 pr-11 py-3 text-emerald-deep focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 bg-emerald-soft/20"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-deep/50" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-deep/60 hover:text-emerald-deep p-1 cursor-pointer"
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-red-600 font-bold bg-red-50 py-2 px-3 rounded-xl border border-red-200">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-emerald text-white py-3.5 font-black uppercase text-xs tracking-widest shadow-soft hover:scale-[1.02] active:scale-98 transition-transform cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <Unlock className="h-4 w-4" />
              <span>Log In to Dashboard</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-emerald-deep/10 text-xs text-muted-foreground">
            <Link
              to="/results"
              className="hover:text-emerald-deep flex items-center justify-center gap-1 font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Public Results</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-deep/15 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-amber-700 tracking-wider mb-1">
            <Unlock className="h-3.5 w-3.5 text-amber-600" />
            <span>Authorized Administrator</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-emerald-deep">
            {activeAdminTab === "results"
              ? "Results & Student Management"
              : "Reviews & Feedback Moderation"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={async () => {
              await loadAllData();
              showStatus("success", "All data and reviews refreshed from cloud database.");
            }}
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl bg-white text-emerald-deep px-4 py-2.5 text-xs font-extrabold border border-emerald-deep/15 hover:bg-emerald-soft transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className="h-3.5 w-3.5 text-emerald-700" />
            <span>Refresh Data</span>
          </button>

          <Link
            to={activeAdminTab === "results" ? "/results" : "/feedback"}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-soft text-emerald-deep px-4 py-2.5 text-xs font-extrabold border border-emerald-deep/15 hover:bg-emerald-deep hover:text-white transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>{activeAdminTab === "results" ? "View Live Results" : "View Live Reviews"}</span>
          </Link>

          <button
            onClick={handleLogout}
            type="button"
            className="rounded-2xl bg-black/5 text-foreground/70 px-4 py-2.5 text-xs font-bold hover:bg-black/10 transition-colors cursor-pointer"
          >
            Lock Session
          </button>
        </div>
      </div>

      {/* Admin Module Switcher Tabs (Mobile & Desktop Responsive) */}
      <div className="w-full grid grid-cols-2 gap-2 mb-6 p-1.5 rounded-2xl bg-emerald-deep/[0.06] border border-emerald-deep/[0.12] max-w-xl">
        <button
          type="button"
          onClick={() => setActiveAdminTab("results")}
          className={`flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeAdminTab === "results"
              ? "bg-emerald-deep text-white shadow-md scale-[1.01]"
              : "text-emerald-deep/75 hover:text-emerald-deep hover:bg-white/80"
          }`}
        >
          <span>🏆 Results ({students.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveAdminTab("feedback")}
          className={`flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeAdminTab === "feedback"
              ? "bg-emerald-deep text-white shadow-md scale-[1.01]"
              : "text-emerald-deep/75 hover:text-emerald-deep hover:bg-white/80"
          }`}
        >
          <MessageSquare className="h-4 w-4 text-gold shrink-0" />
          <span>Feedback ({feedbacks.length})</span>
        </button>
      </div>

      {/* Global Status Notification */}
      {statusMsg && (
        <div
          className={`p-4 rounded-2xl mb-6 text-sm font-bold flex items-center gap-3 animate-fade-up ${
            statusMsg.type === "success"
              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
              : "bg-red-100 text-red-900 border border-red-300"
          }`}
        >
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Active Tab Content: 1. Results & Students Management */}
      {activeAdminTab === "results" && (
        <>
          {/* Section 1: Global Display Settings & Session Title */}
          <div className="rounded-3xl bg-white border border-emerald-deep/15 p-6 sm:p-8 shadow-soft mb-10">
            <div className="flex items-center gap-2.5 text-emerald-deep font-extrabold text-lg mb-6 pb-3 border-b border-emerald-deep/10">
              <Sliders className="h-5 w-5 text-amber-600" />
              <span>Results Page Display Settings</span>
            </div>

            <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-2">
                  Top Students to Display Per Class
                </label>
                <select
                  value={settings.displayLimit}
                  onChange={(e) =>
                    setSettings({ ...settings, displayLimit: Number(e.target.value) })
                  }
                  className="w-full rounded-2xl border border-emerald-deep/20 px-4 py-3 text-sm font-bold text-emerald-deep focus:outline-none focus:border-amber-500 bg-white"
                >
                  <option value={3}>Top 3 Students (Podium Only)</option>
                  <option value={5}>Top 5 Students (Recommended)</option>
                  <option value={10}>Top 10 Students</option>
                  <option value={0}>All Ranked Students</option>
                </select>
                <p className="text-[11px] text-muted-foreground mt-1.5 font-medium">
                  Controls how many student ranks appear publicly on the Results page.
                </p>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-2">
                  Active Exam / Term Name
                </label>
                <input
                  type="text"
                  value={settings.activeExamTitle}
                  onChange={(e) => setSettings({ ...settings, activeExamTitle: e.target.value })}
                  placeholder="e.g. Monthly Fatah-E-Battle — 2026"
                  className="w-full rounded-2xl border border-emerald-deep/20 px-4 py-3 text-sm font-bold text-emerald-deep focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-2">
                  Academic Session Year
                </label>
                <input
                  type="text"
                  value={settings.sessionYear}
                  onChange={(e) => setSettings({ ...settings, sessionYear: e.target.value })}
                  placeholder="e.g. 2026–27"
                  className="w-full rounded-2xl border border-emerald-deep/20 px-4 py-3 text-sm font-bold text-emerald-deep focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-2">
                  Mubarakbaad / Announcement Notice
                </label>
                <input
                  type="text"
                  value={settings.bannerNotice}
                  onChange={(e) => setSettings({ ...settings, bannerNotice: e.target.value })}
                  placeholder="Congratulations message for parents and students"
                  className="w-full rounded-2xl border border-emerald-deep/20 px-4 py-3 text-sm font-medium text-emerald-deep focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-emerald text-white px-7 py-3 font-extrabold text-xs uppercase tracking-widest shadow-luxe hover:scale-105 transition-transform cursor-pointer"
                >
                  <Save className="h-4 w-4 text-gold" />
                  <span>Save Display Configuration</span>
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Manage Classes */}
          <div className="rounded-3xl bg-white border border-emerald-deep/15 p-6 sm:p-8 shadow-soft mb-10">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-emerald-deep/10 mb-6">
              <div className="flex items-center gap-2.5 text-emerald-deep font-extrabold text-lg">
                <FolderPlus className="h-5 w-5 text-amber-600" />
                <span>Manage Courses & Classes ({classes.length})</span>
              </div>

              <button
                onClick={() => {
                  setNewClassName("");
                  setClassModalOpen(true);
                }}
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-gold text-gold-foreground px-5 py-2.5 font-black text-xs uppercase tracking-widest shadow-gold hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Course / Class</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {classes.map((cls) => {
                const stuCount = students.filter((s) => s.classId === cls.id).length;
                const isEditing = editingClassId === cls.id;

                return (
                  <div
                    key={cls.id}
                    className="rounded-2xl bg-emerald-soft/40 border border-emerald-deep/10 p-4 flex flex-col justify-between"
                  >
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editingClassName}
                          onChange={(e) => setEditingClassName(e.target.value)}
                          className="w-full rounded-xl border border-amber-500 px-3 py-1.5 text-xs font-bold text-emerald-deep bg-white"
                          autoFocus
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateClassName(cls.id)}
                            type="button"
                            className="rounded-xl bg-emerald-deep text-white px-3 py-1 text-[11px] font-bold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingClassId(null)}
                            type="button"
                            className="rounded-xl bg-black/10 px-3 py-1 text-[11px] font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <h3 className="font-display font-bold text-base text-emerald-deep mb-1">
                            {cls.name}
                          </h3>
                          <div className="text-[11px] font-semibold text-foreground/60">
                            {stuCount} Student Ranks
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-2 border-t border-emerald-deep/10">
                          <button
                            onClick={() => openAddStudentModal(cls.id)}
                            type="button"
                            className="text-[11px] font-black text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                            <span>Add Student</span>
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingClassId(cls.id);
                                setEditingClassName(cls.name);
                              }}
                              type="button"
                              title="Rename Class"
                              className="p-1 text-foreground/50 hover:text-emerald-deep rounded-md hover:bg-white"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteClass(cls.id, cls.name)}
                              type="button"
                              title="Delete Class"
                              className="p-1 text-red-500/70 hover:text-red-700 rounded-md hover:bg-red-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Student Results Directory CRUD */}
          <div className="rounded-3xl bg-white border border-emerald-deep/15 p-6 sm:p-8 shadow-soft mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-deep/10 mb-6">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-emerald-deep">
                  Student Results & Ranks ({students.length})
                </h2>
                <p className="text-xs text-foreground/60 font-medium">
                  Manage student names, roll numbers, percentage scores, and rank positions.
                </p>
              </div>

              <button
                onClick={() => openAddStudentModal()}
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-gold text-gold-foreground px-6 py-3 font-black text-xs uppercase tracking-widest shadow-gold hover:scale-105 transition-transform cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Student Result</span>
              </button>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-emerald-deep">
                <thead className="bg-emerald-soft/60 uppercase tracking-wider text-[11px] font-black border-b border-emerald-deep/10">
                  <tr>
                    <th className="p-3.5">Rank</th>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Roll No</th>
                    <th className="p-3.5">Class</th>
                    <th className="p-3.5">Percentage / Marks</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-deep/10">
                  {(() => {
                    // Group by class ID and calculate tied ranks per class
                    const classGroups = new Map<string, StudentResult[]>();
                    for (const st of students) {
                      const cKey = st.classId || "General";
                      if (!classGroups.has(cKey)) classGroups.set(cKey, []);
                      classGroups.get(cKey)!.push(st);
                    }

                    const rankedAll: (StudentResult & { computedRank: number; isTie: boolean })[] =
                      [];
                    const sortedClassKeys = Array.from(classGroups.keys()).sort();

                    for (const cKey of sortedClassKeys) {
                      const group = classGroups.get(cKey)!;
                      const sortedGroup = [...group].sort((a, b) => {
                        const pctA = Number(a.percentage) || 0;
                        const pctB = Number(b.percentage) || 0;
                        if (pctB !== pctA) return pctB - pctA;
                        return (a.name || "").localeCompare(b.name || "");
                      });

                      const pctCounts = new Map<number, number>();
                      for (const s of sortedGroup) {
                        const pct = Number(s.percentage) || 0;
                        pctCounts.set(pct, (pctCounts.get(pct) || 0) + 1);
                      }

                      let currentRank = 1;
                      let prevPct: number | null = null;

                      sortedGroup.forEach((s, idx) => {
                        const pct = Number(s.percentage) || 0;
                        if (idx === 0) {
                          currentRank = 1;
                        } else if (pct !== prevPct) {
                          currentRank = currentRank + 1;
                        }
                        prevPct = pct;
                        const isTie = (pctCounts.get(pct) || 0) > 1;
                        rankedAll.push({
                          ...s,
                          computedRank: currentRank,
                          isTie,
                        });
                      });
                    }

                    return rankedAll.map((st) => (
                      <tr key={st.id} className="hover:bg-emerald-soft/20 transition-colors">
                        <td className="p-3.5">
                          <span
                            className={`inline-flex items-center justify-center gap-1 px-2 h-6 rounded-full font-black text-[11px] ${
                              st.computedRank === 1
                                ? "bg-amber-400 text-amber-950"
                                : st.computedRank === 2
                                  ? "bg-slate-300 text-slate-900"
                                  : st.computedRank === 3
                                    ? "bg-amber-700/30 text-amber-900"
                                    : "bg-emerald-deep/10 text-emerald-deep"
                            }`}
                          >
                            <span>#{st.computedRank}</span>
                            {st.isTie && <span className="text-[9px] opacity-85">Tie</span>}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold font-display text-sm">{st.name}</td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          {st.rollNo || "—"}
                        </td>
                        <td className="p-3.5 font-semibold">{st.className}</td>
                        <td className="p-3.5 font-bold text-amber-800">
                          {st.percentage}% {st.marksObtained && `(${st.marksObtained})`}
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => openEditStudentModal(st)}
                            type="button"
                            className="p-1.5 text-emerald-deep hover:bg-emerald-soft rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(st.id, st.name)}
                            type="button"
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Backup, Import, and Database Sync */}
          <div className="rounded-3xl bg-white border border-emerald-deep/15 p-6 sm:p-8 shadow-soft">
            <h3 className="font-display text-lg font-extrabold text-emerald-deep mb-2">
              Database Backup & Sync
            </h3>
            <p className="text-xs text-foreground/60 mb-6 font-medium">
              Download a full JSON backup of all results or re-sync pre-populated batches directly
              to your database.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleExportJson}
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl bg-white border border-emerald-deep/20 text-emerald-deep px-5 py-2.5 text-xs font-bold hover:bg-emerald-soft transition-colors cursor-pointer shadow-subtle"
              >
                <Download className="h-4 w-4 text-amber-600" />
                <span>Download Backup JSON</span>
              </button>

              <label className="inline-flex items-center gap-2 rounded-2xl bg-white border border-emerald-deep/20 text-emerald-deep px-5 py-2.5 text-xs font-bold hover:bg-emerald-soft transition-colors cursor-pointer shadow-subtle">
                <Upload className="h-4 w-4 text-emerald-deep" />
                <span>Restore from JSON</span>
                <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
              </label>

              <button
                onClick={handleSeedDefaults}
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-900 px-5 py-2.5 text-xs font-extrabold hover:bg-amber-500/25 transition-colors cursor-pointer shadow-subtle ml-auto"
              >
                <RefreshCw className="h-4 w-4 text-amber-700" />
                <span>Reset & Sync Default Batches</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Active Tab Content: 2. Feedback & Reviews Moderation */}
      {activeAdminTab === "feedback" && (
        <div className="space-y-8 animate-fade-up">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-emerald-deep/15 shadow-soft">
              <div className="text-[11px] font-black uppercase tracking-wider text-emerald-deep/60 mb-1">
                Total Reviews
              </div>
              <div className="text-3xl font-black text-emerald-deep">{feedbacks.length}</div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-emerald-deep/15 shadow-soft">
              <div className="text-[11px] font-black uppercase tracking-wider text-emerald-deep/60 mb-1">
                Student Reviews
              </div>
              <div className="text-3xl font-black text-emerald-700">
                {feedbacks.filter((f) => f.role === "student").length}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-emerald-deep/15 shadow-soft">
              <div className="text-[11px] font-black uppercase tracking-wider text-emerald-deep/60 mb-1">
                Parent Reviews
              </div>
              <div className="text-3xl font-black text-amber-700">
                {feedbacks.filter((f) => f.role === "parent").length}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-emerald-deep/15 shadow-soft">
              <div className="text-[11px] font-black uppercase tracking-wider text-emerald-deep/60 mb-1">
                Avg Rating
              </div>
              <div className="text-3xl font-black text-amber-600 flex items-center gap-1">
                <span>
                  {(
                    feedbacks.reduce((acc, f) => acc + (f.rating || 5), 0) / (feedbacks.length || 1)
                  ).toFixed(1)}
                </span>
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Feedback Moderation Controls & Search */}
          <div className="rounded-3xl bg-white border border-emerald-deep/15 p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-emerald-deep/10">
              <div>
                <h2 className="font-display text-xl font-extrabold text-emerald-deep flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-600" />
                  <span>Moderate Public Reviews</span>
                </h2>
                <p className="text-xs text-foreground/70 mt-0.5">
                  Review submitted feedback from students and parents. Delete any inappropriate or
                  spam content.
                </p>
              </div>

              <button
                onClick={loadAllData}
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-soft text-emerald-deep text-xs font-bold hover:bg-emerald-100 transition-colors self-start sm:self-auto cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Refresh Reviews</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackRoleFilter("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    feedbackRoleFilter === "all"
                      ? "bg-emerald-deep text-white shadow-soft"
                      : "bg-emerald-soft/50 text-emerald-deep hover:bg-emerald-soft"
                  }`}
                >
                  All ({feedbacks.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackRoleFilter("student")}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    feedbackRoleFilter === "student"
                      ? "bg-emerald-deep text-white shadow-soft"
                      : "bg-emerald-soft/50 text-emerald-deep hover:bg-emerald-soft"
                  }`}
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>Students ({feedbacks.filter((f) => f.role === "student").length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackRoleFilter("parent")}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    feedbackRoleFilter === "parent"
                      ? "bg-emerald-deep text-white shadow-soft"
                      : "bg-emerald-soft/50 text-emerald-deep hover:bg-emerald-soft"
                  }`}
                >
                  <Heart className="h-3.5 w-3.5" />
                  <span>Parents ({feedbacks.filter((f) => f.role === "parent").length})</span>
                </button>
              </div>

              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-deep/50" />
                <input
                  type="text"
                  value={feedbackSearch}
                  onChange={(e) => setFeedbackSearch(e.target.value)}
                  placeholder="Search reviewer or message..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-emerald-deep/20 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                />
              </div>
            </div>

            {/* Feedbacks Moderation Cards Grid */}
            {filteredAdminFeedbacks.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-emerald-deep/15 rounded-2xl">
                <MessageSquare className="h-10 w-10 text-emerald-deep/30 mx-auto mb-2" />
                <p className="text-sm font-bold text-emerald-deep">
                  No reviews found matching criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAdminFeedbacks.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white border border-emerald-deep/12 shadow-soft hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              item.role === "student"
                                ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                                : "bg-amber-100 text-amber-950 border border-amber-200"
                            }`}
                          >
                            {item.role === "student" ? (
                              <>
                                <GraduationCap className="h-3 w-3" />
                                <span>Student</span>
                              </>
                            ) : (
                              <>
                                <Heart className="h-3 w-3" />
                                <span>Parent</span>
                              </>
                            )}
                          </span>
                          <span className="font-extrabold text-sm text-emerald-deep">
                            {item.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`h-3.5 w-3.5 ${
                                idx < item.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-slate-200 text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p dir="auto" className="text-xs text-foreground/85 leading-relaxed mb-4">
                        "{item.message}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-emerald-deep/10 flex items-center justify-between text-[11px] text-foreground/60">
                      <span>ID: {String(item.id || "").slice(0, 12)}</span>

                      <button
                        type="button"
                        onClick={() => setFeedbackToDelete(item)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-600 hover:text-white font-bold transition-colors cursor-pointer border border-red-200"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete Review</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Add/Edit Student */}
      {studentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-up">
          <div className="bg-white rounded-3xl border border-gold/40 p-6 sm:p-8 max-w-lg w-full shadow-2xl gold-border-glow">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-deep/10 mb-6">
              <h3 className="font-display text-xl font-extrabold text-emerald-deep">
                {editingStudentId ? "Edit Student Result" : "Add Student Result"}
              </h3>
              <button
                onClick={() => setStudentModalOpen(false)}
                type="button"
                className="text-muted-foreground hover:text-emerald-deep p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formStudent.name || ""}
                  onChange={(e) => setFormStudent({ ...formStudent, name: e.target.value })}
                  placeholder="e.g. Zaid Ahmad Khan"
                  className="w-full rounded-xl border border-emerald-deep/20 px-4 py-2.5 text-sm font-semibold text-emerald-deep focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-1">
                    Class / Course *
                  </label>
                  <select
                    value={formStudent.classId || ""}
                    onChange={(e) => setFormStudent({ ...formStudent, classId: e.target.value })}
                    className="w-full rounded-xl border border-emerald-deep/20 px-3 py-2.5 text-xs font-bold text-emerald-deep focus:outline-none focus:border-amber-500 bg-white"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-1">
                    Rank Position (1, 2, 3...)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={formStudent.rank ?? 1}
                    onChange={(e) =>
                      setFormStudent({
                        ...formStudent,
                        rank:
                          e.target.value === ""
                            ? 1
                            : Math.max(1, parseInt(e.target.value, 10) || 1),
                      })
                    }
                    className="w-full rounded-xl border border-emerald-deep/20 px-4 py-2.5 text-sm font-bold text-emerald-deep focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-1">
                    Percentage (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    max={100}
                    value={formStudent.percentage ?? ""}
                    onChange={(e) =>
                      setFormStudent({
                        ...formStudent,
                        percentage: e.target.value === "" ? 0 : parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full rounded-xl border border-emerald-deep/20 px-4 py-2.5 text-sm font-bold text-emerald-deep focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-1">
                    Marks / Total
                  </label>
                  <input
                    type="text"
                    value={formStudent.marksObtained || ""}
                    onChange={(e) =>
                      setFormStudent({ ...formStudent, marksObtained: e.target.value })
                    }
                    placeholder="e.g. 493/500"
                    className="w-full rounded-xl border border-emerald-deep/20 px-4 py-2.5 text-sm font-semibold text-emerald-deep focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-1">
                  Roll Number
                </label>
                <input
                  type="text"
                  value={formStudent.rollNo || ""}
                  onChange={(e) => setFormStudent({ ...formStudent, rollNo: e.target.value })}
                  placeholder="e.g. MGM-2026-042"
                  className="w-full rounded-xl border border-emerald-deep/20 px-4 py-2.5 text-sm font-mono text-emerald-deep focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-emerald-deep/10">
                <button
                  onClick={() => setStudentModalOpen(false)}
                  type="button"
                  className="rounded-2xl bg-black/5 text-foreground/70 px-5 py-2.5 text-xs font-bold hover:bg-black/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-gradient-emerald text-white px-6 py-2.5 text-xs font-black uppercase tracking-wider shadow-luxe hover:scale-105 transition-transform cursor-pointer"
                >
                  {editingStudentId ? "Update Result" : "Save Result"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Class Modal Popup (Styled like Student Modal) */}
      {classModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 animate-fade-up">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-md w-full border border-gold/40 shadow-luxe gold-border-glow">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-deep/10 mb-6">
              <div className="flex items-center gap-2 text-emerald-deep font-extrabold text-lg">
                <FolderPlus className="h-5 w-5 text-amber-600" />
                <span>Add New Course / Class</span>
              </div>
              <button
                onClick={() => setClassModalOpen(false)}
                type="button"
                className="text-foreground/40 hover:text-foreground p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddClass} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-1.5">
                  Course / Class Name *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g. Arabic Grammar, Tajweed & Qirat"
                  className="w-full rounded-xl border border-emerald-deep/20 px-4 py-3 text-sm font-semibold text-emerald-deep focus:outline-none focus:border-amber-500 bg-emerald-soft/10"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-emerald-deep/10">
                <button
                  onClick={() => setClassModalOpen(false)}
                  type="button"
                  className="rounded-2xl bg-black/5 text-foreground/70 px-5 py-2.5 text-xs font-bold hover:bg-black/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-gradient-emerald text-white px-6 py-2.5 text-xs font-black uppercase tracking-wider shadow-luxe hover:scale-105 transition-transform cursor-pointer"
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Feedback Confirmation Modal Popup */}
      {feedbackToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/65 backdrop-blur-sm animate-fade-up"
          onClick={() => !deletingFeedback && setFeedbackToDelete(null)}
        >
          <div
            className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-red-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="h-14 w-14 mx-auto rounded-2xl bg-red-100 text-red-600 grid place-items-center mb-3">
                <Trash2 className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-extrabold text-red-950">
                Delete Feedback?
              </h3>
              <p className="text-xs text-foreground/75 mt-1">
                Are you sure you want to permanently remove this review from the public website?
              </p>
            </div>

            <div className="rounded-2xl bg-red-50/70 border border-red-100 p-4 mb-6 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-xs text-red-950">{feedbackToDelete.name}</span>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-red-200 text-red-900">
                  {feedbackToDelete.role}
                </span>
              </div>
              <p className="text-xs text-foreground/80 italic line-clamp-3">
                "{feedbackToDelete.message}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={deletingFeedback}
                onClick={() => setFeedbackToDelete(null)}
                className="rounded-xl border border-foreground/20 text-foreground/80 py-2.5 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deletingFeedback}
                onClick={handleDeleteFeedbackConfirm}
                className="rounded-xl bg-red-600 text-white py-2.5 text-xs font-extrabold hover:bg-red-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Trash2 className="h-4 w-4" />
                <span>{deletingFeedback ? "Deleting..." : "Yes, Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
