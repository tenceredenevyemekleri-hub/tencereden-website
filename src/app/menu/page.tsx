import { Metadata } from 'next';
import Link from 'next/link';
import menuData from '@/data/menu.json';

export const metadata: Metadata = {
    title: 'Haftalık Menü | Tencereden Ev Yemekleri',
    description: 'Her hafta değişen, taze malzemelerle hazırlanan ev yemeği menümüz. Günlük yemek servisi ve aylık abonelik paketleri.',
};

// TypeScript interfaces
interface DayMeals {
    soup: string | null;
    mainDish: string | null;
    rice: string | null;
    salad: string | null;
    dessert: string | null;
    drink: string | null;
}

interface DayMenu {
    day: string;
    date: string;
    meals: DayMeals;
}

interface Week {
    weekNumber: number;
    weekStart: string;
    weekEnd: string;
    days: DayMenu[];
}

export default function MenuPage() {
    const { weeklyMenu, monthlyPlans, mealCategories } = menuData;
    const weeks = weeklyMenu.weeks as Week[];

    // Get today's date for highlighting
    const today = new Date().toISOString().split('T')[0];

    // Helper function to format date
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
    };

    const formatWeekRange = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return `${startDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })} - ${endDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}`;
    };

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-cream">
                <div className="container mx-auto text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-brown-dark mb-4">
                        {weeklyMenu.month} Menüsü
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Haftalık olarak güncellenen, taze malzemelerle hazırlanan ev yemekleri menümüz
                    </p>
                </div>
            </section>

            {/* Weekly Menus */}
            <section className="section bg-white">
                <div className="container mx-auto">
                    {weeks.map((week, weekIndex) => {
                        const isCurrentWeek = week.days.some(d => d.date === today);

                        return (
                            <div key={weekIndex} className="mb-24 last:mb-0">
                                {/* Week Header */}
                                <div className={`flex items-center justify-between mb-6 pb-4 border-b-2 ${isCurrentWeek ? 'border-brand-teal' : 'border-gray-200'}`}>
                                    <div>
                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-brown-dark">
                                            {week.weekNumber}. Hafta
                                        </h2>
                                        <p className="text-gray-500 mt-1">
                                            {formatWeekRange(week.weekStart, week.weekEnd)}
                                        </p>
                                    </div>
                                    {isCurrentWeek && (
                                        <span style={{ padding: '14px 32px', whiteSpace: 'nowrap' }} className="bg-brand-teal text-white rounded-full text-sm font-medium">
                                            Bu Hafta
                                        </span>
                                    )}
                                </div>

                                {/* Desktop Table View */}
                                <div className="hidden lg:block overflow-x-auto">
                                    <table className="w-full border-separate" style={{ borderSpacing: '8px 6px' }}>
                                        <thead>
                                            <tr>
                                                <th className="w-36 p-4 bg-brand-teal text-white font-medium text-left rounded-lg">
                                                    Kategori
                                                </th>
                                                {week.days.map((day, idx) => {
                                                    const isToday = day.date === today;
                                                    return (
                                                        <th
                                                            key={idx}
                                                            className={`p-4 text-center font-medium rounded-lg ${isToday
                                                                ? 'bg-brand-orange text-white'
                                                                : 'bg-brand-teal text-white'
                                                                }`}
                                                        >
                                                            <div className="font-bold">{day.day}</div>
                                                            <div className="text-sm opacity-90">{formatDate(day.date)}</div>
                                                            {isToday && <div className="text-xs mt-1 font-bold">BUGÜN</div>}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Soup Row */}
                                            <tr>
                                                <td className="p-4 bg-brand-cream font-semibold text-brand-brown-dark rounded-lg">
                                                    🍲 {mealCategories.soup}
                                                </td>
                                                {week.days.map((day, idx) => {
                                                    const isToday = day.date === today;
                                                    return (
                                                        <td key={idx} className={`p-4 text-center rounded-lg ${isToday ? 'bg-orange-50' : 'bg-gray-50'}`}>
                                                            <span className="text-gray-700">{day.meals.soup || '-'}</span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            {/* Main Dish Row */}
                                            <tr>
                                                <td className="p-4 bg-brand-cream font-semibold text-brand-brown-dark rounded-lg">
                                                    🍖 {mealCategories.mainDish}
                                                </td>
                                                {week.days.map((day, idx) => {
                                                    const isToday = day.date === today;
                                                    return (
                                                        <td key={idx} className={`p-4 text-center rounded-lg ${isToday ? 'bg-orange-50' : 'bg-gray-50'}`}>
                                                            <span className="font-semibold text-brand-brown-dark">{day.meals.mainDish || '-'}</span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            {/* Rice Row */}
                                            <tr>
                                                <td className="p-4 bg-brand-cream font-semibold text-brand-brown-dark rounded-lg">
                                                    🍚 {mealCategories.rice}
                                                </td>
                                                {week.days.map((day, idx) => {
                                                    const isToday = day.date === today;
                                                    return (
                                                        <td key={idx} className={`p-4 text-center rounded-lg ${isToday ? 'bg-orange-50' : 'bg-gray-50'}`}>
                                                            <span className="text-gray-700">{day.meals.rice || '-'}</span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            {/* Salad Row */}
                                            <tr>
                                                <td className="p-4 bg-brand-cream font-semibold text-brand-brown-dark rounded-lg">
                                                    🥗 {mealCategories.salad}
                                                </td>
                                                {week.days.map((day, idx) => {
                                                    const isToday = day.date === today;
                                                    return (
                                                        <td key={idx} className={`p-4 text-center rounded-lg ${isToday ? 'bg-orange-50' : 'bg-gray-50'}`}>
                                                            <span className="text-gray-700">{day.meals.salad || '-'}</span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            {/* Dessert Row */}
                                            <tr>
                                                <td className="p-4 bg-brand-cream font-semibold text-brand-brown-dark rounded-lg">
                                                    🍰 {mealCategories.dessert}
                                                </td>
                                                {week.days.map((day, idx) => {
                                                    const isToday = day.date === today;
                                                    return (
                                                        <td key={idx} className={`p-4 text-center rounded-lg ${isToday ? 'bg-orange-50' : 'bg-gray-50'}`}>
                                                            <span className={`${day.meals.dessert ? 'text-brand-orange font-medium' : 'text-gray-400'}`}>
                                                                {day.meals.dessert || '-'}
                                                            </span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            {/* Drink Row */}
                                            <tr>
                                                <td className="p-4 bg-brand-cream font-semibold text-brand-brown-dark rounded-lg">
                                                    🥤 {mealCategories.drink}
                                                </td>
                                                {week.days.map((day, idx) => {
                                                    const isToday = day.date === today;
                                                    return (
                                                        <td key={idx} className={`p-4 text-center rounded-lg ${isToday ? 'bg-orange-50' : 'bg-gray-50'}`}>
                                                            <span className="text-gray-600">{day.meals.drink || '-'}</span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Card View */}
                                <div className="lg:hidden space-y-4">
                                    {week.days.map((day, dayIndex) => {
                                        const isToday = day.date === today;
                                        return (
                                            <div
                                                key={dayIndex}
                                                className={`rounded-2xl overflow-hidden shadow-soft ${isToday ? 'ring-2 ring-brand-orange' : ''}`}
                                            >
                                                {/* Day Header */}
                                                <div className={`p-4 ${isToday ? 'bg-brand-orange' : 'bg-brand-teal'} text-white`}>
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h3 className="font-bold text-lg">{day.day}</h3>
                                                            <p className="text-sm opacity-90">{formatDate(day.date)}</p>
                                                        </div>
                                                        {isToday && (
                                                            <span className="bg-white text-brand-orange px-3 py-1 rounded-full text-sm font-bold">
                                                                BUGÜN
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Meals */}
                                                <div className="bg-white p-4 space-y-3">
                                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                        <span className="text-gray-600">🍲 {mealCategories.soup}</span>
                                                        <span className="font-medium text-gray-800">{day.meals.soup || '-'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                        <span className="text-gray-600">🍖 {mealCategories.mainDish}</span>
                                                        <span className="font-semibold text-brand-brown-dark">{day.meals.mainDish || '-'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                        <span className="text-gray-600">🍚 {mealCategories.rice}</span>
                                                        <span className="font-medium text-gray-800">{day.meals.rice || '-'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                        <span className="text-gray-600">🥗 {mealCategories.salad}</span>
                                                        <span className="font-medium text-gray-800">{day.meals.salad || '-'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                        <span className="text-gray-600">🍰 {mealCategories.dessert}</span>
                                                        <span className={`font-medium ${day.meals.dessert ? 'text-brand-orange' : 'text-gray-400'}`}>
                                                            {day.meals.dessert || '-'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-2">
                                                        <span className="text-gray-600">🥤 {mealCategories.drink}</span>
                                                        <span className="font-medium text-gray-800">{day.meals.drink || '-'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Pricing Plans */}
            <section className="section bg-gradient-cream">
                <div className="container mx-auto">
                    <h2 className="section-title">Paketlerimiz</h2>
                    <p className="section-subtitle">
                        İhtiyacınıza uygun paketi seçin, avantajlardan yararlanın
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {monthlyPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`bg-white rounded-3xl p-8 relative ${plan.popular
                                    ? 'ring-2 ring-brand-teal shadow-teal-lg scale-105'
                                    : 'shadow-soft'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="bg-brand-teal text-white text-sm font-medium px-4 py-1 rounded-full">
                                            En Popüler
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="font-serif text-2xl font-bold text-brand-brown-dark mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="text-center mb-6">
                                    <div className="text-4xl font-bold text-brand-teal">
                                        ₺{plan.pricePerDay}
                                    </div>
                                    <div className="text-gray-500 text-sm">/ günlük (kişi başı)</div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-600">
                                            <svg className="w-5 h-5 text-brand-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {plan.note && (
                                    <p className="text-sm text-gray-500 italic mb-4 text-center">
                                        * {plan.note}
                                    </p>
                                )}

                                <Link
                                    href="/basvuru"
                                    className={`block text-center py-3 rounded-full font-medium transition-all duration-300 ${plan.popular
                                        ? 'btn-primary w-full'
                                        : 'btn-secondary w-full'
                                        }`}
                                >
                                    Başvur
                                </Link>
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
