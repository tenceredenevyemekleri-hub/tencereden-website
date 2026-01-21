'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function IkiLokmaPage() {
    const products = [
        {
            id: 1,
            name: 'Barbeku Soslu Tavuk Makarna',
            description: 'Lezzetli barbeku sosu ile hazırlanan tavuklu makarna.',
            image: '/images/iki-lokma/BarbeküSosluTavukMakarna.png',
        },
        {
            id: 2,
            name: 'Izgara Tavuk Pilav',
            description: 'Izgara tavuk ile servis edilen tereyağlı pilav.',
            image: '/images/iki-lokma/IzgaraTavukPilav.png',
        },
        {
            id: 3,
            name: 'Köri Soslu Tavuk Penne',
            description: 'Özel köri sosu ile hazırlanan tavuklu penne makarna.',
            image: '/images/iki-lokma/KöriSosluTavukPenne.png',
        },
        {
            id: 4,
            name: 'Meksika Soslu Tavuk Makarna',
            description: 'Baharatlı Meksika sosu ile hazırlanan tavuklu makarna.',
            image: '/images/iki-lokma/MeksikaSosluTavukMakarna.png',
        },
        {
            id: 5,
            name: 'Tavuk Sote Pilav',
            description: 'Sebzeli tavuk sote ile tereyağlı pilav.',
            image: '/images/iki-lokma/TavukSotePilav.png',
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="card group">
                                <div className="relative h-72 mb-4 rounded-lg overflow-hidden bg-white border border-gray-100">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                                    />
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
