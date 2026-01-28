
const fs = require('fs');

try {
    // Read old menu (might be UTF-16LE from PowerShell redirection)
    let oldMenuRaw = fs.readFileSync('old_menu.json');
    let oldMenuStr;

    // Check for BOM or null bytes typical of UTF-16
    if (oldMenuRaw[0] === 0xFF && oldMenuRaw[1] === 0xFE) {
        oldMenuStr = oldMenuRaw.toString('utf16le');
    } else {
        oldMenuStr = oldMenuRaw.toString('utf8');
    }

    const oldMenu = JSON.parse(oldMenuStr);

    // Read new menu
    const newMenuRaw = fs.readFileSync('src/data/menu.json', 'utf8');
    const newMenu = JSON.parse(newMenuRaw);

    // Merge
    newMenu.monthlyPlans = oldMenu.monthlyPlans;
    newMenu.mealCategories = oldMenu.mealCategories; // Keep if useful

    fs.writeFileSync('src/data/menu.json', JSON.stringify(newMenu, null, 2));
    console.log('Merged monthlyPlans and mealCategories into src/data/menu.json');

} catch (e) {
    console.error('Error merging:', e);
}
