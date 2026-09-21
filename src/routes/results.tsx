import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LangProvider, useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { StickyCTA } from "@/components/site/StickyCTA";
import { DuroodPlayer } from "@/components/site/DuroodPlayer";
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
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  return (
    <LangProvider>
      <Navbar />
      <main className="min-h-screen bg-[#FAF8F5] pt-28 pb-24">
        <ResultsContent />
      </main>
      <Footer />
      <StickyCTA />
      <DuroodPlayer />
    </LangProvider>
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

  const getStudentsForClass = (classId: string) => {
    let list = students.filter((s) => s.classId === classId);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q),
      );
    }

    list.sort((a, b) => a.rank - b.rank);

    // Apply display limit if set (> 0) and not searching
    if (settings.displayLimit > 0 && !searchQuery.trim()) {
      list = list.slice(0, settings.displayLimit);
    }

    return list;
  };

  const handleShareResult = (student: StudentResult) => {
    const text = `🏆 Mubarakbaad! ${student.name} achieved Rank #${student.rank} (${student.percentage}%) in ${student.className} at Madrasa E Gulaaman E Mustafa ﷺ! Check all results at: ${window.location.origin}/results`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, "_blank");
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
          {filteredClasses.map((cls) => {
            const classStudents = getStudentsForClass(cls.id);
            if (classStudents.length === 0 && searchQuery) return null;

            const top3 = classStudents.slice(0, 3);
            const remaining = classStudents.slice(3);

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
                    No student results found matching your search in this class.
                  </div>
                ) : (
                  <>
                    {/* Dynamic Podium Layout (1, 2, or 3+ students) */}
                    {top3.length === 1 && (
                      <div className="max-w-md mx-auto mb-8">
                        <PodiumCard
                          student={top3[0]}
                          rank={1}
                          badgeColor="bg-amber-400 text-amber-950 border-amber-300"
                          ribbonColor="from-amber-500 via-amber-300 to-amber-500"
                          glowClass="border-amber-400 shadow-gold gold-border-glow"
                          isCenter={true}
                          onShare={() => handleShareResult(top3[0])}
                          showRoll={settings.showRollNumbers}
                          showPct={settings.showPercentages}
                        />
                      </div>
                    )}

                    {top3.length === 2 && (
                      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <PodiumCard
                          student={top3[0]}
                          rank={1}
                          badgeColor="bg-amber-400 text-amber-950 border-amber-300"
                          ribbonColor="from-amber-500 via-amber-300 to-amber-500"
                          glowClass="border-amber-400 shadow-gold gold-border-glow"
                          isCenter={true}
                          onShare={() => handleShareResult(top3[0])}
                          showRoll={settings.showRollNumbers}
                          showPct={settings.showPercentages}
                        />
                        <PodiumCard
                          student={top3[1]}
                          rank={2}
                          badgeColor="bg-slate-200 text-slate-800 border-slate-300"
                          ribbonColor="from-slate-400 to-slate-200"
                          glowClass="border-slate-300/80 shadow-md"
                          onShare={() => handleShareResult(top3[1])}
                          showRoll={settings.showRollNumbers}
                          showPct={settings.showPercentages}
                        />
                      </div>
                    )}

                    {top3.length >= 3 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch">
                        {/* Rank 2 (Silver) */}
                        <PodiumCard
                          student={top3[1]}
                          rank={2}
                          badgeColor="bg-slate-200 text-slate-800 border-slate-300"
                          ribbonColor="from-slate-400 to-slate-200"
                          glowClass="border-slate-300/80 shadow-md"
                          onShare={() => handleShareResult(top3[1])}
                          showRoll={settings.showRollNumbers}
                          showPct={settings.showPercentages}
                        />

                        {/* Rank 1 (Gold - Elevated in Center) */}
                        <div className="md:-translate-y-4">
                          <PodiumCard
                            student={top3[0]}
                            rank={1}
                            badgeColor="bg-amber-400 text-amber-950 border-amber-300"
                            ribbonColor="from-amber-500 via-amber-300 to-amber-500"
                            glowClass="border-amber-400 shadow-gold gold-border-glow"
                            isCenter={true}
                            onShare={() => handleShareResult(top3[0])}
                            showRoll={settings.showRollNumbers}
                            showPct={settings.showPercentages}
                          />
                        </div>

                        {/* Rank 3 (Bronze) */}
                        <PodiumCard
                          student={top3[2]}
                          rank={3}
                          badgeColor="bg-amber-700/20 text-amber-900 border-amber-600/30"
                          ribbonColor="from-amber-700 to-amber-500"
                          glowClass="border-amber-700/40 shadow-md"
                          onShare={() => handleShareResult(top3[2])}
                          showRoll={settings.showRollNumbers}
                          showPct={settings.showPercentages}
                        />
                      </div>
                    )}

                    {/* Rank 4, 5+ List Table */}
                    {remaining.length > 0 && (
                      <div className="rounded-3xl bg-white border border-emerald-deep/10 shadow-soft overflow-hidden">
                        <div className="px-6 py-3.5 bg-emerald-soft/60 border-b border-emerald-deep/10 text-xs font-black text-emerald-deep uppercase tracking-wider flex items-center justify-between">
                          <span>Honorable Mention Rankers</span>
                          <span>Score & Grade</span>
                        </div>
                        <div className="divide-y divide-emerald-deep/10">
                          {remaining.map((st) => (
                            <div
                              key={st.id}
                              className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-emerald-soft/30 transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <div className="h-8 w-8 rounded-full bg-emerald-deep/10 text-emerald-deep font-extrabold text-xs grid place-items-center shrink-0">
                                  #{st.rank}
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
                    )}
                  </>
                )}
              </section>
            );
          })}
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

