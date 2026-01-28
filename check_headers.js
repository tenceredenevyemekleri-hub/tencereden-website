
const XLSX = require('xlsx');

const file = XLSX.readFile('menu_source.xlsx');
const sheet = file.Sheets[file.SheetNames[0]];
const range = XLSX.utils.decode_range(sheet['!ref']);

// Read first row (headers)
const headers = [];
for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({ r: 0, c: C })];
    headers.push(cell ? cell.v : `UNKNOWN_${C}`);
}

console.log(JSON.stringify(headers, null, 2));
