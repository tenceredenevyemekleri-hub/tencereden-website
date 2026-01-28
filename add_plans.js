
const fs = require('fs');

const menuRaw = fs.readFileSync('src/data/menu.json', 'utf8');
const menu = JSON.parse(menuRaw);

menu.monthlyPlans = [
    {
        "id": 1,
        "name": "Standart Paket",
        "description": "Günlük sıcak ev yemeği",
        "pricePerDay": 220,
        "features": [
            "4 Çeşit Yemek",
            "Ücretsiz Teslimat",
            "Ekmek ve Baharat Dahil",
            "Günlük Değişen Menü"
        ],
        "popular": false
    },
    {
        "id": 2,
        "name": "Avantajlı Aylık Paket",
        "description": "Düzenli sipariş verenler için",
        "pricePerDay": 185,
        "features": [
            "4 Çeşit Yemek",
            "Ücretsiz Teslimat",
            "Öncelikli Servis",
            "Sabit Fiyat Garantisi"
        ],
        "popular": true,
        "note": "Aylık toplu ödemelerde geçerlidir"
    }
];

fs.writeFileSync('src/data/menu.json', JSON.stringify(menu, null, 2));
console.log('Added monthlyPlans to src/data/menu.json');
