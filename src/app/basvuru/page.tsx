'use client';

import { useState } from 'react';
import content from '@/data/content.json';
import menuData from '@/data/menu.json';

interface FormData {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    employeeCount: string;
    address: string;
    selectedPlan: string;
    dietaryNeeds: string;
    message: string;
}

export default function BasvuruPage() {
    const { siteInfo } = content;
    const { monthlyPlans } = menuData;

    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        employeeCount: '',
        address: '',
        selectedPlan: '',
        dietaryNeeds: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Send form data to Formspree
            const response = await fetch('https://formspree.io/f/xkooogra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Yeni Başvuru: ${formData.companyName}`,
                    _replyto: formData.email,
                    'Şirket Adı': formData.companyName,
                    'Yetkili Kişi': formData.contactName,
                    'E-posta': formData.email,
                    'Telefon': formData.phone,
                    'Kişi Sayısı': formData.employeeCount,
                    'Adres': formData.address,
                    'Seçilen Paket': formData.selectedPlan || 'Belirtilmedi',
                    'Diyet İhtiyaçları': formData.dietaryNeeds || 'Yok',
                    'Mesaj': formData.message || 'Yok'
                })
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                throw new Error('Form submission failed');
            }
        } catch {
            setError('Bir hata oluştu. Lütfen tekrar deneyin veya WhatsApp üzerinden ulaşın.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateWhatsAppMessage = () => {
        const message = `Merhaba, Tencereden Ev Yemekleri hizmeti hakkında bilgi almak istiyorum.

Şirket: ${formData.companyName || 'Belirtilmedi'}
Kişi Sayısı: ${formData.employeeCount || 'Belirtilmedi'}
İlgilendiği Paket: ${formData.selectedPlan || 'Belirtilmedi'}
${formData.message ? `\nMesaj: ${formData.message}` : ''}`;

        return encodeURIComponent(message);
    };

    if (isSubmitted) {
        return (
            <>
                <section className="pt-32 pb-16 bg-gradient-cream min-h-screen flex items-center">
                    <div className="container mx-auto">
                        <div className="max-w-lg mx-auto text-center">
                            <div className="w-20 h-20 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown-dark mb-4">
                                Başvurunuz Alındı!
                            </h1>
                            <p className="text-gray-600 mb-8">
                                En kısa sürede sizinle iletişime geçeceğiz. Hemen görüşmek isterseniz WhatsApp üzerinden bize ulaşabilirsiniz.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href={`https://wa.me/${siteInfo.whatsapp}?text=${generateWhatsAppMessage()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp ile Görüşün
                                </a>
                                <button
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setFormData({
                                            companyName: '',
                                            contactName: '',
                                            email: '',
                                            phone: '',
                                            employeeCount: '',
                                            address: '',
                                            selectedPlan: '',
                                            dietaryNeeds: '',
                                            message: '',
                                        });
                                    }}
                                    className="btn-secondary"
                                >
                                    Yeni Başvuru
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-cream">
                <div className="container mx-auto text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-brown-dark mb-4">
                        Hizmet Başvurusu
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Formu doldurun, size özel bir teklif hazırlayalım. İlk haftanız %20 indirimli!
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className="section bg-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Honeypot field - hidden from users, helps prevent spam */}
                                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                                {/* Company Info */}
                                <div>
                                    <h3 className="font-serif text-xl font-semibold text-brand-brown-dark mb-4">
                                        Şirket Bilgileri
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="companyName" className="form-label">
                                                Şirket Adı *
                                            </label>
                                            <input
                                                type="text"
                                                id="companyName"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                required
                                                className="form-input"
                                                placeholder="Şirket adınız"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="employeeCount" className="form-label">
                                                Kişi Sayısı *
                                            </label>
                                            <select
                                                id="employeeCount"
                                                name="employeeCount"
                                                value={formData.employeeCount}
                                                onChange={handleChange}
                                                required
                                                className="form-input"
                                            >
                                                <option value="">Seçiniz</option>
                                                <option value="5-10">5 - 10 kişi</option>
                                                <option value="11-25">11 - 25 kişi</option>
                                                <option value="26-50">26 - 50 kişi</option>
                                                <option value="51-100">51 - 100 kişi</option>
                                                <option value="100+">100+ kişi</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="address" className="form-label">
                                            Teslimat Adresi *
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                            placeholder="İlçe, mahalle veya açık adres"
                                        />
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div>
                                    <h3 className="font-serif text-xl font-semibold text-brand-brown-dark mb-4">
                                        İletişim Bilgileri
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="contactName" className="form-label">
                                                Ad Soyad *
                                            </label>
                                            <input
                                                type="text"
                                                id="contactName"
                                                name="contactName"
                                                value={formData.contactName}
                                                onChange={handleChange}
                                                required
                                                className="form-input"
                                                placeholder="Adınız ve soyadınız"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="form-label">
                                                Telefon *
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="form-input"
                                                placeholder="05XX XXX XX XX"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="email" className="form-label">
                                            E-posta *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                            placeholder="ornek@sirket.com"
                                        />
                                    </div>
                                </div>

                                {/* Preferences */}
                                <div>
                                    <h3 className="font-serif text-xl font-semibold text-brand-brown-dark mb-4">
                                        Tercihler
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="selectedPlan" className="form-label">
                                                İlgilendiğiniz Paket
                                            </label>
                                            <select
                                                id="selectedPlan"
                                                name="selectedPlan"
                                                value={formData.selectedPlan}
                                                onChange={handleChange}
                                                className="form-input"
                                            >
                                                <option value="">Seçiniz (Opsiyonel)</option>
                                                {monthlyPlans.map((plan) => (
                                                    <option key={plan.id} value={plan.name}>
                                                        {plan.name} - ₺{plan.pricePerDay}/gün
                                                    </option>
                                                ))}
                                                <option value="ozel">Özel Teklif İstiyorum</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="dietaryNeeds" className="form-label">
                                                Özel Diyet İhtiyaçları
                                            </label>
                                            <select
                                                id="dietaryNeeds"
                                                name="dietaryNeeds"
                                                value={formData.dietaryNeeds}
                                                onChange={handleChange}
                                                className="form-input"
                                            >
                                                <option value="">Seçiniz (Opsiyonel)</option>
                                                <option value="vejetaryen">Vejetaryen seçenek gerekli</option>
                                                <option value="vegan">Vegan seçenek gerekli</option>
                                                <option value="glutensiz">Glütensiz seçenek gerekli</option>
                                                <option value="diyet">Düşük kalorili seçenek gerekli</option>
                                                <option value="diger">Diğer (mesajda belirtin)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="message" className="form-label">
                                            Ek Mesaj
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            className="form-input resize-none"
                                            placeholder="Sormak istediğiniz sorular veya eklemek istediğiniz bilgiler..."
                                        />
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="message-error">
                                        {error}
                                    </div>
                                )}

                                {/* Submit */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary flex-1 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="spinner w-5 h-5 border-2" />
                                                Gönderiliyor...
                                            </>
                                        ) : (
                                            <>
                                                Başvuruyu Gönder
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-cream rounded-2xl p-6 sticky top-24">
                                <h4 className="font-serif text-lg font-semibold text-brand-brown-dark mb-4">
                                    Hızlı İletişim
                                </h4>
                                <p className="text-gray-600 text-sm mb-6">
                                    Formu doldurmak yerine direkt görüşmek isterseniz:
                                </p>

                                <a
                                    href={`https://wa.me/${siteInfo.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#20BD5A] transition-colors mb-4"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp ile Yazın
                                </a>

                                <a
                                    href={`tel:${siteInfo.phone}`}
                                    className="flex items-center gap-3 bg-brand-brown-dark text-white px-4 py-3 rounded-xl font-medium hover:bg-brand-brown transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Bizi Arayın
                                </a>

                                <hr className="my-6 border-brand-brown/10" />

                                <div className="text-sm text-gray-600">
                                    <p className="font-medium text-brand-brown-dark mb-2">Çalışma Saatleri</p>
                                    <p>{siteInfo.workingHours.days}</p>
                                    <p>{siteInfo.workingHours.hours}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
