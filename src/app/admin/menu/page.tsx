'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import menuData from '@/data/menu.json';

interface Meal {
    type: string;
    name: string;
    description: string;
}

interface DayMenu {
    day: string;
    date: string;
    meals: Meal[];
}

export default function AdminMenuPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [weeklyMenu, setWeeklyMenu] = useState<DayMenu[]>(menuData.weeklyMenu.days);
    const [editingDay, setEditingDay] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        const auth = sessionStorage.getItem('tencereden_admin_auth');
        setIsAuthenticated(auth === 'true');
    }, []);

    const handleMealChange = (dayIndex: number, mealIndex: number, field: keyof Meal, value: string) => {
        setWeeklyMenu(prev => {
            const updated = [...prev];
            updated[dayIndex] = {
                ...updated[dayIndex],
                meals: updated[dayIndex].meals.map((meal, i) =>
                    i === mealIndex ? { ...meal, [field]: value } : meal
                ),
            };
            return updated;
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // In production, this would save to a database or file
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSaveMessage('Menü başarıyla güncellendi!');
            setEditingDay(null);
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
                <div className="space-y-6">
                    {weeklyMenu.map((day, dayIndex) => (
                        <div key={day.day} className="bg-white rounded-2xl shadow-soft overflow-hidden">
                            <div
                                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setEditingDay(editingDay === dayIndex ? null : dayIndex)}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="day-badge">{day.day}</span>
                                    <span className="text-gray-500 text-sm">
                                        {day.meals.map(m => m.name).join(', ')}
                                    </span>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform ${editingDay === dayIndex ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {editingDay === dayIndex && (
                                <div className="border-t border-gray-100 p-6 space-y-6">
                                    {day.meals.map((meal, mealIndex) => (
                                        <div key={mealIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="form-label">Tür</label>
                                                <select
                                                    value={meal.type}
                                                    onChange={(e) => handleMealChange(dayIndex, mealIndex, 'type', e.target.value)}
                                                    className="form-input"
                                                >
                                                    <option value="Ana Yemek">Ana Yemek</option>
                                                    <option value="Pilav">Pilav</option>
                                                    <option value="Çorba">Çorba</option>
                                                    <option value="Salata">Salata</option>
                                                    <option value="Tatlı">Tatlı</option>
                                                    <option value="Yan Ürün">Yan Ürün</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="form-label">İsim</label>
                                                <input
                                                    type="text"
                                                    value={meal.name}
                                                    onChange={(e) => handleMealChange(dayIndex, mealIndex, 'name', e.target.value)}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div>
                                                <label className="form-label">Açıklama</label>
                                                <input
                                                    type="text"
                                                    value={meal.description}
                                                    onChange={(e) => handleMealChange(dayIndex, mealIndex, 'description', e.target.value)}
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => {
                                            setWeeklyMenu(prev => {
                                                const updated = [...prev];
                                                updated[dayIndex] = {
                                                    ...updated[dayIndex],
                                                    meals: [...updated[dayIndex].meals, { type: 'Ana Yemek', name: '', description: '' }],
                                                };
                                                return updated;
                                            });
                                        }}
                                        className="text-brand-teal hover:text-brand-teal-dark font-medium text-sm flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Yemek Ekle
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Pricing Section */}
                <div className="mt-12">
                    <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6">
                        Aylık Paket Fiyatları
                    </h2>
                    <div className="bg-white rounded-2xl shadow-soft p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                        <div>
                                            <label className="form-label">Aylık Fiyat (₺)</label>
                                            <input
                                                type="number"
                                                defaultValue={plan.pricePerMonth}
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
