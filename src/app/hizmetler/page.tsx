import { Metadata } from 'next';
import Link from 'next/link';
import content from '@/data/content.json';

export const metadata: Metadata = {
    title: 'Hizmetlerimiz | Tencereden Ev Yemekleri',
    description: 'Kurumsal catering, günlük yemek servisi, aylık abonelik ve özel etkinlik catering hizmetlerimiz.',
};

const ServiceIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'daily':
            return (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case 'monthly':
            return (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            );
        case 'event':
            return (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
            );
        default:
            return null;
    }
};

export default function HizmetlerPage() {
    const { services } = content;
    const iconTypes = ['daily', 'monthly', 'event'];

    const processSteps = [
        {
            step: 1,
            title: 'Başvuru',
            description: 'Online formumuz veya WhatsApp üzerinden iletişime geçin.',
        },
        {
            step: 2,
            title: 'Görüşme',
            description: 'İhtiyaçlarınızı anlayalım ve size özel bir teklif hazırlayalım.',
        },
        {
            step: 3,
            title: 'Deneme',
            description: 'İlk haftanızı deneme süreci olarak başlayın.',
        },
        {
            step: 4,
            title: 'Hizmet',
            description: 'Her gün sıcak ve lezzetli yemekleriniz kapınızda.',
        },
    ];

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-cream">
                <div className="container mx-auto text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-brown-dark mb-4">
                        Hizmetlerimiz
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Ofisinize uygun yemek çözümleri sunuyoruz. Her bütçeye ve ihtiyaca uygun paketlerimizi keşfedin.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="bg-gradient-cream rounded-3xl p-8 hover:shadow-soft-lg transition-all duration-300 group"
                            >
                                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 text-brand-teal group-hover:scale-110 transition-transform shadow-soft">
                                    <ServiceIcon type={iconTypes[index]} />
                                </div>

                                <h3 className="font-serif text-2xl font-bold text-brand-brown-dark mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {service.description}
                                </p>

                                <ul className="space-y-3 mb-8">
                                    {service.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-center gap-3 text-gray-700">
                                            <svg className="w-5 h-5 text-brand-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/basvuru" className="btn-primary w-full text-center">
                                    Teklif Alın
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="section-title">Nasıl Çalışır?</h2>
                    <p className="section-subtitle">
                        4 basit adımda ofisinize yemek servisi başlasın
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <div key={step.step} className="text-center relative">
                                {/* Connector line */}
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-brand-teal/20" />
                                )}

                                <div className="relative z-10 w-16 h-16 bg-brand-teal text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    {step.step}
                                </div>
                                <h4 className="font-serif text-xl font-semibold text-brand-brown-dark mb-2">
                                    {step.title}
                                </h4>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-brown-dark mb-6">
                                Neden Kurumsal Yemek Servisi?
                            </h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: 'Çalışan Memnuniyeti',
                                        desc: 'Sağlıklı ve lezzetli öğle yemekleri, çalışan motivasyonunu artırır.',
                                    },
                                    {
                                        title: 'Zaman Tasarrufu',
                                        desc: 'Yemek için dışarı çıkma ihtiyacı ortadan kalkar, verimlilik artar.',
                                    },
                                    {
                                        title: 'Maliyet Avantajı',
                                        desc: 'Bireysel yemek harcamalarına kıyasla %30\'a varan tasarruf.',
                                    },
                                    {
                                        title: 'Ekip Ruhu',
                                        desc: 'Birlikte yemek yemek, ekip içi iletişimi güçlendirir.',
                                    },
                                ].map((benefit, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-brand-brown-dark mb-1">{benefit.title}</h4>
                                            <p className="text-gray-600">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-cream rounded-3xl p-8 md:p-12">
                            <h3 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6 text-center">
                                Ücretsiz Teklif Alın
                            </h3>
                            <div className="space-y-4 text-center">
                                <p className="text-gray-600">
                                    Size özel fiyatlandırma için hemen iletişime geçin.
                                </p>
                                <div className="flex flex-col gap-3">
                                    <Link href="/basvuru" className="btn-primary">
                                        Online Başvuru Formu
                                    </Link>
                                    <a
                                        href={`https://wa.me/${content.siteInfo.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        WhatsApp ile Ulaşın
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section bg-gradient-cream">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="section-title">Sıkça Sorulan Sorular</h2>

                    <div className="space-y-4 mt-12">
                        {[
                            {
                                q: 'Minimum sipariş sayısı nedir?',
                                a: 'Minimum 5 kişilik sipariş kabul ediyoruz. Daha az kişi için alternatif çözümler sunabiliriz.',
                            },
                            {
                                q: 'Teslimat saatleri nedir?',
                                a: 'Yemeklerimiz 11:30 - 13:00 arası teslimat yapılmaktadır. Özel saat talepleri için bize ulaşın.',
                            },
                            {
                                q: 'Özel diyet seçenekleri var mı?',
                                a: 'Evet, vejetaryen, vegan, glütensiz ve düşük kalorili seçeneklerimiz mevcuttur.',
                            },
                            {
                                q: 'Deneme yapabilir miyiz?',
                                a: 'Elbette! İlk haftanız deneme süreci olarak geçer ve memnun kalmazsanız herhangi bir yükümlülük olmadan iptal edebilirsiniz.',
                            },
                            {
                                q: 'Ödeme nasıl yapılır?',
                                a: 'Aylık fatura kesilir ve banka havalesi veya kredi kartı ile ödeme yapabilirsiniz.',
                            },
                        ].map((faq, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-soft">
                                <h4 className="font-semibold text-brand-brown-dark mb-2">{faq.q}</h4>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
