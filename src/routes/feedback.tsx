import { useState, useEffect, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import {
  getFeedbacks,
  getLocalFeedbacks,
  addFeedback,
  FeedbackItem,
  FeedbackRole,
} from "@/lib/feedbackService";
import {
  Star,
  MessageSquarePlus,
  Users,
  GraduationCap,
  Heart,
  CheckCircle2,
  Sparkles,
  Search,
  Share2,
  ArrowRight,
  Send,
  X,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      {
        title: "Student & Parent Reviews — Madrasa E Gulaaman E Mustafa ﷺ",
      },
      {
        name: "description",
        content:
          "Read genuine reviews and feedback from students and parents of Madrasa E Gulaaman E Mustafa ﷺ. Share your own learning experience with no sign-in required.",
      },
    ],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 sm:pt-32 pb-24 min-h-screen bg-[#FAF8F5]">
        <FeedbackContent />
      </main>
      <Footer />
    </>
  );
}

function FeedbackContent() {
  const { dir } = useLang();
  const isRtl = dir === "rtl";

  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() =>
    typeof window !== "undefined" ? getLocalFeedbacks() : [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<"all" | FeedbackRole>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Form State - only Name, Role, Rating, Message
  const [formData, setFormData] = useState<{
    name: string;
    role: FeedbackRole;
    rating: number;
    message: string;
  }>({
    name: "",
    role: "student",
    rating: 5,
    message: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getFeedbacks();
        setFeedbacks(data);
      } catch (e) {
        console.error("Error loading feedbacks:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtered feedbacks
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((fb) => {
      // Role filter
      if (selectedRole !== "all" && fb.role !== selectedRole) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = (fb.name || "").toLowerCase().includes(q);
        const matchesMsg = (fb.message || "").toLowerCase().includes(q);
        return matchesName || matchesMsg;
      }
      return true;
    });
  }, [feedbacks, selectedRole, searchQuery]);

  // Handle Submit Feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Please enter your name and feedback message.");
      return;
    }

    try {
      setSubmitting(true);
      const newFb = await addFeedback({
        name: formData.name.trim(),
        role: formData.role,
        rating: formData.rating,
        message: formData.message.trim(),
      });

      setFeedbacks((prev) => [newFb, ...prev]);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        role: "student",
        rating: 5,
        message: "",
      });

      setTimeout(() => {
        setSubmitSuccess(false);
        setModalOpen(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to add feedback:", err);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = (item: FeedbackItem) => {
    const roleTitle = item.role === "student" ? "Student" : "Parent";
    const text = `⭐ "${item.message}"\n— ${item.name} (${roleTitle}) at Madrasa E Gulaaman E Mustafa ﷺ.\nRead all reviews at: ${window.location.origin}/feedback`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, "_blank");
  };

  const studentCount = feedbacks.filter((f) => f.role === "student").length;
  const parentCount = feedbacks.filter((f) => f.role === "parent").length;
  const avgRating = (
    feedbacks.reduce((acc, f) => acc + (f.rating || 5), 0) / (feedbacks.length || 1)
  ).toFixed(1);

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
      {/* Hero Banner */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#041d15] via-[#083023] to-[#041d15] p-8 sm:p-12 text-white text-center mb-12 shadow-luxe overflow-hidden gold-border-glow">
        <div className="absolute inset-0 pattern-overlay opacity-15 pointer-events-none" />
        <div className="absolute -top-20 right-10 w-80 h-80 bg-gold/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/50 border border-amber-400/60 px-4 sm:px-5 py-1.5 sm:py-2 mb-4 shadow-gold">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              Community Voices & Experiences
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            <span className="text-gradient-gold-bright">Student & Parent Feedback</span>
          </h1>

          <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto font-medium mb-8 leading-relaxed">
            Read authentic reviews from students and parents across our Dars-e-Nizami, Muballiga,
            Tajweed, and Kids batches. No login required to share your review!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setModalOpen(true)}
              type="button"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-gold text-gold-foreground px-7 py-3.5 font-black text-xs uppercase tracking-widest shadow-gold hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <MessageSquarePlus className="h-4 w-4" />
              <span>Submit Your Feedback</span>
            </button>

            <div className="flex items-center gap-2 bg-black/40 px-4 py-3 rounded-2xl border border-amber-400/30 text-xs font-bold text-amber-300">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>
                {avgRating} / 5.0 Rating ({feedbacks.length}+ Reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Role Filter Tabs */}
      <div className="max-w-4xl mx-auto mb-10 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto">
          <Search
            className={`absolute ${isRtl ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-deep/50`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student or parent name..."
            className={`w-full rounded-2xl bg-white border border-emerald-deep/15 ${
              isRtl ? "pr-12 pl-4" : "pl-12 pr-4"
            } py-3.5 text-sm font-semibold text-emerald-deep shadow-subtle focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all`}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setSelectedRole("all")}
            type="button"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
              selectedRole === "all"
                ? "bg-gradient-emerald text-white shadow-luxe scale-105 border border-gold/40"
                : "bg-white text-emerald-deep/80 border border-emerald-deep/15 hover:bg-emerald-soft hover:text-emerald-deep"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>All Feedback ({feedbacks.length})</span>
          </button>

          <button
            onClick={() => setSelectedRole("student")}
            type="button"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
              selectedRole === "student"
                ? "bg-gradient-emerald text-white shadow-luxe scale-105 border border-gold/40"
                : "bg-white text-emerald-deep/80 border border-emerald-deep/15 hover:bg-emerald-soft hover:text-emerald-deep"
            }`}
          >
            <GraduationCap className="h-4 w-4 text-emerald-500" />
            <span>Students ({studentCount})</span>
          </button>

          <button
            onClick={() => setSelectedRole("parent")}
            type="button"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
              selectedRole === "parent"
                ? "bg-gradient-emerald text-white shadow-luxe scale-105 border border-gold/40"
                : "bg-white text-emerald-deep/80 border border-emerald-deep/15 hover:bg-emerald-soft hover:text-emerald-deep"
            }`}
          >
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
            <span>Parents ({parentCount})</span>
          </button>
        </div>
      </div>

      {/* Feedbacks Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="h-10 w-10 mx-auto border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-emerald-deep font-bold text-sm">Loading Community Reviews...</p>
        </div>
      ) : filteredFeedbacks.length === 0 ? (
        <div className="rounded-3xl bg-white border border-emerald-deep/15 p-10 text-center shadow-soft max-w-lg mx-auto animate-fade-up">
          <div className="h-16 w-16 mx-auto rounded-full bg-emerald-soft text-emerald-deep grid place-items-center mb-4">
            <Search className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="font-display text-2xl font-bold text-emerald-deep mb-2">
            No Matching Feedback Found
          </h3>
          <p className="text-xs sm:text-sm text-foreground/70 mb-6">
            Try adjusting your search terms or filter selection.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedRole("all");
            }}
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-emerald text-white px-6 py-2.5 text-xs font-bold shadow-soft hover:scale-105 transition-transform cursor-pointer"
          >
            <span>Clear Filter & Show All</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeedbacks.map((item) => (
            <FeedbackCard
              key={item.id}
              item={item}
              onShare={() => handleShare(item)}
            />
          ))}
        </div>
      )}

      {/* Add Feedback Modal (Public - No Sign-in Required) */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/65 backdrop-blur-sm animate-fade-up overflow-y-auto"
          onClick={() => !submitting && setModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl bg-gradient-gold p-1 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-[1.4rem] bg-white p-6 sm:p-8 relative overflow-hidden">
              <button
                onClick={() => setModalOpen(false)}
                disabled={submitting}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-emerald-soft grid place-items-center hover:bg-emerald-100 text-emerald-deep transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-emerald-deep text-[11px] font-extrabold uppercase tracking-wider mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  <span>No Login Required</span>
                </div>
                <h3 className="font-display text-2xl font-extrabold text-emerald-deep">
                  Share Your Feedback
                </h3>
                <p className="text-xs text-foreground/70 mt-1 font-medium">
                  Help fellow students and parents learn about your experience with our Madrasa.
                </p>
              </div>

              {submitSuccess ? (
                <div className="py-10 text-center space-y-3">
                  <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 grid place-items-center">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h4 className="font-display text-2xl font-extrabold text-emerald-deep">
                    JazakAllah Khair!
                  </h4>
                  <p className="text-xs text-foreground/70 font-medium">
                    Your feedback has been published successfully.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Role Selector: Student vs Parent */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-2">
                      Are you a Student or Parent? *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: "student" })}
                        className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 font-black text-xs transition-all cursor-pointer ${
                          formData.role === "student"
                            ? "bg-emerald-deep text-white border-emerald-deep shadow-soft scale-[1.02]"
                            : "bg-emerald-soft/50 text-emerald-deep border-emerald-deep/15 hover:bg-emerald-soft"
                        }`}
                      >
                        <GraduationCap className="h-4 w-4" />
                        <span>I am a Student</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: "parent" })}
                        className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 font-black text-xs transition-all cursor-pointer ${
                          formData.role === "parent"
                            ? "bg-emerald-deep text-white border-emerald-deep shadow-soft scale-[1.02]"
                            : "bg-emerald-soft/50 text-emerald-deep border-emerald-deep/15 hover:bg-emerald-soft"
                        }`}
                      >
                        <Heart className="h-4 w-4 fill-current" />
                        <span>I am a Parent</span>
                      </button>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={formData.role === "student" ? "e.g. Zaid Ahmad" : "e.g. Dr. Tariq Siddiqui"}
                      className="w-full rounded-2xl border border-emerald-deep/20 px-4 py-2.5 text-sm font-medium text-emerald-deep focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 hover:scale-125 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`h-7 w-7 ${
                              star <= formData.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-amber-700 ml-2">
                        {formData.rating} of 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-emerald-deep mb-1.5">
                      Your Feedback / Review *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share how the teachers, lessons, live classes, or curriculum helped you or your child..."
                      className="w-full rounded-2xl border border-emerald-deep/20 p-4 text-sm font-medium text-emerald-deep focus:outline-none focus:border-amber-500 leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-2xl bg-gradient-emerald text-white py-3.5 font-black uppercase text-xs tracking-widest shadow-soft hover:scale-[1.02] active:scale-98 transition-transform cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Publishing...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4 text-gold" />
                        <span>Publish Feedback Now</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA to Enroll */}
      <div className="max-w-4xl mx-auto mt-20 rounded-[2.5rem] bg-gradient-gold p-1.5 shadow-luxe gold-border-glow">
        <div className="rounded-[2.2rem] bg-white p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-emerald grid place-items-center mb-4 shadow-luxe">
            <ShieldCheck className="h-8 w-8 text-gold" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-deep mb-2">
            Join Our Growing Family of Learners
          </h3>
          <p className="text-sm sm:text-base text-foreground/75 max-w-xl mx-auto mb-6 font-medium leading-relaxed">
            Experience quality Sunni Islamic education with dedicated scholars, flexible timings,
            and offline recognized certificates for just ₹300/month.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-emerald text-white px-8 py-3.5 font-extrabold text-sm shadow-luxe hover:scale-105 transition-all"
            >
              <span>Enroll via WhatsApp</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setModalOpen(true)}
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-soft text-emerald-deep px-6 py-3.5 font-bold text-xs border border-emerald-deep/15 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="h-4 w-4 text-amber-700" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponent: Feedback Card (Public)
function FeedbackCard({
  item,
  onShare,
}: {
  item: FeedbackItem;
  onShare: () => void;
}) {
  const isStudent = item.role === "student";

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-7 flex flex-col justify-between shadow-soft hover:shadow-luxe hover:scale-[1.02] transition-all duration-300 border border-emerald-deep/12">
      <div>
        {/* Header with Role Badge and Share */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              isStudent
                ? "bg-emerald-soft text-emerald-deep border-emerald-deep/20"
                : "bg-amber-100/70 text-amber-950 border-amber-300"
            }`}
          >
            {isStudent ? (
              <>
                <GraduationCap className="h-3.5 w-3.5 text-emerald-700" />
                <span>Student Review</span>
              </>
            ) : (
              <>
                <Heart className="h-3.5 w-3.5 text-amber-800 fill-amber-800" />
                <span>Parent Review</span>
              </>
            )}
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

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              className={`h-4 w-4 ${
                idx < item.rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-slate-200 text-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Review Message */}
        <p className="text-sm text-foreground/80 font-medium leading-relaxed mb-6 italic">
          "{item.message}"
        </p>
      </div>

      {/* Author Footer */}
      <div className="pt-4 border-t border-emerald-deep/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`h-11 w-11 rounded-full border grid place-items-center font-display text-base font-black shrink-0 ${
              isStudent
                ? "bg-emerald-deep/10 text-emerald-deep border-emerald-deep/20"
                : "bg-amber-200/60 text-amber-950 border-amber-400/40"
            }`}
          >
            {item.name.charAt(0)}
          </div>
          <div>
            <div className="font-display font-bold text-base text-emerald-deep leading-tight flex items-center gap-1.5">
              <span>{item.name}</span>
              {item.verified && (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" title="Verified Review" />
              )}
            </div>
            <div className="text-[11px] font-semibold text-emerald-800/70 leading-tight mt-0.5">
              {isStudent ? "Enrolled Student" : "Student's Parent / Guardian"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
