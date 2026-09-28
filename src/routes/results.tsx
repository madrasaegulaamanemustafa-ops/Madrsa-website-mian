import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import {
  getStudents,
  getClasses,
  getResultsSettings,
  getLocalStudents,
  getLocalClasses,
  getLocalSettings,
  StudentResult,
  ClassCategory,
  ResultsSettings,
  DEFAULT_SETTINGS,
  DEFAULT_CLASSES,
  DEFAULT_STUDENTS,
} from "@/lib/resultsService";
import {
  Trophy,
  Medal,
  Award,
  Search,
  Share2,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  GraduationCap,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      {
        title: "Student Results & Top Rankers — Madrasa E Gulaaman E Mustafa ﷺ",
      },
      {
        name: "description",
        content:
          "Official Top 5 student results and rankers for Dars-e-Nizami, Muballiga, Tajweed, and Kids courses at Madrasa E Gulaaman E Mustafa ﷺ.",
      },
      {
        property: "og:title",
        content: "Student Results & Top Rankers — Madrasa E Gulaaman E Mustafa ﷺ",
      },
      {
        property: "og:description",
        content:
          "Top 5 position holders and monthly exam rankers at Madrasa E Gulaaman E Mustafa ﷺ.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 sm:pt-32 pb-24 min-h-screen bg-[#FAF8F5]">
        <ResultsContent />
      </main>
      <Footer />
    </>
  );
}

