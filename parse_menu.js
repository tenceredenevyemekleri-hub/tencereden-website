
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const workbook = XLSX.readFile('menu_source.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

function excelDateToJSDate(serial) {
    if (!serial || typeof serial !== 'number') return null;
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split('T')[0];
}

function getDayName(dateString) {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return days[new Date(dateString).getDay()];
}

const menuItems = [];
// Assuming headers are on row 1 (index 0) or 2. Let's look at the data again. real data likely starts from row 2
// Row 0 might be headers.
// Let's iterate and try to find rows with a date in the first column.

rawData.forEach((row, index) => {
    // Check if first column is a number (date serial)
    if (typeof row[0] === 'number' && row[0] > 40000) {
        const dateStr = excelDateToJSDate(row[0]);
        if (!dateStr) return;

        const dayName = getDayName(dateStr);
        // Skip weekends if no food
        if (dayName === 'Cumartesi' || dayName === 'Pazar') return;

        menuItems.push({
            date: dateStr,
            day: dayName,
            soup: row[1] || '',
            mainDish: row[2] || '', // Main dish 1
            secondDish: row[3] || '', // Main dish 2 
            side: row[4] || '', // Rice/Pasta
            extra: row[5] || '', // Salad/Yoghurt/Dessert
            calories: row[6] || 0
        });
    }
});

// Group by weeks
const weeks = [];
let currentWeek = [];
let weekNum = 1;

menuItems.forEach((item, index) => {
    currentWeek.push(item);
    // If it's Friday or last item, close the week
    if (item.day === 'Cuma' || index === menuItems.length - 1) {
        weeks.push({
            week: weekNum++,
            days: currentWeek
        });
        currentWeek = [];
    }
});

const output = {
    months: [
        {
            month: "Şubat 2026", // Assuming current or next month, user said 'Aylık Menüler'
            weeks: weeks
        }
    ]
};

// We will overwrite menu.json but we should probably keep the original structure logic if possible.
// For now let's just create this new structure.
console.log(JSON.stringify(output, null, 2));

fs.writeFileSync('src/data/menu.json', JSON.stringify(output, null, 2));
console.log('src/data/menu.json updated');
