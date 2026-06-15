const fs = require('fs');
const path = require('path');

// Use pdftotext if available
const { execSync } = require('child_process');

try {
    // Try using pdftotext from poppler
    const result = execSync('which pdftotext', { encoding: 'utf8' });
    console.log('Found pdftotext at:', result.trim());
} catch (e) {
    console.log('pdftotext not found, trying alternative...');
}

// Read PDF and try to extract text manually
const pdfBuffer = fs.readFileSync('Matilda (Roald Dahl).pdf');

// PDF text extraction using simple regex approach
// This is a basic extraction - may not work for all PDFs
const text = pdfBuffer.toString('utf8');

// Look for text streams
const textMatches = text.match(/stream[\s\S]*?endstream/g) || [];
console.log('Found', textMatches.length, 'streams');

// Try to extract readable text
let extracted = '';
for (const match of textMatches.slice(0, 5)) {
    // Remove binary data and keep only readable text
    const cleaned = match.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
    if (cleaned.length > 50) {
        extracted += cleaned + '\n\n';
    }
}

console.log('--- Extracted text (first 3000 chars) ---');
console.log(extracted.substring(0, 3000));
