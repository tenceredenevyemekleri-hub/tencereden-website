import { Metadata } from 'next';
import Link from 'next/link';
import menuData from '@/data/menu.json';

export const metadata: Metadata = {
    title: 'Aylık Menü | Tencereden Ev Yemekleri',
    description: 'Her ay değişen, taze malzemelerle hazırlanan ev yemeği menümüz. Günlük yemek servisi ve aylık abonelik paketleri.',
};

// New TypeScript interfaces matching the parsed Excel data
interface DayMeals {
    soup: string;
    mainDish: string;
    secondDish: string;
    side: string;
    extra: string;
    calories: string; // The excel had this as text in the last column
}

interface DayMenu {
    date: string;
    day: string;
    soup: string;
    mainDish: string;
    secondDish: string;
    side: string;
    extra: string;
    calories: string; // Using as 'Yan Ürün/İçecek' based on data
}

interface Week {
    week: number;
    days: DayMenu[];
}

interface Month {
    month: string;
    weeks: Week[];
}

export default function MenuPage() {
    const { months } = menuData as { months: Month[] };
    const currentMonth = months[0];

    // Get today's date for highlighting
    const today = new Date().toISOString().split('T')[0];

    // Helper function to format date
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
    };

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-cream">
                <div className="container mx-auto text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-brown-dark mb-4">
                        {currentMonth.month} Menüsü
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Aylık olarak güncellenen, taze malzemelerle hazırlanan ev yemekleri menümüz
                    </p>
                </div>
            </section>

            {/* Monthly Menu Calendar */}
            <section className="section bg-white">
                <div className="container mx-auto">
                    {currentMonth.weeks.map((week) => (
                        <div key={week.week} className="mb-16 last:mb-0">
                            <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6 border-b pb-2 border-brand-teal inline-block">
                                {week.week}. Hafta
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                                {week.days.map((day, idx) => {
                                    const isToday = day.date === today;

                                    return (
                                        <div
                                            key={idx}
                                            className={`rounded-xl overflow-hidden shadow-soft transition-all duration-300 hover:shadow-lg flex flex-col h-full ${isToday ? 'ring-2 ring-brand-orange transform scale-105' : 'bg-white'}`}
                                        >
                                            {/* Header */}
                                            <div className={`p-4 text-center ${isToday ? 'bg-brand-orange text-white' : 'bg-brand-teal text-white'}`}>
                                                <div className="font-bold text-lg">{day.day}</div>
                                                <div className="text-sm opacity-90">{formatDate(day.date)}</div>
                                                {isToday && <div className="text-xs mt-1 font-bold bg-white text-brand-orange inline-block px-2 py-0.5 rounded-full">BUGÜN</div>}
                                            </div>

                                            {/* Body */}
                                            <div className="p-4 flex-grow flex flex-col gap-3 text-sm">
                                                {/* Soup */}
                                                <div className="flex flex-col">
                                                    <span className="text-brand-orange font-bold text-xs uppercase tracking-wider mb-1">Çorba</span>
                                                    <span className="text-gray-700 font-medium">{day.soup || '-'}</span>
                                                </div>

                                                <div className="border-t border-gray-100 my-1"></div>

                                                {/* Main Dish 1 */}
                                                <div className="flex flex-col">
                                                    <span className="text-brand-orange font-bold text-xs uppercase tracking-wider mb-1">Ana Yemek 1</span>
                                                    <span className="text-brand-brown-dark font-bold">{day.mainDish || '-'}</span>
                                                </div>

                                                {/* Main Dish 2 */}
                                                {day.secondDish && (
                                                    <div className="flex flex-col">
                                                        <span className="text-brand-orange font-bold text-xs uppercase tracking-wider mb-1">Ana Yemek 2</span>
                                                        <span className="text-brand-brown-dark font-bold">{day.secondDish}</span>
                                                    </div>
                                                )}

                                                <div className="border-t border-gray-100 my-1"></div>

                                                {/* Side */}
                                                <div className="flex flex-col">
                                                    <span className="text-brand-orange font-bold text-xs uppercase tracking-wider mb-1">Yardımcı Yemek</span>
                                                    <span className="text-gray-700">{day.side || '-'}</span>
                                                </div>

                                                {/* Extra */}
                                                {day.extra && (
                                                    <div className="flex flex-col">
                                                        <span className="text-brand-orange font-bold text-xs uppercase tracking-wider mb-1">Ekstra</span>
                                                        <span className="text-gray-700">{day.extra}</span>
                                                    </div>
                                                )}

                                                {/* Beverage/Dessert (mapped from calories column) */}
                                                {day.calories && (
                                                    <>
                                                        <div className="border-t border-gray-100 my-1"></div>
                                                        <div className="flex flex-col">
                                                            <span className="text-brand-orange font-bold text-xs uppercase tracking-wider mb-1">İçecek / Tatlı</span>
                                                            <span className="text-gray-700">{day.calories}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-brand-brown-dark text-white">
                <div className="container mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ textAlign: 'center' }}>
                        Size Özel Teklif Almak İster misiniz?
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mb-8" style={{ textAlign: 'center' }}>
                        Kişi sayınıza ve tercihlerinize göre size özel bir teklif hazırlayabiliriz.
                    </p>
                    <Link href="/basvuru" className="btn-primary text-lg">
                        Hemen Başvurun
                    </Link>
                </div>
            </section>
        </>
    );
}
