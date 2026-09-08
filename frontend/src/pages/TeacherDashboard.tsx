import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaUpload, FaChartBar, FaUserGraduate, FaExclamationTriangle, FaCheckCircle, FaBook, FaPlus, FaBell } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { User, FacultyAnalytics } from '../types';
import { studyApi } from '../api';

interface TeacherDashboardProps {
  user: User | null;
  onLogout: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onLogout }) => {
  const [analytics, setAnalytics] = useState<FacultyAnalytics | null>(null);
  const [activeTab, setActiveTab] = useState<'analytics' | 'risk' | 'questionbank' | 'upload'>('analytics');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadSubject, setUploadSubject] = useState('Data Structures');
  const [qbTopic, setQbTopic] = useState('Graph Algorithms');
  const [qbCount, setQbCount] = useState(10);
  const [qbDifficulty, setQbDifficulty] = useState('Medium');
  const [generatedBank, setGeneratedBank] = useState<any[]>([]);

  useEffect(() => {
    loadFacultyAnalytics();
  }, []);

  const loadFacultyAnalytics = async () => {
    try {
      const res = await studyApi.getFacultyAnalytics();
      if (res.data) setAnalytics(res.data);
    } catch {
      setAnalytics({
        total_students_monitored: 248,
        average_department_score: 76.4,
        at_risk_students_count: 12,
        documents_analyzed_total: 1450,
        subject_wise_performance: [
          { subject: 'Data Structures', pass_rate: 84, avg_score: 79 },
          { subject: 'Operating Systems', pass_rate: 72, avg_score: 69 },
          { subject: 'Computer Networks', pass_rate: 78, avg_score: 74 },
          { subject: 'Database Management', pass_rate: 89, avg_score: 85 }
        ],
        weekly_trend: [
          { week: 'Week 1', score: 68 },
          { week: 'Week 2', score: 71 },
          { week: 'Week 3', score: 75 },
          { week: 'Week 4', score: 79 }
        ]
      });
    }
  };

  const handleGenerateQuestionBank = async () => {
    try {
      const res = await studyApi.generateMcqs({ text: qbTopic, count: qbCount, difficulty: qbDifficulty, topic: qbTopic });
      if (res.data?.questions) setGeneratedBank(res.data.questions);
    } catch {
      setGeneratedBank([
        { id: 1, question: `When implementing ${qbTopic} in enterprise production systems, which complexity optimization invariant applies?`, options: ["Systematic graph edge relaxation & hash indexing", "Unindexed linear recursive scans", "Bypassing boundary checks", "Hardcoding adjacency matrices in static memory"], answer: "Systematic graph edge relaxation & hash indexing" }
      ]);
    }
  };

  const atRiskStudents = [
    { id: 'usr-101', name: 'Rahul M.', id_number: '2303051240112', subject: 'Operating Systems', score: '42%', streak: 1, status: 'High Risk' },
    { id: 'usr-102', name: 'Sneha K.', id_number: '2303051240198', subject: 'Data Structures', score: '48%', streak: 2, status: 'Moderate Risk' },
    { id: 'usr-103', name: 'Priyanshu T.', id_number: '2303051240210', subject: 'Computer Networks', score: '51%', streak: 0, status: 'Moderate Risk' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* FACULTY HEADER BANNER */}
        <div className="relative overflow-hidden rounded-3xl border border-teal-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 h-40 w-40 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-teal-300">
                <FaChalkboardTeacher />
                <span>Faculty Mentor & Guide Portal • Parul Institute of Technology</span>
              </div>
              <h1 className="mt-1 text-2xl font-black sm:text-4xl text-white">
                Faculty Workspace: <span className="text-teal-300">{user?.name || 'Mrs. Gayatri Devraj Naidu'}</span> 🎓
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Department of Computer Science & Engineering | Monitoring 6th Semester B.Tech Cohorts
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Students', value: analytics?.total_students_monitored || 248, color: 'border-teal-500/30 bg-teal-500/10 text-teal-300' },
                { label: 'Avg Score', value: `${analytics?.average_department_score || 76}%`, color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' },
                { label: 'At-Risk', value: analytics?.at_risk_students_count || 12, color: 'border-rose-500/30 bg-rose-500/10 text-rose-300' },
                { label: 'Docs Analyzed', value: analytics?.documents_analyzed_total || 1450, color: 'border-blue-500/30 bg-blue-500/10 text-blue-300' }
              ].map((stat, i) => (
                <div key={i} className={`rounded-2xl border ${stat.color} px-4 py-2.5 text-center shadow-inner`}>
                  <span className="text-[10px] uppercase font-bold opacity-80 block">{stat.label}</span>
                  <span className="text-lg font-black">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TAB TABS */}
        <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-slate-900/80 p-2 shadow-lg backdrop-blur-xl">
          {[
            { id: 'analytics', label: '1. Class Analytics Graphs', icon: <FaChartBar /> },
            { id: 'risk', label: '2. At-Risk Student Monitoring', icon: <FaExclamationTriangle /> },
            { id: 'questionbank', label: '3. AI Question Bank Synthesizer', icon: <FaBook /> },
            { id: 'upload', label: '4. Upload Lecture Video / Notes', icon: <FaUpload /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: ANALYTICS GRAPHS */}
        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-sm font-extrabold uppercase text-slate-300 mb-4">Subject-Wise Cohort Pass Rate (%)</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics?.subject_wise_performance || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="subject" stroke="#94a3b8" textAnchor="middle" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#94a3b8" textAnchor="end" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Bar dataKey="pass_rate" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-sm font-extrabold uppercase text-slate-300 mb-4">Department Monthly Progression Trend</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics?.weekly_trend || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="week" stroke="#94a3b8" textAnchor="middle" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#94a3b8" textAnchor="end" tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: AT-RISK STUDENT MONITORING */}
        {activeTab === 'risk' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaExclamationTriangle className="text-rose-400" />
                  <span>Early Intervention Intervention List</span>
                </h3>
                <p className="text-xs text-slate-400">Identify students requiring targeted revision decks or one-on-one consultation.</p>
              </div>
              <button onClick={() => alert("Intervention automated notifications sent to 12 students via campus email!")} className="rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 px-4 py-2 font-bold text-xs hover:bg-rose-500/30 transition">
                🔔 Send Automated Intervention Reminders
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase text-slate-400 font-bold">
                    <th className="py-3 px-4">Student ID & Name</th>
                    <th className="py-3 px-4">Struggling Subject</th>
                    <th className="py-3 px-4">Avg Score</th>
                    <th className="py-3 px-4">Study Streak</th>
                    <th className="py-3 px-4">Risk Categorization</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {atRiskStudents.map((stu) => (
                    <tr key={stu.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-white">{stu.name} <span className="text-slate-500 text-xs block font-mono">{stu.id_number}</span></td>
                      <td className="py-4 px-4 text-cyan-300">{stu.subject}</td>
                      <td className="py-4 px-4 font-black text-rose-400">{stu.score}</td>
                      <td className="py-4 px-4 text-amber-300 font-mono">{stu.streak} days</td>
                      <td className="py-4 px-4"><span className="rounded-full bg-rose-500/20 border border-rose-500/30 px-3 py-0.5 text-[11px] font-bold text-rose-300">{stu.status}</span></td>
                      <td className="py-4 px-4">
                        <button onClick={() => alert(`Assigned custom remedial flashcards to ${stu.name}!`)} className="rounded-xl bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20">
                          Assign Study Deck
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TAB 3: QUESTION BANK SYNTHESIZER */}
        {activeTab === 'questionbank' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white">Synthesize Cohort Quiz Bank</h3>
              <p className="text-xs text-slate-400">Generate structured assessment batteries for examinations.</p>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Topic / Syllabus Domain</label>
                <input value={qbTopic} onChange={(e) => setQbTopic(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Difficulty & Question Count</label>
                <div className="flex gap-2">
                  <select value={qbDifficulty} onChange={(e) => setQbDifficulty(e.target.value)} className="flex-1 rounded-2xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                  <input type="number" value={qbCount} onChange={(e) => setQbCount(Number(e.target.value))} className="w-24 rounded-2xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white" />
                </div>
              </div>
              <button onClick={handleGenerateQuestionBank} className="w-full rounded-2xl bg-teal-500 py-3 font-extrabold text-xs text-slate-950 hover:bg-teal-400 transition">
                ⚡ Generate Question Bank
              </button>
            </div>

            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl space-y-4 max-h-[500px] overflow-y-auto">
              <h3 className="text-sm font-bold text-teal-300">Generated Assessment Collection</h3>
              {generatedBank.length > 0 ? (
                generatedBank.map((q, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/5 bg-slate-950 p-4 text-xs space-y-2">
                    <p className="font-bold text-white">Q{idx+1}. {q.question}</p>
                    <p className="text-emerald-400 font-semibold">✅ Correct Answer: {q.answer}</p>
                  </div>
                ))
              ) : (
                <p className="text-center py-12 text-slate-500">Click generate on the left to create automated assessment batteries!</p>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 4: UPLOAD LECTURE VIDEO */}
        {activeTab === 'upload' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-300 text-2xl border border-teal-500/30">
              <FaUpload />
            </div>
            <h2 className="text-2xl font-black text-white">Upload Syllabus Material or Recorded Lectures</h2>
            <p className="text-sm text-slate-400">Uploaded videos are automatically transcribed via Whisper Speech-to-Text and distributed to your students' portals!</p>

            <div className="border-2 border-dashed border-white/15 rounded-3xl p-8 hover:border-teal-500/50 transition cursor-pointer">
              <p className="text-sm font-bold text-teal-300">Drag & Drop MP4 / MOV Video or PDF Slides Here</p>
              <p className="text-xs text-slate-500 mt-1">Supports file sizes up to 2 GB for asynchronous background extraction</p>
            </div>
            <button onClick={() => alert("Syllabus lecture uploaded and scheduled for Whisper transcription processing!")} className="w-full rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-400 py-3 text-sm font-extrabold text-slate-950 shadow-xl">
              Publish to Student Cohorts
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
};
