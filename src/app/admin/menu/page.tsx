'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import menuData from '@/data/menu.json';

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

export default function AdminMenuPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [weeks, setWeeks] = useState<Week[]>(menuData.weeklyMenu.weeks as Week[]);
    const [editingWeek, setEditingWeek] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        const auth = sessionStorage.getItem('tencereden_admin_auth');
        setIsAuthenticated(auth === 'true');
    }, []);

    const handleMealChange = (weekIndex: number, dayIndex: number, field: keyof DayMeals, value: string) => {
        setWeeks(prev => {
            const updated = [...prev];
            updated[weekIndex] = {
                ...updated[weekIndex],
                days: updated[weekIndex].days.map((day, i) =>
                    i === dayIndex ? { ...day, meals: { ...day.meals, [field]: value || null } } : day
                ),
            };
            return updated;
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSaveMessage('Menü başarıyla güncellendi!');
            setTimeout(() => setSaveMessage(''), 3000);
        } catch {
            setSaveMessage('Bir hata oluştu.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">Lütfen önce giriş yapın</p>
                    <Link href="/admin" className="btn-primary">
                        Giriş Sayfasına Git
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-soft sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="text-gray-500 hover:text-brand-teal">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </Link>
                            <h1 className="font-serif text-xl font-bold text-brand-brown-dark">
                                Menü Yönetimi
                            </h1>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="btn-primary flex items-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <div className="spinner w-4 h-4 border-2" />
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Kaydet
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Save Message */}
            {saveMessage && (
                <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    {saveMessage}
                </div>
            )}

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {weeks.map((week, weekIndex) => (
                        <div key={week.weekNumber} className="bg-white rounded-2xl shadow-soft overflow-hidden">
                            <div
                                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setEditingWeek(editingWeek === weekIndex ? null : weekIndex)}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="day-badge">{week.weekNumber}. Hafta</span>
                                    <span className="text-gray-500 text-sm">
                                        {week.weekStart} - {week.weekEnd}
                                    </span>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform ${editingWeek === weekIndex ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {editingWeek === weekIndex && (
                                <div className="border-t border-gray-100 p-6 space-y-6">
                                    {week.days.map((day, dayIndex) => (
                                        <div key={day.day} className="border rounded-xl p-4">
                                            <h3 className="font-semibold text-brand-brown-dark mb-4">{day.day} - {day.date}</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="form-label">🍲 Çorba</label>
                                                    <input
                                                        type="text"
                                                        value={day.meals.soup || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'soup', e.target.value)}
                                                        className="form-input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-label">🍖 Ana Yemek</label>
                                                    <input
                                                        type="text"
                                                        value={day.meals.mainDish || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'mainDish', e.target.value)}
                                                        className="form-input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-label">🍚 Pilav/Makarna</label>
                                                    <input
                                                        type="text"
                                                        value={day.meals.rice || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'rice', e.target.value)}
                                                        className="form-input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-label">🥗 Salata</label>
                                                    <input
                                                        type="text"
                                                        value={day.meals.salad || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'salad', e.target.value)}
                                                        className="form-input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-label">🍰 Tatlı</label>
                                                    <input
                                                        type="text"
                                                        value={day.meals.dessert || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'dessert', e.target.value)}
                                                        className="form-input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-label">🥤 İçecek</label>
                                                    <input
                                                        type="text"
                                                        value={day.meals.drink || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'drink', e.target.value)}
                                                        className="form-input"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Pricing Section */}
                <div className="mt-12">
                    <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6">
                        Paket Fiyatları
                    </h2>
                    <div className="bg-white rounded-2xl shadow-soft p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {menuData.monthlyPlans.map((plan) => (
                                <div key={plan.id} className="p-4 border rounded-xl">
                                    <h3 className="font-semibold text-brand-brown-dark mb-2">{plan.name}</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="form-label">Günlük Fiyat (₺)</label>
                                            <input
                                                type="number"
                                                defaultValue={plan.pricePerDay}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
