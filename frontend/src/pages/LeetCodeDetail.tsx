import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, AI_BASE_URL } from '../api';

export const LeetCodeDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hint, setHint] = useState('');
  const [loadingHint, setLoadingHint] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/leetcode/problems/slug/${slug}`);
        setProblem(res.data.problem);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchProblem();
  }, [slug]);

  const requestHint = async () => {
    setLoadingHint(true);
    try {
      const res = await axios.post(`${AI_BASE_URL}/api/ai/leetcode/hint`, {
        problem_title: problem.title,
        problem_description: problem.description,
        difficulty: problem.difficulty
      });
      setHint(res.data.hint);
    } catch (err) {
      setHint("AI Service Unavailable.");
    }
    setLoadingHint(false);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!problem) return <div className="p-8 text-center text-red-500">Problem not found.</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto dark:text-white">
      <button onClick={() => navigate('/leetcode')} className="text-blue-500 hover:underline mb-6">&larr; Back to Problems</button>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{problem.problemId}. {problem.title}</h1>
          <div className="flex gap-2 items-center">
            <span className={`px-2 py-1 text-xs rounded-full ${
              problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </div>
        <a 
          href={problem.url} 
          target="_blank" 
          rel="noreferrer"
          className="px-4 py-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-black rounded-lg text-sm font-medium hover:opacity-90"
        >
          Open on LeetCode
        </a>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8 prose dark:prose-invert max-w-none">
        <h3>Description</h3>
        <p className="whitespace-pre-wrap">{problem.description}</p>
        
        {problem.examples?.length > 0 && (
          <div className="mt-6">
            <h3>Examples</h3>
            {problem.examples.map((ex: any, idx: number) => (
              <pre key={idx} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mt-2">
                <strong>Input:</strong> {ex.input}<br/>
                <strong>Output:</strong> {ex.output}<br/>
                {ex.explanation && <span><strong>Explanation:</strong> {ex.explanation}</span>}
              </pre>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800 mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">🤖 Gemini AI Tutor</h3>
        <p className="text-sm opacity-80 mb-4">Stuck? Ask the AI Tutor for a Socratic hint without revealing the exact code.</p>
        <button 
          onClick={getAiHint}
          disabled={loadingHint}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loadingHint ? 'Generating Hint...' : 'Generate Socratic Hint'}
        </button>
        {hint && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="font-medium text-blue-800 dark:text-blue-300">💡 Hint:</p>
            <p className="mt-1">{hint}</p>
          </div>
        )}
      </div>
    </div>
  );
};