function ResultsContent() {
  const { dir } = useLang();
  const isRtl = dir === "rtl";

  const [students, setStudents] = useState<StudentResult[]>(() =>
    typeof window !== "undefined" ? getLocalStudents() : DEFAULT_STUDENTS,
  );
  const [classes, setClasses] = useState<ClassCategory[]>(() =>
    typeof window !== "undefined" ? getLocalClasses() : DEFAULT_CLASSES,
  );
  const [settings, setSettings] = useState<ResultsSettings>(() =>
    typeof window !== "undefined" ? getLocalSettings() : DEFAULT_SETTINGS,
  );
  const [selectedClassId, setSelectedClassId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [stuData, clsData, setDoc] = await Promise.all([
          getStudents(),
          getClasses(),
          getResultsSettings(),
        ]);
        setStudents(stuData);
        setClasses(clsData);
        setSettings(setDoc);
      } catch (e) {
        console.error("Error loading results data:", e);
      }
    }
    loadData();
  }, []);

  // Filter students by class, search query, and rank display limit
  const filteredClasses = useMemo(() => {
    if (selectedClassId === "all") {
      return classes;
    }
    return classes.filter((c) => c.id === selectedClassId);
  }, [classes, selectedClassId]);

  // Compute tied ranks where students with identical percentage share the same rank
  const computeTiedRanks = (list: StudentResult[]) => {
    // Sort descending by percentage, then by name
    const sorted = [...list].sort((a, b) => {
      const pctA = Number(a.percentage) || 0;
      const pctB = Number(b.percentage) || 0;
      if (pctB !== pctA) {
        return pctB - pctA;
      }
      return (a.name || "").localeCompare(b.name || "");
    });

    // Count frequency of each percentage to identify ties
    const pctCounts = new Map<number, number>();
    for (const s of sorted) {
      const pct = Number(s.percentage) || 0;
      pctCounts.set(pct, (pctCounts.get(pct) || 0) + 1);
    }

    let currentRank = 1;
    let prevPct: number | null = null;

    return sorted.map((s, index) => {
      const pct = Number(s.percentage) || 0;
      if (index === 0) {
        currentRank = 1;
      } else if (pct !== prevPct) {
        currentRank = currentRank + 1;
      }

      prevPct = pct;
      const isTie = (pctCounts.get(pct) || 0) > 1;

      return {
        ...s,
        computedRank: currentRank,
        isTie,
      };
    });
  };

  const getStudentsForClass = (classId: string) => {
    const list = students.filter((s) => s.classId === classId);
    const ranked = computeTiedRanks(list);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return ranked.filter(
        (s) =>
          (s.name || "").toLowerCase().includes(q) || (s.rollNo || "").toLowerCase().includes(q),
      );
    }

    // Apply display limit by rank positions (Top N Ranks, e.g. Top 5 Ranks) so tied students aren't chopped off
    if (settings.displayLimit > 0) {
      return ranked.filter((s) => s.computedRank <= settings.displayLimit);
    }

    return ranked;
  };

  const handleShareResult = (
    student: StudentResult & { computedRank?: number; isTie?: boolean },
  ) => {
    const finalRank = student.computedRank ?? student.rank;
    const tieLabel = student.isTie ? " (Tied)" : "";
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://madrasaegulaamanemustafa.com";
    const text = `🏆 Mubarakbaad! ${student.name} achieved Rank #${finalRank}${tieLabel} (${student.percentage}%) in ${student.className} at Madrasa E Gulaaman E Mustafa ﷺ! Check all results at: ${origin}/results`;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6">
      {/* Top Hero Banner */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#041d15] via-[#083023] to-[#041d15] p-8 sm:p-12 text-white text-center mb-12 shadow-luxe overflow-hidden gold-border-glow">
        <div className="absolute inset-0 pattern-overlay opacity-15 pointer-events-none" />
        <div className="absolute -top-20 right-10 w-80 h-80 bg-gold/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/50 border border-amber-400/60 px-4 sm:px-5 py-1.5 sm:py-2 mb-4 shadow-gold">
            <Trophy className="h-4 w-4 text-amber-300" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              {settings.sessionYear} Student Excellence
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            <span className="text-gradient-gold-bright">{settings.activeExamTitle}</span>
          </h1>

          <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto font-medium mb-6 leading-relaxed">
            {settings.bannerNotice}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-amber-300/90">
            <div className="flex items-center gap-1.5 bg-black/40 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <CheckCircle2 className="h-4 w-4 text-amber-300" />
              <span>Top {settings.displayLimit || "All"} Students Displayed</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Live Verified Ranks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls: Search Bar & Class Filter Tabs */}
      <div className="max-w-5xl mx-auto mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto">
          <Search
            className={`absolute ${isRtl ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-deep/50`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isRtl
                ? "طالب علم کا نام یا رول نمبر تلاش کریں..."
                : "Search student by name or roll number..."
            }
            className={`w-full rounded-2xl bg-white border border-emerald-deep/15 ${
              isRtl ? "pr-12 pl-4" : "pl-12 pr-4"
            } py-3.5 text-sm font-semibold text-emerald-deep shadow-subtle focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all`}
          />
        </div>

        {/* Class Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setSelectedClassId("all")}
            type="button"
            className={`rounded-full px-5 py-2 text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
              selectedClassId === "all"
                ? "bg-gradient-emerald text-white shadow-luxe scale-105 border border-gold/40"
                : "bg-white text-emerald-deep/80 border border-emerald-deep/15 hover:bg-emerald-soft hover:text-emerald-deep"
            }`}
          >
            All Classes ({classes.length})
          </button>
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              type="button"
              className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                selectedClassId === cls.id
                  ? "bg-gradient-emerald text-white shadow-luxe scale-105 border border-gold/40"
                  : "bg-white text-emerald-deep/80 border border-emerald-deep/15 hover:bg-emerald-soft hover:text-emerald-deep"
              }`}
            >
              {cls.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Content by Class */}
      {loading ? (
        <div className="text-center py-20">
          <div className="h-10 w-10 mx-auto border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-emerald-deep font-bold text-sm">Loading Verified Results...</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-16">
          {filteredClasses.filter((cls) => getStudentsForClass(cls.id).length > 0).length === 0 &&
          searchQuery.trim() ? (
            <div className="rounded-3xl bg-white border border-emerald-deep/15 p-10 text-center shadow-soft max-w-lg mx-auto animate-fade-up">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-soft text-emerald-deep grid place-items-center mb-4">
                <Search className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-display text-2xl font-bold text-emerald-deep mb-2">
                No Matching Student Results
              </h3>
              <p className="text-xs sm:text-sm text-foreground/70 mb-6">
                No students found matching{" "}
                <span className="font-bold text-emerald-deep">"{searchQuery.trim()}"</span> in the
                selected class filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedClassId("all");
                }}
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-emerald text-white px-6 py-2.5 text-xs font-bold shadow-soft hover:scale-105 transition-transform cursor-pointer"
              >
                <span>Clear Search & Show All</span>
              </button>
            </div>
          ) : (
            filteredClasses.map((cls) => {
              const classStudents = getStudentsForClass(cls.id);
              if (classStudents.length === 0 && searchQuery.trim()) return null;

              return (
                <section key={cls.id} className="relative">
                  {/* Class Title Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-gold/30 mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 text-amber-700 text-xs font-black uppercase tracking-widest mb-1">
                        <GraduationCap className="h-4 w-4 text-amber-600" />
                        <span>Class Results</span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-deep">
                        {cls.name}
                      </h2>
                    </div>
                    <div className="text-xs font-bold text-muted-foreground bg-white px-3.5 py-1.5 rounded-full border border-emerald-deep/10 self-start sm:self-auto shadow-subtle">
                      {classStudents.length} Top Rankers Listed
                    </div>
                  </div>

                  {classStudents.length === 0 ? (
                    <div className="rounded-3xl bg-white p-8 text-center border border-emerald-deep/10 text-muted-foreground text-sm font-medium">
                      No student results recorded for this class yet.
                    </div>
                  ) : (
                    <>
                      {/* Classic 3-Step Podium (Rank 1 Center Elevated, Rank 2 Left, Rank 3 Right) */}
                      {(() => {
                        const rank1 = classStudents.filter((s) => s.computedRank === 1);
                        const rank2 = classStudents.filter((s) => s.computedRank === 2);
                        const rank3 = classStudents.filter((s) => s.computedRank === 3);

                        // If at least one top 3 rank exists
                        if (rank1.length === 0 && rank2.length === 0 && rank3.length === 0) {
                          return null;
                        }

                        return (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-stretch">
                            {/* 2nd Place (Silver) — Left on Desktop */}
                            <div className="order-2 md:order-1">
                              <PodiumSlotCard
                                rank={2}
                                students={rank2}
                                onShare={handleShareResult}
                                showRoll={settings.showRollNumbers}
                                showPct={settings.showPercentages}
                              />
                            </div>

                            {/* 1st Place (Gold) — Center Elevated on Desktop */}
                            <div className="order-1 md:order-2 md:-translate-y-4">
                              <PodiumSlotCard
                                rank={1}
                                isCenter={true}
                                students={rank1}
                                onShare={handleShareResult}
                                showRoll={settings.showRollNumbers}
                                showPct={settings.showPercentages}
                              />
                            </div>

                            {/* 3rd Place (Bronze) — Right on Desktop */}
                            <div className="order-3 md:order-3">
                              <PodiumSlotCard
                                rank={3}
                                students={rank3}
                                onShare={handleShareResult}
                                showRoll={settings.showRollNumbers}
                                showPct={settings.showPercentages}
                              />
                            </div>
                          </div>
                        );
                      })()}

                      {/* Rank 4, 5+ List Table */}
                      {(() => {
                        const remaining = classStudents.filter((s) => s.computedRank > 3);
                        if (remaining.length === 0) return null;

                        return (
                          <div className="rounded-3xl bg-white border border-emerald-deep/10 shadow-soft overflow-hidden">
                            <div className="px-6 py-3.5 bg-emerald-soft/60 border-b border-emerald-deep/10 text-xs font-black text-emerald-deep uppercase tracking-wider flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-emerald-700" />
                                <span>Honorable Mention Rankers (Ranks 4+)</span>
                              </div>
                              <span>Marks & Percentage</span>
                            </div>
                            <div className="divide-y divide-emerald-deep/10">
                              {remaining.map((st) => (
                                <div
                                  key={st.id}
                                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-emerald-soft/30 transition-colors"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="h-8 min-w-8 px-2.5 rounded-full bg-emerald-deep/10 text-emerald-deep font-extrabold text-xs grid place-items-center shrink-0">
                                      <span>#{st.computedRank}</span>
                                      {st.isTie && (
                                        <span className="text-[9px] font-bold text-amber-800 ml-1">
                                          (Tie)
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      <div className="font-display font-bold text-lg text-emerald-deep">
                                        {st.name}
                                      </div>
                                      {settings.showRollNumbers && st.rollNo && (
                                        <div className="text-xs font-medium text-foreground/60">
                                          Roll No: {st.rollNo}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4 self-end sm:self-auto">
                                    {settings.showPercentages && (
                                      <div className="text-right">
                                        <div className="font-display font-extrabold text-lg text-emerald-deep">
                                          {st.percentage}%
                                        </div>
                                      </div>
                                    )}

                                    <button
                                      onClick={() => handleShareResult(st)}
                                      type="button"
                                      title="Share on WhatsApp"
                                      className="h-8 w-8 rounded-full bg-emerald-soft text-emerald-deep grid place-items-center hover:bg-emerald-deep hover:text-white transition-colors cursor-pointer"
                                    >
                                      <Share2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </>
                  )}
                </section>
              );
            })
          )}
        </div>
      )}

      {/* Bottom Certification Ceremony Guarantee Card */}
      <div className="max-w-4xl mx-auto mt-20 rounded-[2.5rem] bg-gradient-gold p-1.5 shadow-luxe gold-border-glow">
        <div className="rounded-[2.2rem] bg-white p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-emerald grid place-items-center mb-4 shadow-luxe">
            <Award className="h-8 w-8 text-gold" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-deep mb-2">
            Offline Hardcopy Certificate & Special Dastar Ceremony
          </h3>
          <p className="text-sm sm:text-base text-foreground/75 max-w-xl mx-auto mb-6 font-medium leading-relaxed">
            All successful students who complete their course evaluations are awarded recognized
            physical certificates delivered to their doorsteps, with special Dastar-e-Fazilat
            ceremonies for graduate Qaris and Aalimas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-emerald text-white px-8 py-3.5 font-extrabold text-sm shadow-luxe hover:scale-105 transition-all"
            >
              <span>Enroll for Next Batch</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/admin/results"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-emerald-deep p-2"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Admin Results Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponent: Top Podium Slot Card (handles 1 student or multiple tied students)
function PodiumSlotCard({
  rank,
  students,
  isCenter = false,
  onShare,
  showRoll,
  showPct,
}: {
  rank: number;
  students: (StudentResult & { computedRank?: number; isTie?: boolean })[];
  isCenter?: boolean;
  onShare: (student: StudentResult) => void;
  showRoll: boolean;
  showPct: boolean;
}) {
  if (!students || students.length === 0) {
    return null;
  }

  const isTie = students.length > 1;
  const primaryStudent = students[0];

  const getRankConfig = (r: number, tied: boolean) => {
    switch (r) {
      case 1:
        return {
          icon: <Trophy className="h-5 w-5 text-amber-950" />,
          title: tied ? "Joint 1st Position — Gold" : "1st Position — Gold",
          badgeColor: "bg-amber-400 text-amber-950 border-amber-300 shadow-gold",
          glowClass:
            "border-amber-400/90 shadow-gold bg-gradient-to-b from-amber-50/40 via-white to-white",
          avatarBg: "bg-gradient-to-br from-amber-200 to-amber-400 text-amber-950 border-amber-400",
          pctColor: "text-amber-700",
        };
      case 2:
        return {
          icon: <Medal className="h-5 w-5 text-slate-900" />,
          title: tied ? "Joint 2nd Position — Silver" : "2nd Position — Silver",
          badgeColor: "bg-slate-200 text-slate-900 border-slate-300 shadow-soft",
          glowClass:
            "border-slate-300 shadow-md bg-gradient-to-b from-slate-50/50 via-white to-white",
          avatarBg: "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-900 border-slate-300",
          pctColor: "text-slate-800",
        };
      case 3:
        return {
          icon: <Medal className="h-5 w-5 text-amber-950" />,
          title: tied ? "Joint 3rd Position — Bronze" : "3rd Position — Bronze",
          badgeColor: "bg-amber-700/20 text-amber-950 border-amber-600/30",
          glowClass:
            "border-amber-600/40 shadow-md bg-gradient-to-b from-amber-50/30 via-white to-white",
          avatarBg:
            "bg-gradient-to-br from-amber-200/80 to-amber-400/60 text-amber-950 border-amber-600/30",
          pctColor: "text-amber-900",
        };
      default:
        return {
          icon: <Award className="h-5 w-5 text-emerald-800" />,
          title: tied ? `Joint Rank #${r} Distinction` : `Rank #${r} Distinction`,
          badgeColor: "bg-emerald-deep/10 text-emerald-deep border-emerald-deep/20",
          glowClass: "border-emerald-deep/20 shadow-soft bg-white",
          avatarBg: "bg-emerald-soft text-emerald-deep border-emerald-deep/20",
          pctColor: "text-emerald-deep",
        };
    }
  };

  const config = getRankConfig(rank, isTie);

  // Single Student Display (Classic Luxury Card)
  if (!isTie) {
    return (
      <div
        className={`relative rounded-3xl border-2 ${config.glowClass} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] shadow-soft h-full`}
      >
        {/* Top Rank Ribbon */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${config.badgeColor}`}
          >
            {config.icon}
            <span>#{rank} Rank</span>
          </div>

          <button
            onClick={() => onShare(primaryStudent)}
            type="button"
            title="Share on WhatsApp"
            aria-label={`Share ${primaryStudent.name}'s result on WhatsApp`}
            className="h-9 w-9 rounded-full bg-emerald-soft text-emerald-deep grid place-items-center hover:bg-emerald-deep hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Student Details */}
        <div className="text-center my-3">
          <div
            className={`h-16 w-16 mx-auto rounded-full border-2 ${config.avatarBg} grid place-items-center mb-3 font-display text-2xl font-black shadow-subtle`}
          >
            {(primaryStudent.name?.trim()
              ? primaryStudent.name.trim().charAt(0)
              : "S"
            ).toUpperCase()}
          </div>

          <h3
            dir="auto"
            className="font-display text-xl sm:text-2xl font-extrabold text-emerald-deep mb-1 leading-tight"
          >
            {primaryStudent.name}
          </h3>

          {showRoll && primaryStudent.rollNo && (
            <p className="text-xs font-semibold text-foreground/60 mb-2">
              Roll: <span className="font-mono">{primaryStudent.rollNo}</span>
            </p>
          )}

          <div className="inline-block px-3 py-1 rounded-full bg-emerald-soft text-[11px] font-bold text-emerald-deep">
            {config.title}
          </div>
        </div>

        {/* Score and Percentage */}
        <div className="pt-4 border-t border-emerald-deep/10 flex items-center justify-between">
          <div className="text-start">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              Marks Obtained
            </div>
            <div className="text-xs font-bold text-emerald-deep">
              {primaryStudent.marksObtained || "Verified"}
            </div>
          </div>

          {showPct && (
            <div className="text-end">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                Percentage
              </div>
              <div className={`font-display text-2xl font-black ${config.pctColor}`}>
                {primaryStudent.percentage}%
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Multiple Tied Students Display in Single Podium Slot
  return (
    <div
      className={`relative rounded-3xl border-2 ${config.glowClass} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] shadow-soft h-full`}
    >
      {/* Top Rank Ribbon with Tie Badge */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${config.badgeColor}`}
        >
          {config.icon}
          <span>#{rank} Rank</span>
          <span className="text-[10px] uppercase font-black bg-black/15 px-2 py-0.5 rounded-full ml-0.5">
            {students.length} Tied
          </span>
        </div>

        <button
          onClick={() => onShare(primaryStudent)}
          type="button"
          title="Share on WhatsApp"
          className="h-8 w-8 rounded-full bg-emerald-soft text-emerald-deep grid place-items-center hover:bg-emerald-deep hover:text-white transition-colors cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Tied Students List within Slot */}
      <div className="my-2 space-y-3">
        <div className="text-center mb-3">
          <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-soft text-[11px] font-bold text-emerald-deep">
            {config.title}
          </div>
        </div>

        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {students.map((st) => (
            <div
              key={st.id}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-white/80 border border-emerald-deep/10 shadow-subtle hover:bg-emerald-soft/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full border ${config.avatarBg} grid place-items-center font-display text-sm font-black shrink-0`}
                >
                  {(st.name?.trim() ? st.name.trim().charAt(0) : "S").toUpperCase()}
                </div>
                <div>
                  <div
                    dir="auto"
                    className="font-display font-bold text-sm sm:text-base text-emerald-deep leading-snug"
                  >
                    {st.name}
                  </div>
                  {showRoll && st.rollNo && (
                    <div className="text-[11px] font-medium text-foreground/60 font-mono">
                      {st.rollNo}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {showPct && (
                  <span className={`font-display font-black text-sm ${config.pctColor}`}>
                    {st.percentage}%
                  </span>
                )}
                <button
                  onClick={() => onShare(st)}
                  type="button"
                  title={`Share ${st.name}'s result`}
                  className="h-7 w-7 rounded-full bg-emerald-soft text-emerald-deep grid place-items-center hover:bg-emerald-deep hover:text-white transition-colors cursor-pointer"
                >
                  <Share2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score and Percentage Shared Summary */}
      <div className="pt-4 border-t border-emerald-deep/10 flex items-center justify-between mt-2">
        <div className="text-start">
          <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
            Shared Score
          </div>
          <div className="text-xs font-bold text-emerald-deep">
            {primaryStudent.marksObtained || "Verified"}
          </div>
        </div>

        {showPct && (
          <div className="text-end">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              Percentage
            </div>
            <div className={`font-display text-2xl font-black ${config.pctColor}`}>
              {primaryStudent.percentage}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
