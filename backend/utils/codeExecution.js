import axios from 'axios';

const PISTON_API_URL = 'https://emkc.org/api/v2/piston';

// Map our language names to Piston's language runtime names and versions
const LANGUAGE_MAP = {
  python: { language: 'python', version: '3.10.0' },
  javascript: { language: 'javascript', version: '18.15.0' },
  java: { language: 'java', version: '15.0.2' },
  cpp: { language: 'c++', version: '10.2.0' },
  c: { language: 'c', version: '10.2.0' },
  csharp: { language: 'csharp', version: '6.12.0' },
  go: { language: 'go', version: '1.16.2' },
};

/**
 * Executes code securely using the public Piston API.
 * @param {string} language - The language identifier (e.g., 'python', 'javascript')
 * @param {string} sourceCode - The raw code to execute
 * @param {string} stdin - Standard input to pass to the program (e.g., test cases)
 * @returns {Promise<{run: {output: string, stdout: string, stderr: string, code: number, signal: string}}>}
 */
export const executeCode = async (language, sourceCode, stdin = '') => {
  const langConfig = LANGUAGE_MAP[language.toLowerCase()];
  
  if (!langConfig) {
    throw new Error(`Language '${language}' is not supported by the execution engine.`);
  }

  const payload = {
    language: langConfig.language,
    version: langConfig.version,
    files: [
      {
        content: sourceCode
      }
    ],
    stdin: stdin,
    compile_timeout: 10000, // 10 seconds compile
    run_timeout: 3000,      // 3 seconds run timeout
    compile_memory_limit: -1,
    run_memory_limit: -1
  };

  try {
    const response = await axios.post(`${PISTON_API_URL}/execute`, payload);
    return response.data;
  } catch (error) {
    console.error("Code Execution Error (Piston):", error.response?.data || error.message);
    throw new Error("Execution engine failed to process the request.");
  }
};
