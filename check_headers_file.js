
const XLSX = require('xlsx');
const fs = require('fs');

const file = XLSX.readFile('menu_source.xlsx');
const sheet = file.Sheets[file.SheetNames[0]];
const range = XLSX.utils.decode_range(sheet['!ref']);

const headers = [];
for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({ r: 0, c: C })];
    headers.push(cell ? cell.v.trim() : `Column ${C}`);
}

fs.writeFileSync('headers.json', JSON.stringify(headers, null, 2));
