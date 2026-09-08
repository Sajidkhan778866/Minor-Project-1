export type Role = 'Student' | 'Teacher' | 'Admin';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  streak: number;
  avatar?: string;
}

export interface Flashcard {
  id: string;
  topic: string;
  question: string;
  answer: string;
  isBookmarked?: boolean;
}

export interface MCQ {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export interface Lecture {
  id: string;
  userId: string;
  title: string;
  videoUrl?: string;
  durationMinutes?: number;
  processingStatus?: string;
  createdAt?: string;
  transcript?: string;
  summary?: string;
  detailedNotes?: string[];
  keywords?: string[];
  mcqs?: MCQ[];
  flashcards?: Flashcard[];
}

export interface YoutubeVideo {
  videoId: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  description: string;
}

export interface LeetCodeProfile {
  username: string;
  ranking: number;
  contestRating: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: string;
  submissionCalendar?: Record<string, number>;
  badges?: string[];
}

export interface StudyPlanSchedule {
  day: string;
  focus_subject: string;
  allocated_hours: number;
  morning_session: string;
  afternoon_session: string;
  evening_session: string;
}

export interface StudyPlan {
  id?: string;
  exam_date: string;
  overview: string;
  schedule: StudyPlanSchedule[];
}

export interface FacultyAnalytics {
  total_students_monitored: number;
  average_department_score: number;
  at_risk_students_count: number;
  documents_analyzed_total: number;
  subject_wise_performance: Array<{ subject: string; pass_rate: number; avg_score: number }>;
  weekly_trend: Array<{ week: string; score: number }>;
}

export interface AdminMetrics {
  users_total: number;
  active_teachers: number;
  ai_requests_today: number;
  system_uptime: string;
  server_memory_usage: string;
  revenue_subscriptions: string;
  logs: Array<{ timestamp: string; level: string; message: string }>;
}
