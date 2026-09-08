import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEETCODE_API = 'https://leetcode.com/graphql';

async function fetchTopLeetCodeProblems() {
  console.log("Fetching Top 500 LeetCode problems...");
  
  const query = `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList: questionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        total: totalNum
        questions: data {
          acRate
          difficulty
          freqBar
          frontendQuestionId: questionFrontendId
          isFavor
          paidOnly: isPaidOnly
          status
          title
          titleSlug
          topicTags {
            name
            id
            slug
          }
          hasSolution
          hasVideoSolution
        }
      }
    }
  `;

  try {
    const response = await fetch(LEETCODE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { categorySlug: "", skip: 0, limit: 500, filters: {} }
      })
    });

    const data = await response.json();
    const questions = data.data.problemsetQuestionList.questions;
    
    // Filter out paid-only questions to keep it open-source accessible
    const freeQuestions = questions.filter(q => !q.paidOnly);

    const formattedProblems = freeQuestions.map(q => ({
      id: `lc-${q.frontendQuestionId}`,
      platform: "LeetCode",
      title: q.title,
      difficulty: q.difficulty,
      topic: q.topicTags.map(t => t.name).join(', ') || 'General',
      description: `<p>Please solve <b>${q.title}</b>.</p><p><a href="https://leetcode.com/problems/${q.titleSlug}" target="_blank">View on LeetCode</a></p>`,
      starterCode: {
        python: `def solve():\n    # Implement ${q.title}\n    pass\n`,
        javascript: `function solve() {\n    // Implement ${q.title}\n}\n`,
        cpp: `#include <iostream>\nusing namespace std;\nvoid solve() {\n    // Implement ${q.title}\n}\n`
      },
      testCases: [] // For 500 dynamic problems, we'd need deeper scraping for test cases, so we leave it empty for generic ones
    }));

    // Re-inject our fully working test-case problems at the top so the Demo works flawlessly
    const demoProblems = [
      {
        "id": "lc-1",
        "platform": "LeetCode",
        "title": "Two Sum",
        "difficulty": "Easy",
        "topic": "Arrays & Hashing",
        "description": "<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>",
        "starterCode": {
          "python": "def two_sum(nums, target):\n    # Write your code here\n    pass\n",
          "javascript": "function twoSum(nums, target) {\n    // Write your code here\n}\n"
        },
        "testCases": [
          { "input": "[2, 7, 11, 15]\\n9", "expectedOutput": "[0, 1]" },
          { "input": "[3, 2, 4]\\n6", "expectedOutput": "[1, 2]" },
          { "input": "[3, 3]\\n6", "expectedOutput": "[0, 1]" }
        ]
      },
      {
        "id": "lc-20",
        "platform": "LeetCode",
        "title": "Valid Parentheses",
        "difficulty": "Easy",
        "topic": "Stack",
        "description": "<p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>",
        "starterCode": {
          "python": "def is_valid(s):\n    # Write your code here\n    pass\n",
          "javascript": "function isValid(s) {\n    // Write your code here\n}\n"
        },
        "testCases": [
          { "input": "\"()\"", "expectedOutput": "true" },
          { "input": "\"()[]{}\"", "expectedOutput": "true" },
          { "input": "\"(]\"", "expectedOutput": "false" }
        ]
      }
    ];

    // Merge ensuring no duplicates for LC-1 and LC-20
    const finalDB = demoProblems.concat(formattedProblems.filter(p => p.id !== 'lc-1' && p.id !== 'lc-20'));

    const outputPath = path.join(__dirname, '..', 'data', 'leetcode_problems.json');
    fs.writeFileSync(outputPath, JSON.stringify(finalDB, null, 2));
    
    console.log(`Successfully saved ${finalDB.length} problems to the database!`);
  } catch (error) {
    console.error("Failed to fetch LeetCode problems:", error);
  }
}

fetchTopLeetCodeProblems();
