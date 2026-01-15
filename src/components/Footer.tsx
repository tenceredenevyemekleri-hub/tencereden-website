import Link from 'next/link';
import content from '@/data/content.json';

const quickLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Menü', href: '/menu' },
    { name: 'Hizmetler', href: '/hizmetler' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Başvuru', href: '/basvuru' },
];

export default function Footer() {
    const { siteInfo } = content;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-brown-dark text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <path
                                        d="M10 70 L15 60 L20 65 L25 55 L30 60 L35 50 L40 55 L45 45 L50 50 L55 40 L60 45 L65 55 L70 50 L75 60 L80 55 L85 65 L90 70"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <ellipse cx="50" cy="75" rx="25" ry="8" fill="white" />
                                    <path d="M25 75 Q25 90 50 90 Q75 90 75 75" fill="white" />
                                    <path
                                        d="M40 65 Q38 60 40 55"
                                        fill="none"
                                        stroke="#2A9D8F"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M50 63 Q48 58 50 53"
                                        fill="none"
                                        stroke="#2A9D8F"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M60 65 Q58 60 60 55"
                                        fill="none"
                                        stroke="#2A9D8F"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-serif text-xl font-bold">Tencereden</h3>
                                <p className="text-brand-teal-light text-sm">Ev Yemekleri</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {siteInfo.description}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-4">Hızlı Linkler</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-brand-teal-light transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-4">İletişim</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-brand-teal-light mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-gray-300 text-sm">{siteInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg
                                    className="w-5 h-5 text-brand-teal-light flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <a
                                    href={`tel:${siteInfo.phone}`}
                                    className="text-gray-300 hover:text-brand-teal-light transition-colors text-sm"
                                >
                                    {siteInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg
                                    className="w-5 h-5 text-brand-teal-light flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <a
                                    href={`mailto:${siteInfo.email}`}
                                    className="text-gray-300 hover:text-brand-teal-light transition-colors text-sm"
                                >
                                    {siteInfo.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Working Hours */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-4">Çalışma Saatleri</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-300">{siteInfo.workingHours.days}</span>
                                <span className="text-brand-teal-light">{siteInfo.workingHours.hours}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-300">{siteInfo.workingHours.closed}</span>
                                <span className="text-red-400">Kapalı</span>
                            </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <a
                            href={`https://wa.me/${siteInfo.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp ile Ulaşın
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 md:px-8 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                        <p>© {currentYear} {siteInfo.name}. Tüm hakları saklıdır.</p>
                        <p>
                            <span className="text-brand-teal-light">♥</span> ile İstanbul&apos;da yapıldı
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
