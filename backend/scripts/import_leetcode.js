import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { LeetCodeProblem } from '../models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env explicitly
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai_study_strategist';

async function importLeetCodeData() {
  console.log('🚀 Starting LeetCode Database Import...');

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const dataPath = path.join(__dirname, '..', 'data', 'leetcode_import.json');
    if (!fs.existsSync(dataPath)) {
      console.error(`❌ Data file not found at ${dataPath}`);
      process.exit(1);
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    const problems = JSON.parse(rawData);
    
    if (!Array.isArray(problems)) {
      throw new Error('JSON data must be an array of problems.');
    }

    console.log(`📦 Found ${problems.length} problems to import.`);

    let successful = 0;
    let failed = 0;
    let skipped = 0; // Handled implicitly by upsert, but we can track if needed

    // Use bulkWrite for massive performance optimization and upserting (avoids duplicates)
    const bulkOps = problems.map(problem => {
      // Basic sanitization
      const safeProblem = {
        problemId: problem.problemId,
        title: problem.title,
        slug: problem.slug || problem.title.toLowerCase().replace(/ /g, '-'),
        description: problem.description || 'No description provided.',
        difficulty: problem.difficulty || 'Medium',
        topics: problem.topics || [],
        companies: problem.companies || [],
        hints: problem.hints || [],
        examples: problem.examples || [],
        constraints: problem.constraints || [],
        starterCode: problem.starterCode || {},
        url: problem.url || `https://leetcode.com/problems/${problem.slug}`,
        updatedAt: new Date()
      };

      return {
        updateOne: {
          filter: { problemId: safeProblem.problemId },
          update: { $set: safeProblem },
          upsert: true
        }
      };
    });

    // Execute bulk write
    if (bulkOps.length > 0) {
      console.log('🔄 Executing Bulk Upsert...');
      const result = await LeetCodeProblem.bulkWrite(bulkOps, { ordered: false });
      
      console.log(`\n🎉 Import Complete!`);
      console.log(`- Inserted: ${result.upsertedCount}`);
      console.log(`- Updated (Modified): ${result.modifiedCount}`);
      console.log(`- Matched (Skipped): ${result.matchedCount - result.modifiedCount}`);
    } else {
      console.log('⚠️ No operations to perform.');
    }

  } catch (error) {
    console.error('❌ Import Failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

importLeetCodeData();
