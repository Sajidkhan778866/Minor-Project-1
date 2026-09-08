import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeStyles {
  bg: string;
  card: string;
  cardHover: string;
  textPrimary: string;
  textSecondary: string;
  textHighlight: string;
  border: string;
  inputBg: string;
  headerBg: string;
  subBarBg: string;
  tabActiveBg: string;
  tabInactiveBg: string;
  badgeAccent: string;
  editorBg: string;
  consoleBg: string;
  buttonPrimary: string;
  buttonSecondary: string;
}

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: ThemeStyles;
}

const darkTheme: ThemeStyles = {
  bg: "bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950",
  card: "bg-slate-900/85 border-white/10 text-slate-100 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl",
  cardHover: "hover:border-cyan-400/60 hover:shadow-cyan-500/20",
  textPrimary: "text-white font-black",
  textSecondary: "text-slate-300 font-medium",
  textHighlight: "text-cyan-400 font-black",
  border: "border-white/10",
  inputBg: "bg-slate-950 border-white/15 text-white focus:border-cyan-400 shadow-inner",
  headerBg: "bg-slate-900/85 border-white/10 backdrop-blur-2xl shadow-2xl",
  subBarBg: "bg-slate-900/95 border-white/5 text-slate-300",
  tabActiveBg: "bg-gradient-to-r from-cyan-400 via-teal-500 to-emerald-500 text-slate-950 font-black shadow-lg shadow-cyan-500/30 scale-[1.02]",
  tabInactiveBg: "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5 font-extrabold",
  badgeAccent: "bg-amber-500/10 border-amber-500/30 text-amber-300",
  editorBg: "bg-slate-950 text-cyan-200 border-white/10 shadow-inner",
  consoleBg: "bg-slate-950/90 border-white/10 text-emerald-300",
  buttonPrimary: "bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-black shadow-lg shadow-cyan-500/25",
  buttonSecondary: "bg-slate-800 border border-white/15 text-white font-extrabold hover:bg-slate-700"
};

const lightTheme: ThemeStyles = {
  bg: "bg-gradient-to-br from-indigo-50/80 via-white to-blue-50 text-slate-900 selection:bg-indigo-600 selection:text-white",
  card: "bg-white/90 border-indigo-200/70 text-slate-900 shadow-xl shadow-indigo-500/10 backdrop-blur-2xl",
  cardHover: "hover:border-indigo-500/60 hover:shadow-indigo-500/25",
  textPrimary: "text-slate-900 font-black",
  textSecondary: "text-slate-600 font-bold",
  textHighlight: "text-indigo-600 font-black",
  border: "border-indigo-200/60",
  inputBg: "bg-white border-slate-300 text-slate-900 focus:border-indigo-600 shadow-inner font-bold",
  headerBg: "bg-white/85 border-indigo-200/60 backdrop-blur-2xl shadow-lg",
  subBarBg: "bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-indigo-100 shadow-md font-bold",
  tabActiveBg: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black shadow-lg shadow-indigo-500/30 scale-[1.02]",
  tabInactiveBg: "bg-white text-slate-700 hover:bg-indigo-50/60 border border-indigo-200/60 font-extrabold shadow-sm",
  badgeAccent: "bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black shadow-sm",
  editorBg: "bg-slate-900 text-emerald-300 border-indigo-300 shadow-inner",
  consoleBg: "bg-slate-900 border-indigo-300 text-cyan-300 font-bold",
  buttonPrimary: "bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 text-white font-black shadow-lg shadow-indigo-500/25",
  buttonSecondary: "bg-slate-100 border border-slate-300 text-slate-800 font-extrabold hover:bg-slate-200"
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
  theme: darkTheme
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem('app-theme');
    if (saved === 'light') setIsDark(false);
    else setIsDark(true);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('app-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme: isDark ? darkTheme : lightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
