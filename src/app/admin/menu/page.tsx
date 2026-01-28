'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import menuData from '@/data/menu.json';

// Interfaces matching new structure
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

interface Plan {
    id: number;
    name: string;
    description: string;
    pricePerDay: number;
    features: string[];
    popular: boolean;
    note?: string;
}

export default function AdminMenuPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Cast to unknown first to avoid type overlap issues during migration
    const initialData = menuData as unknown as { months: Month[], monthlyPlans: Plan[] };

    // Manage state for the first month for simplicity in this version
    const [weeks, setWeeks] = useState<Week[]>(initialData.months?.[0]?.weeks || []);
    const [plans, setPlans] = useState<Plan[]>(initialData.monthlyPlans || []);
    const [editingWeek, setEditingWeek] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        const auth = sessionStorage.getItem('tencereden_admin_auth');
        setIsAuthenticated(auth === 'true');
    }, []);

    const handleMealChange = (weekIndex: number, dayIndex: number, field: keyof DayMenu, value: string) => {
        if (field === 'date' || field === 'day') return; // Don't edit date/day names here

        setWeeks(prev => {
            const updated = [...prev];
            updated[weekIndex] = {
                ...updated[weekIndex],
                days: updated[weekIndex].days.map((day, i) =>
                    i === dayIndex ? { ...day, [field]: value } : day
                ),
            };
            return updated;
        });
    };

    const handlePlanChange = (planId: number, field: keyof Plan, value: string | number) => {
        setPlans(prev => prev.map(plan =>
            plan.id === planId ? { ...plan, [field]: value } : plan
        ));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // In a real app, this would be an API call to save to backend
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Saved data:', { weeks, plans });
            setSaveMessage('Menü başarıyla güncellendi! (Demo: Veriler konsola yazıldı)');
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
                    <div className="flex items-center justify-center sm:justify-between">
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
                            className="btn-primary flex items-center gap-2 ml-auto sm:ml-0"
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
                    {weeks.length === 0 ? (
                        <div className="text-center py-10">Veri bulunamadı.</div>
                    ) : weeks.map((week, weekIndex) => (
                        <div key={week.week} className="bg-white rounded-2xl shadow-soft overflow-hidden">
                            <div
                                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setEditingWeek(editingWeek === weekIndex ? null : weekIndex)}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="day-badge">{week.week}. Hafta</span>
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
                                        <div key={dayIndex} className="border rounded-xl p-4">
                                            <h3 className="font-semibold text-brand-brown-dark mb-4">{day.day} - {day.date}</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="form-label">🍲 Çorba</label>
                                                    <input
                                                        type="text"
                                                        value={day.soup || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'soup', e.target.value)}
                                                        className="form-input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-label">🍖 Ana Yemek 1</label>
                                                    <input
                                                        type="text"
                                                        value={day.mainDish || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'mainDish', e.target.value)}
                                                        className="form-input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-label">🍗 Ana Yemek 2</label>
                                                    <input
                                                        type="text"
                                                        value={day.secondDish || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'secondDish', e.target.value)}
                                                        className="form-input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-label">🍚 Y. Yemek</label>
                                                    <input
                                                        type="text"
                                                        value={day.side || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'side', e.target.value)}
                                                        className="form-input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-label">🥗 Ekstra</label>
                                                    <input
                                                        type="text"
                                                        value={day.extra || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'extra', e.target.value)}
                                                        className="form-input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="form-label">🥤 Kalori/İçecek</label>
                                                    <input
                                                        type="text"
                                                        value={day.calories || ''}
                                                        onChange={(e) => handleMealChange(weekIndex, dayIndex, 'calories', e.target.value)}
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
                            {plans.map((plan) => (
                                <div key={plan.id} className="p-4 border rounded-xl">
                                    <h3 className="font-semibold text-brand-brown-dark mb-2">{plan.name}</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="form-label">Günlük Fiyat (₺)</label>
                                            <input
                                                type="number"
                                                value={plan.pricePerDay}
                                                onChange={(e) => handlePlanChange(plan.id, 'pricePerDay', Number(e.target.value))}
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
