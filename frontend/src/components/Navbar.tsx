import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBrain, FaUniversity, FaUserCircle, FaSignOutAlt, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { User } from '../types';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [showTeamModal, setShowTeamModal] = useState(false);
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-50 mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <nav className={`flex items-center justify-between rounded-3xl border px-6 py-3.5 transition-all duration-300 ${theme.headerBg}`}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 shadow-xl shadow-cyan-500/30 group-hover:scale-110 transition-all duration-300">
              <FaBrain className="h-6 w-6 text-white animate-bounce" />
            </div>
            <div>
              <span className={`text-xl font-extrabold tracking-tight block ${theme.textPrimary}`}>
                AI Study Strategist <span className="text-amber-400 font-normal">👑 ✨</span>
              </span>
              <span className="hidden sm:inline-block rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 px-2.5 py-0.5 text-[11px] font-extrabold text-cyan-500 uppercase tracking-wider">
                🏛️ Parul University v2.0 🚀
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4 text-sm font-medium">
            
            {/* ELEGANT LIGHT & DARK THEME SWITCHER */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-black transition-all shadow-md transform active:scale-95 ${
                isDark
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 text-slate-950 border border-amber-200 shadow-amber-400/20 hover:scale-105'
                  : 'bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-cyan-300 border border-indigo-700 shadow-indigo-950/30 hover:scale-105'
              }`}
              title="Toggle between Solar Pearl Light Theme & Dark Velvet Elegance"
            >
              {isDark ? (
                <>
                  <FaSun className="text-amber-900 text-sm animate-spin-slow" />
                  <span className="hidden md:inline">☀️ Solar Pearl Light 💎</span>
                </>
              ) : (
                <>
                  <FaMoon className="text-cyan-400 text-sm animate-pulse" />
                  <span className="hidden md:inline">🌙 Dark Velvet Theme ✨</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowTeamModal(true)}
              className={`flex items-center gap-1.5 hover:text-cyan-500 transition font-black ${theme.textSecondary}`}
              title="View College Minor Project Report Team"
            >
              <FaUniversity className="text-cyan-500 text-base" />
              <span className="hidden lg:inline">Minor Project Team 🏅</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to={`/${user.role.toLowerCase()}-dashboard`}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 px-4 py-2 font-black text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.03] transition-all"
                >
                  <FaGraduationCap className="h-4 w-4" />
                  <span>{user.role} Hub 🎯</span>
                </Link>
                <div className={`hidden xl:flex items-center gap-2 rounded-2xl px-3 py-1.5 border font-bold ${isDark ? 'bg-slate-950 border-white/10 text-slate-200' : 'bg-slate-100 border-indigo-200 text-indigo-950'}`}>
                  <FaUserCircle className="text-cyan-500 h-4 w-4" />
                  <span className="text-xs">{user.name} ({user.streak}🔥)</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-extrabold"
                  title="Logout from platform"
                >
                  <FaSignOutAlt className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className={`rounded-2xl border px-4 py-2 transition-all font-black ${isDark ? 'border-white/15 bg-white/5 text-white hover:bg-white/10' : 'border-indigo-300 bg-white text-slate-900 shadow-sm hover:bg-indigo-50'}`}
                >
                  Sign In 🧑‍💻
                </Link>
                <Link
                  to="/signup"
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 px-5 py-2 font-black text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all"
                >
                  Get Started 🚀
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
      
      {/* Parul University Minor Project Attribution Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-8 shadow-2xl text-slate-100">
            <button
              onClick={() => setShowTeamModal(false)}
              className="absolute right-6 top-6 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
            >
              <FaTimes className="text-xl" />
            </button>
            <div className="mb-6 flex items-center gap-3 text-cyan-400">
              <FaUniversity className="text-4xl animate-pulse" />
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <span>Parul Institute of Technology</span>
                  <span className="text-amber-400">👑</span>
                </h2>
                <p className="text-xs text-cyan-300 font-bold">Department of Computer Science & Engineering | AY 2025-2026 🏛️</p>
              </div>
            </div>
            <h3 className="mb-3 text-lg font-black text-amber-300 flex items-center gap-2">
              <span>B.Tech 6th Semester Minor Project Report</span>
              <span>🏆 💫</span>
            </h3>
            <p className="mb-6 text-sm text-slate-300 leading-relaxed font-medium">
              <strong>Project Title:</strong> AI-Powered Video Lecture Summarizer & Unified Coding Hub (STUDY STRATEGIST 🚀)<br />
              An enterprise learning ecosystem merging real-time YouTube theater streaming with automated Whisper AI Speech-to-Text translation and multi-platform competitive programming!
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-6 shadow-inner">
              <h4 className="text-xs uppercase tracking-wider text-cyan-400 font-black mb-3">🏅 Project Developers (Submitted By):</h4>
              <ul className="grid grid-cols-1 gap-2.5 text-sm text-slate-200 font-bold">
                <li className="flex items-center justify-between"><span>🧑‍💻 Sajid Khan ✨</span> <span className="text-amber-300 font-mono text-xs">2303051240191</span></li>
                <li className="flex items-center justify-between"><span>🧑‍💻 Repaka Himanshu Raj 🌟</span> <span className="text-amber-300 font-mono text-xs">2303051240180</span></li>
                <li className="flex items-center justify-between"><span>🧑‍💻 Siddesh Surti ⚡</span> <span className="text-amber-300 font-mono text-xs">2303051240240 / 280</span></li>
                <li className="flex items-center justify-between"><span>🧑‍💻 Anuj N. Pandey 💎</span> <span className="text-amber-300 font-mono text-xs">2303051240143</span></li>
              </ul>
            </div>
            <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 p-4 shadow-md">
              <p className="text-xs text-teal-300 uppercase font-extrabold tracking-wider">👩‍🏫 Under The Guidance of:</p>
              <p className="text-md font-extrabold text-white mt-1">Mrs. Gayatri Devraj Naidu <span className="text-xs font-bold text-teal-200">(Project Guide & Supervisor, PIT Vadodara 🎖️)</span></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
