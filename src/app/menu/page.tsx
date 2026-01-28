import { Metadata } from 'next';
import Link from 'next/link';
import menuData from '@/data/menu.json';

export const metadata: Metadata = {
    title: 'Aylık Menü | Tencereden Ev Yemekleri',
    description: 'Her ay değişen, taze malzemelerle hazırlanan ev yemeği menümüz. Günlük yemek servisi ve aylık abonelik paketleri.',
};

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

    // Days of week for column headers
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
                <div className="container mx-auto text-center px-4">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-brown-dark mb-4">
                        {currentMonth.month} Menüsü
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
                        Aylık olarak güncellenen, taze malzemelerle hazırlanan ev yemekleri menümüz
                    </p>
                </div>
            </section>

            {/* Monthly Menu Grid */}
            <section className="section bg-white pt-8 pb-16">
                <div className="container mx-auto px-4 lg:px-6">

                    {/* Desktop Calendar View */}
                    <div className="hidden md:block bg-white">
                        {/* Days Header */}
                        <div className="grid grid-cols-5 mb-6 border-b border-gray-100">
                            {weekDays.map((day) => (
                                <div key={day} className="text-center pb-4">
                                    <span className="font-serif font-bold text-brand-brown-dark text-xl tracking-wide">{day}</span>
                                </div>
                            ))}
                        </div>

                        {/* Weeks Grid - Continuous Flow */}
                        <div className="space-y-0 divide-y divide-gray-100 border-b border-gray-100">
                            {currentMonth.weeks.map((week) => (
                                <div key={week.week} className="grid grid-cols-5 divide-x divide-gray-100 border-x border-gray-100 first:border-t border-t-0">
                                    {weekDays.map((dayName) => {
                                        const dayData = week.days.find(d => d.day === dayName);
                                        const isToday = dayData?.date === today;

                                        return (
                                            <div
                                                key={`${week.week}-${dayName}`}
                                                className={`
                                                    min-h-[340px] flex flex-col transition-all duration-300 relative group
                                                    ${dayData ? 'bg-white' : 'bg-gray-50/40'}
                                                    ${isToday
                                                        ? 'shadow-teal-lg ring-1 ring-brand-teal/30 z-10 scale-[1.01] rounded-xl my-[-1px] mx-[-1px] h-[calc(100%+2px)]'
                                                        : 'hover:bg-brand-cream/10'
                                                    }
                                                `}
                                            >
                                                {dayData && (
                                                    <div className="p-5 h-full flex flex-col">
                                                        {/* Date Header */}
                                                        <div className={`flex justify-between items-start mb-5 pb-3 border-b ${isToday ? 'border-brand-teal/20' : 'border-gray-50'} group-hover:border-gray-100 transition-colors`}>
                                                            <div className="flex flex-col">
                                                                <span className={`text-2xl font-serif leading-none ${isToday ? 'text-brand-teal font-bold' : 'text-gray-300 group-hover:text-brand-brown-light'}`}>
                                                                    {new Date(dayData.date).getDate()}
                                                                </span>
                                                            </div>
                                                            {isToday && (
                                                                <span className="bg-brand-teal text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ml-2">
                                                                    Bugün
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Menu Content */}
                                                        <div className="flex-grow space-y-4">
                                                            {/* Soup Section */}
                                                            {dayData.soup && (
                                                                <div className="group/soup">
                                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans mb-1 font-semibold">Başlangıç</p>
                                                                    <p className="text-gray-700 font-serif italic text-sm leading-snug">{dayData.soup}</p>
                                                                </div>
                                                            )}

                                                            {/* Main Dish Section */}
                                                            {(dayData.mainDish || dayData.secondDish) && (
                                                                <div className="group/main py-1">
                                                                    <p className="text-[10px] text-brand-orange uppercase tracking-widest font-sans mb-1 font-bold">Ana Yemek</p>
                                                                    {dayData.mainDish && (
                                                                        <p className="text-brand-brown-dark font-serif font-bold text-lg leading-tight mb-1">
                                                                            {dayData.mainDish}
                                                                        </p>
                                                                    )}
                                                                    {dayData.secondDish && (
                                                                        <div className="flex items-center gap-2 mt-1.5 opacity-80">
                                                                            <span className="text-[9px] px-1.5 py-px border border-gray-200 text-gray-400 rounded font-sans uppercase">veya</span>
                                                                            <p className="text-gray-600 font-serif text-sm">{dayData.secondDish}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {/* Sides Section */}
                                                            {(dayData.side || dayData.extra) && (
                                                                <div className="space-y-2 pt-1">
                                                                    {dayData.side && (
                                                                        <div>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="w-1 h-1 bg-brand-teal rounded-full opacity-50"></span>
                                                                                <p className="text-gray-700 text-sm font-sans">{dayData.side}</p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {dayData.extra && (
                                                                        <div>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                                                <p className="text-gray-500 text-sm font-sans">{dayData.extra}</p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Footer / Calories */}
                                                        {dayData.calories && (
                                                            <div className="mt-4 pt-3 border-t border-dashed border-gray-100 flex items-center justify-between text-xs">
                                                                <span className="text-gray-400 font-serif italic">{dayData.calories}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-8">
                        {currentMonth.weeks.map((week) => (
                            <div key={week.week}>
                                <h3 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6 pl-4 border-l-4 border-brand-teal">
                                    {week.week}. Hafta
                                </h3>
                                <div className="space-y-6">
                                    {week.days.map((day, idx) => {
                                        const isToday = day.date === today;
                                        return (
                                            <div key={idx} className={`rounded-xl overflow-hidden shadow-soft ${isToday ? 'ring-2 ring-brand-orange bg-orange-50/10' : 'bg-white'}`}>
                                                {/* Mobile Header */}
                                                <div className={`p-5 ${isToday ? 'bg-brand-orange text-white' : 'bg-brand-teal text-white'} flex justify-between items-center`}>
                                                    <div>
                                                        <span className="font-serif font-bold text-xl block">{day.day}</span>
                                                        <span className="text-sm opacity-90 font-sans">{formatDate(day.date)}</span>
                                                    </div>
                                                    {isToday && <span className="bg-white text-brand-orange text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Bugün</span>}
                                                </div>

                                                {/* Mobile Content */}
                                                <div className="p-6 space-y-5">
                                                    <div>
                                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Başlangıç</span>
                                                        <p className="text-gray-800 font-serif italic text-lg">{day.soup}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">Ana Yemek</span>
                                                        <p className="font-bold text-brand-brown-dark font-serif text-2xl">{day.mainDish}</p>
                                                        {day.secondDish && <p className="text-gray-500 font-serif text-base mt-2 pl-3 border-l-2 border-gray-100">veya {day.secondDish}</p>}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                                        <div>
                                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Yardımcı</span>
                                                            <p className="text-gray-700 font-sans">{day.side}</p>
                                                        </div>
                                                        {day.extra && (
                                                            <div>
                                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Ekstra</span>
                                                                <p className="text-gray-700 font-sans">{day.extra}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {day.calories && (
                                                        <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                                                            <span className="text-xs font-bold text-brand-teal uppercase tracking-widest">İçecek/Tatlı:</span>
                                                            <span className="text-gray-600 font-medium font-serif italic">{day.calories}</span>
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
                <div className="container mx-auto px-4 flex flex-col items-center text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                        Size Özel Teklif Almak İster misiniz?
                    </h2>
                    <p className="text-lg md:text-xl text-brand-cream/80 max-w-2xl mb-10 font-sans font-light">
                        Ofisiniz için en uygun catering paketini birlikte planlayalım.
                    </p>
                    <Link href="/basvuru" className="btn-primary text-lg px-8 py-4 bg-brand-orange hover:bg-white hover:text-brand-orange transition-colors duration-300">
                        Hemen Başvurun
                    </Link>
                </div>
            </section>
        </>
    );
}
