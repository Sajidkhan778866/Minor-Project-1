import mongoose from 'mongoose';

// ==================== USER ENTITIES (Student, Faculty, Admin, T&P) ====================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Teacher', 'Admin', 'T_and_P'], default: 'Student' },
  avatar: { type: String },
  streak: { type: Number, default: 7 },
  createdAt: { type: Date, default: Date.now }
});

// ==================== COURSE & TOPIC ENTITIES ====================
const courseSchema = new mongoose.Schema({
  course_id: { type: String, required: true, unique: true },
  course_name: { type: String, required: true },
  admin_id: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const topicSchema = new mongoose.Schema({
  topic_id: { type: String, required: true, unique: true },
  course_id: { type: String, required: true },
  topic_name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// ==================== STUDY SESSIONS & RESOURCES ====================
const sessionSchema = new mongoose.Schema({
  session_id: { type: String, required: true, unique: true },
  student_id: { type: String, required: true },
  session_date: { type: Date, default: Date.now },
  duration_minutes: { type: Number, required: true }
});

const resourceSchema = new mongoose.Schema({
  resource_id: { type: String, required: true, unique: true },
  topic_id: { type: String, required: true },
  resource_type: { type: String, enum: ['Video Stream', 'PDF', 'Lecture Notes', 'Reference'], default: 'Video Stream' },
  content_url: { type: String, required: true },
  title: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// ==================== CORE LECTURE VIDEO & TRANSCRIPT SUMMARIZER ====================
const lectureSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  videoUrl: { type: String },
  durationMinutes: { type: Number, default: 45 },
  processingStatus: { type: String, enum: ['Processing', 'Completed', 'Error'], default: 'Completed' },
  transcript: { type: String },
  summary: { type: String },
  detailedNotes: [{ type: String }],
  keywords: [{ type: String }],
  mcqs: [{
    id: Number,
    question: String,
    options: [String],
    answer: String,
    explanation: String
  }],
  flashcards: [{
    id: String,
    topic: String,
    question: String,
    answer: String
  }],
  createdAt: { type: Date, default: Date.now }
});

// ==================== QUESTION BANK & QUIZ EVALUATION SYSTEM ====================
const questionBankSchema = new mongoose.Schema({
  qb_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  topic_id: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  questions: [{
    question_id: Number,
    question_text: String,
    options: [String],
    answer: String,
    explanation: String,
    resource_id: String
  }],
  createdBy: { type: String, default: 'Faculty' },
  createdAt: { type: Date, default: Date.now }
});

const quizSchema = new mongoose.Schema({
  quiz_id: { type: String, required: true, unique: true },
  quiz_name: { type: String, required: true },
  qb_id: { type: String },
  total_questions: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now }
});

const assessmentSchema = new mongoose.Schema({
  assessment_id: { type: String, required: true, unique: true },
  quiz_id: { type: String, required: true },
  student_id: { type: String, required: true },
  assessment_date: { type: Date, default: Date.now },
  duration_seconds: { type: Number }
});

const performanceRecordSchema = new mongoose.Schema({
  pr_id: { type: String, required: true, unique: true },
  assessment_id: { type: String, required: true },
  student_id: { type: String, required: true },
  score: { type: Number, required: true }, // percentage or marks
  total_marks: { type: Number, default: 100 },
  recorded_at: { type: Date, default: Date.now }
});

const recommendationSchema = new mongoose.Schema({
  rec_id: { type: String, required: true, unique: true },
  student_id: { type: String, required: true },
  pr_id: { type: String },
  recommendation_text: { type: String, required: true },
  topic_focus: { type: String },
  created_at: { type: Date, default: Date.now }
});

// ==================== STUDY PLAN & ATS RESUME BUILDER ====================
const studyPlanSchema = new mongoose.Schema({
  study_plan_id: { type: String },
  userId: { type: String, required: true },
  topic_id: { type: String },
  examDate: { type: String },
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  subjects: [{ type: String }],
  studyHoursPerDay: { type: Number, default: 3 },
  overview: { type: String },
  schedule: [{
    day: String,
    focus_subject: String,
    allocated_hours: Number,
    morning_session: String,
    afternoon_session: String,
    evening_session: String
  }],
  createdAt: { type: Date, default: Date.now }
});

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  quizTitle: { type: String },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  takenAt: { type: Date, default: Date.now }
});

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullName: { type: String },
  email: { type: String },
  phone: { type: String },
  degree: { type: String },
  skills: [{ type: String }],
  generatedMarkdown: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);
export const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);
export const Resource = mongoose.models.Resource || mongoose.model('Resource', resourceSchema);
export const Lecture = mongoose.models.Lecture || mongoose.model('Lecture', lectureSchema);
export const QuestionBank = mongoose.models.QuestionBank || mongoose.model('QuestionBank', questionBankSchema);
export const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
export const Assessment = mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);
export const PerformanceRecord = mongoose.models.PerformanceRecord || mongoose.model('PerformanceRecord', performanceRecordSchema);
export const Recommendation = mongoose.models.Recommendation || mongoose.model('Recommendation', recommendationSchema);
export const StudyPlan = mongoose.models.StudyPlan || mongoose.model('StudyPlan', studyPlanSchema);
export const Progress = mongoose.models.Progress || mongoose.model('Progress', progressSchema);
export const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);

// ==================== LEETCODE PROBLEM DATABASE ====================
const leetCodeProblemSchema = new mongoose.Schema({
  problemId: { type: Number, required: true, unique: true, index: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true, index: true },
  topics: [{ type: String, index: true }],
  companies: [{ type: String, index: true }],
  hints: [{ type: String }],
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  constraints: [{ type: String }],
  starterCode: { type: mongoose.Schema.Types.Mixed }, // Multi-language structure { python: "...", java: "..." }
  functionSignature: { type: String },
  solution: { type: String },
  acceptedLanguages: [{ type: String }],
  url: { type: String },
  isPremium: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  acceptanceRate: { type: String },
  frequency: { type: Number, default: 0 },
  timeLimit: { type: Number, default: 2000 }, // ms
  memoryLimit: { type: Number, default: 256 }, // MB
  testCases: [{
    input: { type: String },
    output: { type: String },
    isHidden: { type: Boolean, default: true }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const LeetCodeProblem = mongoose.models.LeetCodeProblem || mongoose.model('LeetCodeProblem', leetCodeProblemSchema);

// ==================== SUBMISSION TRACKING ====================
const submissionSchema = new mongoose.Schema({
  submissionId: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  problemId: { type: String, required: true, index: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Runtime Error', 'Compilation Error'], required: true },
  runtime: { type: Number }, // ms
  memory: { type: Number }, // MB
  testCasesPassed: { type: Number, default: 0 },
  totalTestCases: { type: Number, default: 0 },
  failedTestCase: { type: mongoose.Schema.Types.Mixed }, // Details of the first failed case
  submittedAt: { type: Date, default: Date.now }
});

export const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
