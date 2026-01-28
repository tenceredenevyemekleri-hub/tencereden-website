import { Metadata } from 'next';
import Link from 'next/link';
import menuData from '@/data/menu.json';

export const metadata: Metadata = {
    title: 'Aylık Menü | Tencereden Ev Yemekleri',
    description: 'Her ay değişen, taze malzemelerle hazırlanan ev yemeği menümüz. Günlük yemek servisi ve aylık abonelik paketleri.',
};

// Intefaces for new menu structure
interface DayMenu {
    date: string;
    day: string;
    soup: string;
    mainDish: string;
    secondDish: string;
    side: string;
    extra: string;
    calories: string;
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

    // Days of week for column headers and mapping
    const weekDays = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

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

            {/* Monthly Menu Grid */}
            <section className="section bg-white pt-8">
                <div className="container mx-auto px-4">
                    {/* Desktop Calendar View (Hidden on Mobile) */}
                    <div className="hidden md:block">
                        {/* Days Header */}
                        <div className="grid grid-cols-5 gap-4 mb-4">
                            {weekDays.map((day) => (
                                <div key={day} className="text-center font-bold text-brand-brown-dark text-lg py-2 uppercase tracking-wider bg-gray-50 rounded-lg">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Weeks Grid */}
                        <div className="space-y-4">
                            {currentMonth.weeks.map((week) => (
                                <div key={week.week} className="grid grid-cols-5 gap-4">
                                    {weekDays.map((dayName) => {
                                        // Find if this day exists in the current week's data
                                        const dayData = week.days.find(d => d.day === dayName);
                                        const isToday = dayData?.date === today;

                                        return (
                                            <div
                                                key={`${week.week}-${dayName}`}
                                                className={`
                                                    min-h-[300px] rounded-xl border p-4 transition-all duration-300
                                                    ${dayData
                                                        ? 'bg-white border-gray-200 hover:shadow-lg hover:border-brand-teal/30'
                                                        : 'bg-gray-50 border-gray-100 opacity-50'
                                                    }
                                                    ${isToday ? 'ring-2 ring-brand-orange shadow-md' : ''}
                                                `}
                                            >
                                                {dayData && (
                                                    <div className="h-full flex flex-col">
                                                        {/* Date Header */}
                                                        <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-2">
                                                            <span className="font-bold text-lg text-gray-800">
                                                                {new Date(dayData.date).getDate()}
                                                            </span>
                                                            <div className="text-right">
                                                                {isToday && (
                                                                    <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1">
                                                                        BUGÜN
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Menu Items List */}
                                                        <div className="space-y-2 text-sm flex-grow">
                                                            {dayData.soup && (
                                                                <div className="flex items-start gap-2">
                                                                    <span className="text-brand-orange mt-1 text-[10px]">●</span>
                                                                    <span className="text-gray-700">{dayData.soup}</span>
                                                                </div>
                                                            )}
                                                            {dayData.mainDish && (
                                                                <div className="flex items-start gap-2">
                                                                    <span className="text-brand-brown-dark font-bold mt-1 text-[10px]">●</span>
                                                                    <span className="text-brand-brown-dark font-semibold">{dayData.mainDish}</span>
                                                                </div>
                                                            )}
                                                            {dayData.secondDish && (
                                                                <div className="flex items-start gap-2 pl-2 border-l-2 border-brand-teal/20 ml-1">
                                                                    <span className="text-gray-600 text-xs">{dayData.secondDish}</span>
                                                                </div>
                                                            )}
                                                            {dayData.side && (
                                                                <div className="flex items-start gap-2">
                                                                    <span className="text-brand-teal mt-1 text-[10px]">●</span>
                                                                    <span className="text-gray-600">{dayData.side}</span>
                                                                </div>
                                                            )}
                                                            {dayData.extra && (
                                                                <div className="flex items-start gap-2">
                                                                    <span className="text-gray-400 mt-1 text-[10px]">●</span>
                                                                    <span className="text-gray-500 text-xs">{dayData.extra}</span>
                                                                </div>
                                                            )}
                                                            {dayData.calories && (
                                                                <div className="flex items-start gap-2 mt-2 pt-2 border-t border-gray-50">
                                                                    <span className="text-gray-400 mt-1">🥤</span>
                                                                    <span className="text-gray-500 text-xs italic">{dayData.calories}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile View (Card Stack) */}
                    <div className="md:hidden space-y-8">
                        {currentMonth.weeks.map((week) => (
                            <div key={week.week}>
                                <h3 className="font-serif text-xl font-bold text-brand-brown-dark mb-4 pl-2 border-l-4 border-brand-teal">
                                    {week.week}. Hafta
                                </h3>
                                <div className="space-y-4">
                                    {week.days.map((day, idx) => {
                                        const isToday = day.date === today;
                                        return (
                                            <div key={idx} className={`rounded-xl overflow-hidden shadow-soft ${isToday ? 'ring-2 ring-brand-orange' : 'bg-white'}`}>
                                                <div className={`p-4 ${isToday ? 'bg-brand-orange text-white' : 'bg-brand-teal text-white'} flex justify-between items-center`}>
                                                    <div>
                                                        <span className="font-bold block text-lg">{day.day}</span>
                                                        <span className="text-sm opacity-90">{formatDate(day.date)}</span>
                                                    </div>
                                                    {isToday && <span className="bg-white text-brand-orange text-xs font-bold px-3 py-1 rounded-full">BUGÜN</span>}
                                                </div>
                                                <div className="p-4 space-y-3">
                                                    <div>
                                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Başlangıç</span>
                                                        <p className="text-gray-800">{day.soup}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">Ana Yemek</span>
                                                        <p className="font-bold text-brand-brown-dark text-lg">{day.mainDish}</p>
                                                        {day.secondDish && <p className="text-gray-500 text-sm mt-1">veya {day.secondDish}</p>}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Yardımcı</span>
                                                            <p className="text-gray-700">{day.side}</p>
                                                        </div>
                                                        {day.extra && (
                                                            <div>
                                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Ekstra</span>
                                                                <p className="text-gray-700">{day.extra}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {day.calories && (
                                                        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">İçecek/Tatlı:</span>
                                                            <span className="text-gray-600 font-medium">{day.calories}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
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
