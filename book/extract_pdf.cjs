const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const dataBuffer = fs.readFileSync('Matilda (Roald Dahl).pdf');

const parser = new PDFParse(dataBuffer);
parser.parse().then(data => {
    console.log('Pages:', data.numpages);
    console.log('\n--- First 10000 chars ---');
    console.log(data.text.substring(0, 10000));
    console.log('\n\n--- Total length:', data.text.length, 'chars ---');
    
    // Save full text
    fs.writeFileSync('matilda_extracted.txt', data.text);
    console.log('\nSaved to matilda_extracted.txt');
}).catch(err => {
    console.error('Error:', err);
});
