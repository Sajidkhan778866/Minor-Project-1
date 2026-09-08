import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaBrain, FaRocket, FaPlay, FaGraduationCap, FaUserShield, FaLaptopCode, FaBookOpen, FaQuestionCircle, FaFileAlt, FaVideo, FaYoutube } from 'react-icons/fa';
import { User } from '../types';
import { authApi } from '../api';
import { useTheme } from '../context/ThemeContext';

interface LandingPageProps {
  authUser: User | null;
  onLoginSuccess: (token: string, user: User) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ authUser, onLoginSuccess }) => {
  const navigate = useNavigate();
  const { isDark, theme } = useTheme();

  const handleQuickDemoLogin = async (email: string, targetTab?: string) => {
    if (targetTab) {
      localStorage.setItem('default_tab', targetTab);
    }
    try {
      const response = await authApi.login({ email, password: 'password123' });
      if (response.data?.token && response.data?.user) {
        onLoginSuccess(response.data.token, response.data.user);
        navigate(`/${response.data.user.role.toLowerCase()}-dashboard`);
      }
    } catch (err) {
      alert("Failed to sign into demo account. Ensure server is running on port 5010!");
    }
  };

  return (
    <div className={`relative overflow-hidden pb-24 min-h-screen transition-colors duration-500 ${theme.bg}`}>
      
      {/* Background Gradient Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="mt-12 mb-20 grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs font-black uppercase tracking-wider shadow-md ${isDark ? 'border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-300' : 'border-indigo-400 bg-indigo-50 text-indigo-900'}`}>
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span>🏛️ Parul Institute of Technology • Major Project Report 🏆</span>
            </div>

            <h1 className={`text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:leading-[1.1] ${theme.textPrimary}`}>
              Turn Video Lectures & Competitive Coding into an <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">AI Study Strategy 👑 ✨</span>
            </h1>

            <p className={`text-base sm:text-lg font-bold leading-relaxed max-w-2xl ${theme.textSecondary}`}>
              <strong className="text-amber-500 font-black">Learn Smarter, Not Harder 🚀.</strong> An all-in-one enterprise ecosystem merging our dedicated in-app YouTube video watcher & AI summarizer with multi-platform competitive coding challenges (LeetCode, HackerRank, Codeforces, CodeChef) into a single unified workspace! 💎 💫
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={authUser ? `/${authUser.role.toLowerCase()}-dashboard` : "/signup"}
                className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-600 to-purple-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-cyan-500/30 hover:scale-105 hover:shadow-cyan-500/45 transition-all duration-300"
              >
                <FaRocket className="text-lg text-amber-300 animate-bounce" />
                <span>Launch Your Study Portal 🚀 ✨</span>
              </Link>
              <a
                href="#demo-portals"
                className={`flex items-center gap-2 rounded-2xl border px-7 py-4 text-sm font-extrabold backdrop-blur-md transition-all duration-300 shadow-md ${isDark ? 'border-white/20 bg-white/5 text-white hover:bg-white/10' : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-100'}`}
              >
                <FaPlay className="text-sm text-cyan-500" />
                <span>Test Drive Watcher & Hub ⚡</span>
              </a>
            </div>

            <div className="flex items-center gap-8 pt-6 text-xs font-black border-t border-white/15">
              <div>
                <span className={`text-2xl font-black block ${theme.textPrimary}`}>4-in-1 Coding 👑</span>
                <span className={theme.textSecondary}>LeetCode + HR + CF + CC 💎</span>
              </div>
              <div>
                <span className="text-2xl font-black text-red-500 block">YouTube Watcher 🍿</span>
                <span className={theme.textSecondary}>In-App Streaming & AI Notes 🎬 ✨</span>
              </div>
              <div>
                <span className="text-2xl font-black text-emerald-500 block">Instant STT 🎙️</span>
                <span className={theme.textSecondary}>Whisper Audio Extraction ⚡</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE GRAPHIC CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className={`relative rounded-3xl border p-6 sm:p-8 shadow-2xl backdrop-blur-2xl ${theme.card}`}>
              <div className="absolute top-0 right-0 h-36 w-36 bg-cyan-500/15 rounded-tr-3xl rounded-bl-full pointer-events-none" />
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-13 w-13 p-3 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 text-white text-2xl shadow-xl">
                    <FaBrain className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-black ${theme.textPrimary}`}>AI Engine v2.0 👑 ✨</h3>
                    <p className="text-xs text-cyan-500 font-extrabold">Parul University AI Architecture 🏛️</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-black text-emerald-400 flex items-center gap-1.5 shadow-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online 🟢
                </span>
              </div>

              <div className="space-y-3.5 text-left">
                {[
                  { title: "Stage 1: Multi-Platform Coding 👑", subtitle: "Solve LeetCode, HackerRank, Codeforces & CodeChef challenges inside app 💎.", badge: "4-in-1 Hub", icon: <FaLaptopCode className="text-amber-400" /> },
                  { title: "Stage 2: In-App YouTube Theater 🍿", subtitle: "Stream educational tutorials and execute real-time AI summarization 🎬 ✨.", badge: "Zero Tabs", icon: <FaYoutube className="text-red-500" /> },
                  { title: "Stage 3: Whisper Speech-To-Text 🎙️", subtitle: "Tokenizes lecture audio formants into structured bullet notes & keywords 🔮.", badge: "NLP AI", icon: <FaVideo className="text-cyan-400" /> },
                  { title: "Stage 4: 3D Active Recall & MCQs 🪐", subtitle: "Spaced repetition flashcards & automated examination testing batteries 🏅.", badge: "Mastery", icon: <FaQuestionCircle className="text-purple-400" /> },
                ].map((item, index) => (
                  <div key={index} className={`group rounded-2xl border p-4 transition duration-300 flex items-start gap-3.5 shadow-sm ${isDark ? 'border-white/10 bg-slate-950/80 hover:border-cyan-400/50' : 'border-slate-300 bg-slate-50 hover:border-indigo-400'}`}>
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg border border-white/10 group-hover:scale-110 transition-transform shadow-md">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-black transition-colors ${theme.textPrimary}`}>{item.title}</h4>
                        <span className="rounded-lg bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-mono font-black text-indigo-400">{item.badge}</span>
                      </div>
                      <p className={`mt-1 text-[11px] font-bold leading-relaxed ${theme.textSecondary}`}>{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 p-4 text-center shadow-inner">
                <p className="text-xs font-black text-cyan-400">
                  ⚡ Powered by Node.js Express, MongoDB Mongoose Replica, & FastAPI Python AI Engine! 🚀 💎
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* INSTANT TEST DRIVE DASHBOARDS FOR EVALUATORS */}
        <section id="demo-portals" className="my-20 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className={`text-3xl font-black sm:text-4xl ${theme.textPrimary}`}>
              Instant One-Click <span className="text-cyan-500">Learning Portals 🎯 ✨</span>
            </h2>
            <p className={`mt-3 text-sm font-bold ${theme.textSecondary}`}>
              Explore our specialized Multi-Platform Coding Arena, In-App YouTube Video Watcher & Summarizer, and Admin Control Center without entering manual credentials! 🚀
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                role: "Student Coding Workspace 🧑‍💻 ✨",
                email: "sajid@parul.ac.in",
                tab: "coding",
                name: "Multi-Platform Practice Arena 👑",
                icon: <FaGraduationCap className="text-4xl text-cyan-400 animate-bounce" />,
                desc: "Access the All-in-One Competitive Coding Arena to practice LeetCode, HackerRank, Codeforces, and CodeChef with automated simulation graders and Big-O AI complexity reviews! 💎 🚀",
                btnText: "Launch Coding Arena 👑",
                gradient: isDark ? "from-cyan-500/20 via-slate-900 to-slate-950 border-cyan-500/40" : "from-cyan-50 via-white to-slate-50 border-cyan-300"
              },
              {
                role: "YouTube Watcher & Summarizer 🍿 🎬",
                email: "sajid@parul.ac.in",
                tab: "youtube",
                name: "In-App Theater & AI Notes Hub ✨",
                icon: <FaYoutube className="text-4xl text-red-500 animate-pulse" />,
                desc: "Watch high-definition university lectures directly inside our unified platform! Execute 1-click real-time Whisper Speech-to-Text AI summarization and synthesize instant revision study decks 🎙️ ⚡.",
                btnText: "Launch YouTube Watcher 🍿 ✨",
                gradient: isDark ? "from-red-500/20 via-slate-900 to-slate-950 border-red-500/40" : "from-rose-50 via-white to-orange-50 border-red-300"
              },
              {
                role: "Admin Control Center 🛡️ ⚙️",
                email: "admin@parul.ac.in",
                tab: "admin",
                name: "System Health Telemetry 🏛️",
                icon: <FaUserShield className="text-4xl text-indigo-400" />,
                desc: "Monitor real-time system health telemetry, inspect Python FastAPI endpoints, manage student accounts, and audit MongoDB operational logs in real-time 🔬 ✨.",
                btnText: "Enter Admin Center 🛡️",
                gradient: isDark ? "from-indigo-500/20 via-slate-900 to-slate-950 border-indigo-500/40" : "from-indigo-50 via-white to-slate-50 border-indigo-300"
              }
            ].map((portal, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`rounded-3xl border p-7 shadow-2xl flex flex-col justify-between backdrop-blur-xl transition-all duration-300 bg-gradient-to-b ${portal.gradient}`}
              >
                <div>
                  <div className={`mb-5 inline-flex rounded-2xl p-4 border shadow-md ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                    {portal.icon}
                  </div>
                  <h3 className={`text-2xl font-black ${theme.textPrimary}`}>{portal.role}</h3>
                  <p className="mt-1 text-xs font-black text-amber-500">{portal.name}</p>
                  <p className={`mt-4 text-xs font-bold leading-relaxed ${theme.textSecondary}`}>{portal.desc}</p>
                </div>
                <button
                  onClick={() => handleQuickDemoLogin(portal.email, portal.tab)}
                  className="mt-8 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 px-5 py-4 text-xs font-black text-white transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:opacity-95 transform active:scale-95"
                >
                  ⚡ {portal.btnText} 🚀
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* COMPREHENSIVE AI FEATURES GRID */}
        <section className="my-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-500">Enterprise Feature Showcase 🌟</span>
            <h2 className={`mt-2 text-3xl font-black sm:text-5xl ${theme.textPrimary}`}>
              Everything Needed to <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Dominate Exams & Placements 👑 💎</span>
            </h2>
            <p className={`mt-3 text-sm font-bold ${theme.textSecondary}`}>
              Built from the ground up following MERN clean architectural patterns, responsive luxury theming, and advanced Python AI processing! ✨
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <FaLaptopCode className="text-amber-400" />, title: "4-in-1 Coding Arena 👑", desc: "Solve challenges from LeetCode, HackerRank, Codeforces & CodeChef with automated grading & AI complexity critiques 💎." },
              { icon: <FaYoutube className="text-red-500" />, title: "In-App YouTube Watcher 🍿", desc: "Watch high-definition engineering lectures without leaving the app, with instant 1-click real-time AI summarization 🎬 ✨." },
              { icon: <FaVideo className="text-cyan-400" />, title: "Whisper AI STT Pipeline 🎙️", desc: "Extract acoustic vocal streams from video lectures, tokenizing speech into synchronized bullet takeaways & keyword arrays ⚡." },
              { icon: <FaQuestionCircle className="text-emerald-400" />, title: "MCQ Testing Battery 🎯", desc: "Generate 10 to 50 difficulty-tuned multiple-choice assessments with real-time academic answer explanation breakdowns 🏅." },
              { icon: <FaBookOpen className="text-purple-400" />, title: "3D Active Recall Decks 🪐", desc: "Spaced repetition study flashcards with smooth Framer Motion flip physics, revision modes, and topic bookmarking 🃏 💫." },
              { icon: <FaBrain className="text-indigo-400" />, title: "24/7 AI Mentor & ATS Resumes 🤖", desc: "Interactive engineering tutor for algorithmic bug fixing and one-click formatted Markdown ATS placement resumes 💼 📈." }
            ].map((card, i) => (
              <div key={i} className={`rounded-3xl border p-7 shadow-xl transition-all duration-300 ${theme.card}`}>
                <div className="mb-4 text-3xl">{card.icon}</div>
                <h3 className={`mb-2 text-xl font-black ${theme.textPrimary}`}>{card.title}</h3>
                <p className={`text-xs font-bold leading-relaxed ${theme.textSecondary}`}>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PARUL UNIVERSITY ATTRIBUTION & FOOTER */}
        <footer className={`mt-32 rounded-3xl border p-8 sm:p-12 text-center shadow-2xl ${isDark ? 'border-white/15 bg-gradient-to-b from-slate-900 to-slate-950 text-white' : 'border-indigo-300 bg-gradient-to-b from-indigo-900 via-slate-900 to-indigo-950 text-white'}`}>
          <div className="mx-auto max-w-4xl space-y-4">
            <h3 className="text-2xl font-black text-white flex items-center justify-center gap-2">
              <span>Parul Institute of Technology (Parul University, Vadodara)</span>
              <span>🏛️ 👑</span>
            </h3>
            <p className="text-sm font-extrabold text-cyan-300">Department of Computer Science & Engineering • AY 2025-2026 Major Project Report 🏆 ✨</p>
            <p className="text-xs text-slate-300 font-bold leading-relaxed max-w-2xl mx-auto">
              An enterprise demonstration of generative AI and competitive programming unionized in modern computer science education through automated video comprehension and multi-platform developer evaluation! 🚀 💎
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-200 border-t border-white/15 pt-6 font-extrabold">
              <span>🧑‍💻 Sajid Khan <span className="text-amber-400 font-mono">(2303051240191)</span> ✨</span>
              <span>•</span>
              <span>🧑‍💻 Repaka Himanshu Raj <span className="text-amber-400 font-mono">(2303051240180)</span> 🌟</span>
              <span>•</span>
              <span>🧑‍💻 Siddesh Surti <span className="text-amber-400 font-mono">(2303051240240/280)</span> ⚡</span>
              <span>•</span>
              <span>🧑‍💻 Anuj N. Pandey <span className="text-amber-400 font-mono">(2303051240143)</span> 💎</span>
            </div>
            <p className="text-xs font-black text-teal-300 pt-2">
              👩‍🏫 Supervision & Guidance by: Mrs. Gayatri Devraj Naidu (Project Guide & Supervisor, PIT Vadodara) 🎖️
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
};
