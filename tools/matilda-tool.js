#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const VERSION = '1.0.0';
const REQUIRED_FIELDS = ['id', 'question', 'options', 'correctAnswer', 'difficulty', 'tags', 'type'];

// CSV Parser
function parseCSV(content) {
  const lines = content.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const record = {};
    headers.forEach((header, idx) => {
      record[header] = values[idx] || '';
    });
    records.push(record);
  }

  return records;
}

// Handle CSV line with potential pipe characters in options
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());

  return result;
}

// Validate questions
function validate(questions) {
  const errors = [];
  const idSet = new Set();

  questions.forEach((q, index) => {
    const rowNum = index + 2; // +2 for header and 0-index

    // E004: Required fields missing
    for (const field of REQUIRED_FIELDS) {
      if (!q[field] || q[field].toString().trim() === '') {
        errors.push({ code: 'E004', row: rowNum, message: `Missing required field: ${field}` });
      }
    }

    // E001: Duplicate ID
    if (q.id) {
      if (idSet.has(q.id)) {
        errors.push({ code: 'E001', row: rowNum, message: `Duplicate ID: ${q.id}` });
      }
      idSet.add(q.id);
    }

    // E002: Options不足（需2个以上）
    if (q.options) {
      const options = q.options.split('|').map(o => o.trim()).filter(o => o);
      if (options.length < 2) {
        errors.push({ code: 'E002', row: rowNum, message: `Insufficient options (need at least 2): ${q.options}` });
      }
    }

    // E003: 答案不在选项中
    if (q.options && q.correctAnswer) {
      const options = q.options.split('|').map(o => o.trim());
      if (!options.includes(q.correctAnswer.trim())) {
        errors.push({ code: 'E003', row: rowNum, message: `Correct answer not in options: ${q.correctAnswer}` });
      }
    }
  });

  return errors;
}

// Build JSON from CSV
function build(questions) {
  return {
    version: VERSION,
    lastUpdated: new Date().toISOString(),
    questions: questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options.split('|').map(o => o.trim()),
      correctAnswer: q.correctAnswer.trim(),
      difficulty: q.difficulty,
      tags: q.tags.split('|').map(t => t.trim()),
      type: q.type
    }))
  };
}

// Stats
function stats(jsonPath) {
  const content = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(content);

  const questions = data.questions || [];
  const difficultyStats = {};
  const typeStats = {};
  const tagStats = {};

  questions.forEach(q => {
    // Difficulty stats
    difficultyStats[q.difficulty] = (difficultyStats[q.difficulty] || 0) + 1;

    // Type stats
    typeStats[q.type] = (typeStats[q.type] || 0) + 1;

    // Tag stats
    (q.tags || []).forEach(tag => {
      tagStats[tag] = (tagStats[tag] || 0) + 1;
    });
  });

  return {
    total: questions.length,
    difficulty: difficultyStats,
    type: typeStats,
    tags: tagStats
  };
}

// CLI
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log(`
Matilda Question Bank CLI Tool v${VERSION}

Usage:
  node tools/matilda-tool.js validate --input <file>
  node tools/matilda-tool.js build --input <file> --output <file>
  node tools/matilda-tool.js stats --input <file>

Examples:
  node tools/matilda-tool.js validate --input data/questions.csv
  node tools/matilda-tool.js build --input data/questions.csv --output dist/questions.json
  node tools/matilda-tool.js stats --input dist/questions.json
`);
    process.exit(0);
  }

  const getArg = (name) => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : null;
  };

  try {
    switch (command) {
      case 'validate': {
        const inputFile = getArg('input');
        if (!inputFile) {
          console.error('Error: --input is required');
          process.exit(1);
        }

        if (!fs.existsSync(inputFile)) {
          console.error(`Error: File not found: ${inputFile}`);
          process.exit(1);
        }

        const content = fs.readFileSync(inputFile, 'utf-8');
        const questions = parseCSV(content);
        const errors = validate(questions);

        if (errors.length === 0) {
          console.log(`✓ Validation passed! ${questions.length} questions validated.`);
        } else {
          console.log(`✗ Validation failed with ${errors.length} error(s):`);
          errors.forEach(e => {
            console.log(`  [${e.code}] Row ${e.row}: ${e.message}`);
          });
          process.exit(1);
        }
        break;
      }

      case 'build': {
        const inputFile = getArg('input');
        const outputFile = getArg('output');

        if (!inputFile || !outputFile) {
          console.error('Error: --input and --output are required');
          process.exit(1);
        }

        if (!fs.existsSync(inputFile)) {
          console.error(`Error: File not found: ${inputFile}`);
          process.exit(1);
        }

        const content = fs.readFileSync(inputFile, 'utf-8');
        const questions = parseCSV(content);
        const errors = validate(questions);

        if (errors.length > 0) {
          console.log(`✗ Build aborted: ${errors.length} validation error(s):`);
          errors.forEach(e => {
            console.log(`  [${e.code}] Row ${e.row}: ${e.message}`);
          });
          process.exit(1);
        }

        const jsonData = build(questions);

        // Ensure output directory exists
        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
        console.log(`✓ Build successful! ${questions.length} questions written to ${outputFile}`);
        break;
      }

      case 'stats': {
        const inputFile = getArg('input');
        if (!inputFile) {
          console.error('Error: --input is required');
          process.exit(1);
        }

        if (!fs.existsSync(inputFile)) {
          console.error(`Error: File not found: ${inputFile}`);
          process.exit(1);
        }

        const statsData = stats(inputFile);
        console.log(`
=== Question Bank Statistics ===
Total Questions: ${statsData.total}

By Difficulty:`);
        Object.entries(statsData.difficulty).forEach(([k, v]) => {
          console.log(`  ${k}: ${v}`);
        });

        console.log('\nBy Type:');
        Object.entries(statsData.type).forEach(([k, v]) => {
          console.log(`  ${k}: ${v}`);
        });

        console.log('\nBy Tags:');
        Object.entries(statsData.tags).forEach(([k, v]) => {
          console.log(`  ${k}: ${v}`);
        });
        break;
      }

      default:
        console.error(`Unknown command: ${command}`);
        console.log('Valid commands: validate, build, stats');
        process.exit(1);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
