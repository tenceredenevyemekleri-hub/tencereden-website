
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const MENU_FILE_PATH = path.join(__dirname, 'src/data/menu.json');
const EXCEL_FILE_PATH = 'menu_source.xlsx';

function parseDate(excelDate) {
    if (!excelDate) return null;
    // Excel date to JS Date
    const date = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
    return date.toISOString().split('T')[0];
}

function getDayName(dateStr) {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return days[new Date(dateStr).getDay()];
}

try {
    // 1. Read Excel
    const workbook = XLSX.readFile(EXCEL_FILE_PATH);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // 2. Extract Headers (Row 0)
    const headers = data[0];
    const categories = {
        soup: headers[1] || 'Çorba',
        mainDish: headers[2] || 'Ana Yemek 1',
        secondDish: headers[3] || 'Ana Yemek 2',
        side: headers[4] || 'Yardımcı Yemek 1',
        extra: headers[5] || 'Yardımcı Yemek 2',
        calories: headers[6] || 'Yan Ürün'
    };

    console.log('Extracted Categories:', categories);

    // 3. Parse Data Rows
    const monthsMap = new Map();

    // Skip header row
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length === 0) continue;

        const dateVal = row[0];
        if (!dateVal) continue;

        const dateStr = typeof dateVal === 'number' ? parseDate(dateVal) : null;
        if (!dateStr) continue; // Skip invalid dates

        const dateObj = new Date(dateStr);
        const monthKey = dateObj.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

        // Determine week number (simple approach: incremental within month)
        // We'll organize by actual week later

        if (!monthsMap.has(monthKey)) {
            monthsMap.set(monthKey, []);
        }

        const dayData = {
            date: dateStr,
            day: getDayName(dateStr),
            soup: row[1] || '',
            mainDish: row[2] || '',
            secondDish: row[3] || '',
            side: row[4] || '', // Pilav/Makarna 1
            extra: row[5] || '', // Pilav/Makarna 2
            calories: row[6] || '' // Yan Ürün
        };

        monthsMap.get(monthKey).push(dayData);
    }

    // 4. Structure into Months -> Weeks -> Days
    const months = [];

    for (const [monthName, days] of monthsMap) {
        // Sort days by date
        days.sort((a, b) => new Date(a.date) - new Date(b.date));

        const weeks = [];
        let currentWeek = { week: 1, days: [] };

        // Simple week grouping: Start new week on Mondays? 
        // Or just chunks of 7? Or based on date?
        // Let's use Monday as start of week.

        if (days.length > 0) {
            let weekNum = 1;
            // Find first Monday? Or just group continuously?
            // The previous logic grouped by ISO week or similar.
            // Let's iterate days and break when day is Monday (if previous day wasn't Sunday, handle gaps?)
            // Simplest: If day is Monday and currentGroup is not empty, push and start new.

            // Actually, handle "first week might start mid-week"

            days.forEach((day, index) => {
                const d = new Date(day.date);
                const isMonday = d.getDay() === 1;

                if (isMonday && currentWeek.days.length > 0) {
                    weeks.push(currentWeek);
                    weekNum++;
                    currentWeek = { week: weekNum, days: [] };
                }

                currentWeek.days.push(day);
            });

            if (currentWeek.days.length > 0) {
                weeks.push(currentWeek);
            }
        }

        months.push({
            month: monthName,
            weeks: weeks
        });
    }

    // 5. Read Existing Menu to Preserve Plans
    let existingData = {};
    if (fs.existsSync(MENU_FILE_PATH)) {
        existingData = JSON.parse(fs.readFileSync(MENU_FILE_PATH, 'utf8'));
    }

    // 6. Combine and Save
    const finalData = {
        months: months,
        categories: categories,
        monthlyPlans: existingData.monthlyPlans || [] // Preserve or default empty
    };

    fs.writeFileSync(MENU_FILE_PATH, JSON.stringify(finalData, null, 2));
    console.log('Successfully updated menu.json with Excel data and dynamic categories.');

} catch (error) {
    console.error('Error parsing menu:', error);
}
