'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Simple password protection (in production, use proper auth)
const ADMIN_PASSWORD = 'tencereden2026';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if already authenticated
        const auth = sessionStorage.getItem('tencereden_admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('tencereden_admin_auth', 'true');
            setError('');
        } else {
            setError('Yanlış şifre');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('tencereden_admin_auth');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-soft-lg p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-brand-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="font-serif text-2xl font-bold text-brand-brown-dark">
                            Yönetim Paneli
                        </h1>
                        <p className="text-gray-500 mt-2">Giriş yapmak için şifrenizi girin</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Şifre"
                                className="form-input text-center"
                                autoFocus
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                        <button type="submit" className="btn-primary w-full">
                            Giriş Yap
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-brand-teal hover:underline text-sm">
                            ← Siteye Dön
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const adminSections = [
        {
            title: 'Menü Yönetimi',
            description: 'Haftalık menü ve fiyatları düzenle',
            href: '/admin/menu',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            color: 'bg-blue-500',
        },
        {
            title: 'Galeri',
            description: 'Yemek fotoğraflarını yönet',
            href: '/admin/gallery',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: 'bg-purple-500',
        },
        {
            title: 'İçerik',
            description: 'Site metinlerini düzenle',
            href: '/admin/content',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            color: 'bg-green-500',
        },
        {
            title: 'Başvurular',
            description: 'Gelen başvuruları görüntüle',
            href: '/admin/applications',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: 'bg-orange-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-soft">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="font-serif text-xl font-bold text-brand-brown-dark">
                                    Tencereden Admin
                                </h1>
                                <p className="text-sm text-gray-500">Yönetim Paneli</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-gray-500 hover:text-brand-teal transition-colors"
                                target="_blank"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome */}
                <div className="bg-gradient-teal rounded-2xl p-8 text-white mb-8">
                    <h2 className="font-serif text-2xl font-bold mb-2">Hoş Geldiniz! 👋</h2>
                    <p className="text-white/80">
                        Buradan sitenizin içeriklerini yönetebilirsiniz. Değişiklikler kaydedildikten sonra sitede otomatik olarak güncellenecektir.
                    </p>
                </div>

                {/* Admin Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {adminSections.map((section) => (
                        <Link
                            key={section.title}
                            href={section.href}
                            className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 ${section.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                                {section.icon}
                            </div>
                            <h3 className="font-semibold text-brand-brown-dark mb-1">
                                {section.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {section.description}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-soft">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Haftalık Menü</p>
                                <p className="text-2xl font-bold text-brand-brown-dark">5 Gün</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-soft">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Galeri Fotoğrafı</p>
                                <p className="text-2xl font-bold text-brand-brown-dark">8 Adet</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-soft">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Aylık Paket</p>
                                <p className="text-2xl font-bold text-brand-brown-dark">3 Paket</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-white rounded-2xl p-6 shadow-soft">
                    <h3 className="font-serif text-lg font-semibold text-brand-brown-dark mb-4">
                        📘 Kullanım Kılavuzu
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                        <div>
                            <h4 className="font-medium text-brand-brown-dark mb-2">Menü Yönetimi</h4>
                            <p>Haftalık menünüzü ve aylık paket fiyatlarını buradan düzenleyebilirsiniz. Değişiklikler anında siteye yansıyacaktır.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-brand-brown-dark mb-2">Galeri</h4>
                            <p>Yemek fotoğraflarınızı ekleyin, silin veya düzenleyin. Yüksek kaliteli fotoğraflar kullanmanızı öneririz.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-brand-brown-dark mb-2">İçerik</h4>
                            <p>Site üzerindeki başlıkları, açıklamaları ve iletişim bilgilerini güncelleyebilirsiniz.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-brand-brown-dark mb-2">Başvurular</h4>
                            <p>Gelen başvuruları görüntüleyin, durumlarını takip edin ve müşterilerinizle iletişime geçin.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
