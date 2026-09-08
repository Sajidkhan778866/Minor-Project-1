import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { LeetCodeDB } from './pages/LeetCodeDB';
import { LeetCodeDetail } from './pages/LeetCodeDetail';
import { CodeWorkspace } from './pages/CodeWorkspace';
import { User } from './types';
import { authApi } from './api';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppContent: React.FC = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setAuthUser(parsedUser);
        authApi.me().then((res) => {
          if (res.data?.user) {
            setAuthUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
          }
        }).catch(() => {
          console.log("Offline mode or token expired, preserving cached user for presentation session.");
        }).finally(() => setLoading(false));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const handleLoginSuccess = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthUser(null);
  };

  if (loading) {
    return (
      <div className={`flex min-h-screen items-center justify-center font-extrabold text-xl animate-pulse ${theme.bg}`}>
        ⚡ ✨ Initializing AI Study Strategist Enterprise Ecosystem 🚀 💎
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg}`}>
      <Navbar user={authUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage authUser={authUser} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/login" element={!authUser ? <AuthPage mode="login" onAuthSuccess={handleLoginSuccess} /> : <Navigate to={`/${authUser.role.toLowerCase()}-dashboard`} replace />} />
        <Route path="/signup" element={!authUser ? <AuthPage mode="signup" onAuthSuccess={handleLoginSuccess} /> : <Navigate to={`/${authUser.role.toLowerCase()}-dashboard`} replace />} />
        
        {/* Role Based Protected Workspace Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard user={authUser} onLogout={handleLogout} />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard user={authUser} onLogout={handleLogout} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard user={authUser} onLogout={handleLogout} />} />
        
        {/* New LeetCode DB Routes */}
        <Route path="/leetcode" element={<LeetCodeDB />} />
        <Route path="/leetcode/:slug/detail" element={<LeetCodeDetail />} />
        <Route path="/workspace/:slug" element={<CodeWorkspace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