// Subcomponent: Top 3 Podium Card
function PodiumCard({
  student,
  rank,
  badgeColor,
  ribbonColor,
  glowClass,
  isCenter = false,
  onShare,
  showRoll,
  showPct,
}: {
  student: StudentResult;
  rank: number;
  badgeColor: string;
  ribbonColor: string;
  glowClass: string;
  isCenter?: boolean;
  onShare: () => void;
  showRoll: boolean;
  showPct: boolean;
}) {
  const medalIcons = {
    1: <Trophy className="h-6 w-6 text-amber-900" />,
    2: <Medal className="h-6 w-6 text-slate-800" />,
    3: <Medal className="h-6 w-6 text-amber-900" />,
  };

  const rankTitles = {
    1: "1st Position — Gold",
    2: "2nd Position — Silver",
    3: "3rd Position — Bronze",
  };

  return (
    <div
      className={`relative rounded-3xl bg-white border-2 ${glowClass} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] shadow-soft`}
    >
      {/* Top Rank Ribbon */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${badgeColor}`}
        >
          {medalIcons[rank as 1 | 2 | 3]}
          <span>#{rank} Rank</span>
        </div>

        <button
          onClick={onShare}
          type="button"
          title="Share on WhatsApp"
          className="h-8 w-8 rounded-full bg-emerald-soft text-emerald-deep grid place-items-center hover:bg-emerald-deep hover:text-white transition-colors cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Student Details */}
      <div className="text-center my-3">
        <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-emerald-deep/10 to-gold/20 border-2 border-gold/40 grid place-items-center mb-3 text-emerald-deep font-display text-2xl font-black">
          {student.name.charAt(0)}
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-emerald-deep mb-1 leading-tight">
          {student.name}
        </h3>

        {showRoll && student.rollNo && (
          <p className="text-xs font-semibold text-foreground/60 mb-2">
            Roll: <span className="font-mono">{student.rollNo}</span>
          </p>
        )}

        <div className="inline-block px-3 py-1 rounded-full bg-emerald-soft text-[11px] font-bold text-emerald-deep">
          {rankTitles[rank as 1 | 2 | 3]}
        </div>
      </div>

      {/* Score and Percentage */}
      <div className="pt-4 border-t border-emerald-deep/10 flex items-center justify-between">
        <div className="text-start">
          <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
            Marks Obtained
          </div>
          <div className="text-xs font-bold text-emerald-deep">
            {student.marksObtained || "Verified"}
          </div>
        </div>

        {showPct && (
          <div className="text-end">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              Percentage
            </div>
            <div className="font-display text-2xl font-black text-gradient-gold">
              {student.percentage}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
