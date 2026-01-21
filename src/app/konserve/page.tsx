'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function KonserveUrunleriPage() {
    const products = [
        {
            id: 1,
            name: 'Ev Yapımı Domates Salçası',
            description: 'Taze domateslerden, katkısız ve doğal yöntemlerle hazırlanan salça.',
            image: '/images/konserve/salca.jpg',
        },
        {
            id: 2,
            name: 'Biber Turşusu',
            description: 'Özenle seçilmiş biberlerle hazırlanan, geleneksel tarif turşu.',
            image: '/images/konserve/tursu.jpg',
        },
        {
            id: 3,
            name: 'Ev Yapımı Reçel Çeşitleri',
            description: 'Mevsim meyvelerinden, şeker oranı ayarlı ev yapımı reçeller.',
            image: '/images/konserve/recel.jpg',
        },
        {
            id: 4,
            name: 'Kurutulmuş Sebzeler',
            description: 'Doğal yöntemlerle kurutulmuş domates, biber ve patlıcan.',
            image: '/images/konserve/kurutulmus.jpg',
        },
        {
            id: 5,
            name: 'Ev Yapımı Sos Çeşitleri',
            description: 'Acı sos, fesleğenli sos ve özel karışım soslar.',
            image: '/images/konserve/sos.jpg',
        },
        {
            id: 6,
            name: 'Zeytin Çeşitleri',
            description: 'Ege bölgesinden özenle seçilmiş, ev usulü hazırlanmış zeytinler.',
            image: '/images/konserve/zeytin.jpg',
        },
    ];

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-cream">
                <div className="container mx-auto text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-brown-dark mb-4">
                        Özel Yapım Konserve Ürünleri
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Katkısız, doğal ve geleneksel yöntemlerle hazırlanan ev yapımı konserve ürünleri.
                        Tarladan sofranıza, lezzet garantili.
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="section bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

            {/* Features */}
            <section className="section bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="font-serif text-3xl font-bold text-brand-brown-dark text-center mb-12">
                        Neden Bizim Konservelerimiz?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-brand-brown-dark mb-2">%100 Doğal</h3>
                            <p className="text-gray-600 text-sm">Hiçbir katkı maddesi kullanılmaz</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-brand-brown-dark mb-2">Taze Malzeme</h3>
                            <p className="text-gray-600 text-sm">Mevsiminde toplanan taze ürünler</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-brand-brown-dark mb-2">El Yapımı</h3>
                            <p className="text-gray-600 text-sm">Geleneksel yöntemlerle özenle hazırlanır</p>
                        </div>
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
                        Konserve ürünlerimiz için bizimle iletişime geçin. Toplu siparişlerde özel fiyatlar sunuyoruz.
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
