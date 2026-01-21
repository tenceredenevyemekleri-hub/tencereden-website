'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function IkiLokmaPage() {
    const products = [
        {
            id: 1,
            name: 'Ev Yapımı Mantı',
            description: 'Geleneksel tarifle hazırlanan, el açması mantı. Yoğurt ve sos eşliğinde servis edilir.',
            image: '/images/food/manti.jpg',
        },
        {
            id: 2,
            name: 'Kıymalı Börek',
            description: 'Taze yufka ile hazırlanan, özel baharatlı kıymalı börek.',
            image: '/images/food/borek.jpg',
        },
        {
            id: 3,
            name: 'Patatesli Gözleme',
            description: 'Köy usulü, saç üzerinde pişirilen patatesli gözleme.',
            image: '/images/food/gozleme.jpg',
        },
        {
            id: 4,
            name: 'Peynirli Su Böreği',
            description: 'Katmer katmer, bol peynirli ev yapımı su böreği.',
            image: '/images/food/su-boregi.jpg',
        },
    ];

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-cream">
                <div className="container mx-auto text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-brown-dark mb-4">
                        2 Lokma Ürünleri
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        El emeği, göz nuru hazırlanan geleneksel lezzetler. Taze malzemelerle, anneannenizin mutfağından sofralarınıza.
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="section bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="card group">
                                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="font-serif text-xl font-semibold text-brand-brown-dark mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {product.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-gradient-cream">
                <div className="container mx-auto text-center">
                    <h2 className="font-serif text-3xl font-bold text-brand-brown-dark mb-4">
                        Sipariş Vermek İster Misiniz?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        2 Lokma ürünlerimiz için bizimle iletişime geçin. Toplu siparişlerde özel fiyatlar sunuyoruz.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/basvuru" className="btn-primary">
                            Sipariş Ver
                        </Link>
                        <a
                            href="https://wa.me/905551234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                        >
                            WhatsApp ile Ulaşın
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
