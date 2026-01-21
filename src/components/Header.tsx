'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Menü', href: '/menu' },
    { name: '2 Lokma Ürünleri', href: '/iki-lokma' },
    { name: 'Doğal Kavanoz Yemekleri', href: '/konserve' },
    { name: 'Hizmetler', href: '/hizmetler' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Başvuru', href: '/basvuru' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-soft py-2 bg-white"
            >
                <div className="mx-auto px-2 md:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-24 h-24 md:w-32 md:h-32">
                                <Image
                                    src="/images/Logo/Adsız tasarım.png"
                                    alt="Tencereden Ev Yemekleri Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="nav-link text-brand-brown-dark"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <div className="hidden md:block">
                            <Link
                                href="/basvuru"
                                className="btn-primary text-sm"
                            >
                                Hemen Başvurun
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg transition-colors text-brand-brown-dark"
                            aria-label="Menüyü aç"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                className={`mobile-menu ${isMobileMenuOpen ? 'open' : 'closed'}`}
            >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="relative w-16 h-16">
                            <Image
                                src="/images/Logo/Adsız tasarım.png"
                                alt="Tencereden"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                        aria-label="Menüyü kapat"
                    >
                        <svg className="w-6 h-6 text-brand-brown-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Content */}
                <div className="flex flex-col h-full px-4 py-6">
                    <nav className="flex flex-col gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="py-4 px-4 text-lg font-medium text-brand-brown-dark hover:text-brand-teal hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <Link
                        href="/basvuru"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="btn-primary text-center mt-6"
                    >
                        Hemen Başvurun
                    </Link>
                </div>
            </div>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
