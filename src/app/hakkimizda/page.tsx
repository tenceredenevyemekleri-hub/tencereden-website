import { Metadata } from 'next';
import Link from 'next/link';
import content from '@/data/content.json';

export const metadata: Metadata = {
    title: 'Hakkımızda | Tencereden Ev Yemekleri',
    description: 'Tencereden Ev Yemekleri hikayesi, misyonumuz ve değerlerimiz. İstanbul\'da ofislere ev yemeği servisi.',
};

export default function HakkimizdaPage() {
    const { about, siteInfo } = content;

    const values = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            title: 'Sevgi ile Hazırlanır',
            description: 'Her yemeğimiz, annelerimizin mutfağından çıkmış gibi özenle hazırlanır.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'Güvenilir Hizmet',
            description: 'Dakikliğimiz ve kalitemizden asla ödün vermeyiz. Söz verdiğimizi yaparız.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Sürdürülebilirlik',
            description: 'Yerel üreticilerden tedarik, minimum atık ve çevre dostu ambalaj kullanıyoruz.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: 'Müşteri Odaklı',
            description: 'Her müşterimiz ailemizin bir parçasıdır. İhtiyaçlarınıza göre çözümler üretiriz.',
        },
    ];

    const timeline = [
        {
            year: '2024',
            title: 'Başlangıç',
            description: 'Kadıköy\'de küçük bir mutfakta, 3 ofise hizmet vererek yola çıktık.',
        },
        {
            year: '2024',
            title: 'Büyüme',
            description: 'Müşteri sayımız 10\'a, günlük porsiyonumuz 200\'e ulaştı.',
        },
        {
            year: '2025',
            title: 'Genişleme',
            description: 'Anadolu ve Avrupa yakasında teslimat ağımızı genişlettik.',
        },
        {
            year: '2026',
            title: 'Bugün',
            description: '500+ mutlu müşteri ve profesyonel bir ekiple hizmet veriyoruz.',
        },
    ];

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-cream">
                <div className="container mx-auto text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-brown-dark mb-4">
                        Hikayemiz
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Ev yemeğinin sıcaklığını, profesyonel hizmetin güvenilirliğiyle birleştiriyoruz.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="section bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-brown-dark mb-6">
                                {about.title}
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                {about.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-brown-dark">Aile işletmesi</p>
                                    <p className="text-gray-500 text-sm">2024&apos;den beri hizmetinizdeyiz</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {about.stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-cream rounded-2xl p-6 text-center hover:shadow-soft transition-shadow"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-brand-teal mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="section-title">Değerlerimiz</h2>
                    <p className="section-subtitle">
                        Her gün bu ilkelerle çalışıyoruz
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 text-center hover:shadow-soft transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-colors">
                                    {value.icon}
                                </div>
                                <h4 className="font-serif text-lg font-semibold text-brand-brown-dark mb-2">
                                    {value.title}
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section bg-white">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="section-title">Yolculuğumuz</h2>

                    <div className="mt-12 relative">
                        {/* Vertical line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-teal/20 -translate-x-1/2" />

                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <div
                                    key={index}
                                    className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Dot */}
                                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-brand-teal rounded-full -translate-x-1/2 ring-4 ring-white" />

                                    {/* Content */}
                                    <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                        <span className="inline-block bg-brand-teal text-white text-sm font-medium px-3 py-1 rounded-full mb-2">
                                            {item.year}
                                        </span>
                                        <h4 className="font-serif text-xl font-semibold text-brand-brown-dark mb-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className="hidden md:block flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="section bg-gradient-teal text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                        Bizimle Çalışmak İster misiniz?
                    </h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                        Ofisiniz için size özel bir teklif hazırlayalım.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/basvuru"
                            className="bg-white text-brand-teal hover:bg-gray-100 font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
                        >
                            Başvuru Formu
                        </Link>
                        <a
                            href={`https://wa.me/${siteInfo.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white text-white hover:bg-white hover:text-brand-teal font-medium px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
