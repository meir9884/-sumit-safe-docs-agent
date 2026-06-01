const fs = require('fs');
const path = require('path');
const { validateDocumentAction } = require('../src');

const inputPath = path.join(__dirname, 'sample-input.json');
const context = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const result = validateDocumentAction(context);

console.log(JSON.stringify(result, null, 2));
