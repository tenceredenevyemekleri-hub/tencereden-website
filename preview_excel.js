
const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('menu_source.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert to JSON with array of arrays to preserve structure
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

console.log(JSON.stringify(data, null, 2));
