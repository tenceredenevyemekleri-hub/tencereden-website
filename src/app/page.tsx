import Link from 'next/link';
import Image from 'next/image';
import content from '@/data/content.json';
import menuData from '@/data/menu.json';
import galleryData from '@/data/gallery.json';

// Icons as components
const ChefIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const iconComponents: { [key: string]: () => React.JSX.Element } = {
  chef: ChefIcon,
  heart: HeartIcon,
  truck: TruckIcon,
};

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Home() {
  const { hero, features, testimonials, about } = content;
  const { months } = menuData;

  // Get today's menu - flatten all days from all weeks in the current month
  // Assuming the first month is relevant or checking current date
  const currentMonth = months[0];
  const allDays = currentMonth.weeks.flatMap(week => week.days);

  // Format today as YYYY-MM-DD to match json
  const todayDate = new Date().toISOString().split('T')[0];

  // Find today's menu by exact date match first, fallback to day name if needed (but date is better)
  const todayMenu = allDays.find(d => d.date === todayDate);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Lezzetli Ev Yemekleri"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-fade-in drop-shadow-lg" style={{ color: '#F5E6D3' }}>
              {hero.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in drop-shadow-md" style={{ animationDelay: '0.2s', color: 'rgba(255, 255, 255, 0.9)' }}>
              {hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link href={hero.ctaLink} className="btn-primary text-lg px-8 py-4">
                {hero.ctaText}
              </Link>
              <Link href="/menu" className="btn-secondary border-[#FFFFFF] text-[#FFFFFF] hover:bg-white hover:text-brand-brown-dark text-lg px-8 py-4" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>
                Menüyü İncele
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white relative z-20">
        <div className="container mx-auto">
          <h2 className="section-title">Neden Tencereden?</h2>
          <p className="section-subtitle">
            Ev yemeğinin sıcaklığını ofisinize taşıyoruz
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = iconComponents[feature.icon] || ChefIcon;
              return (
                <div
                  key={feature.id}
                  className="card text-center group flex flex-col items-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mx-auto mb-6 relative w-32 h-32 group-hover:scale-110 transition-transform duration-300">
                    {/* @ts-ignore - feature.image is added at runtime via content.json */}
                    {feature.image ? (
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-md border-4 border-white">
                        <Image
                          /* @ts-ignore */
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="feature-icon mx-auto">
                        <IconComponent />
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-brand-brown-dark mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Today's Menu Preview */}
      <section className="section bg-gradient-cream">
        <div className="container mx-auto">
          <h2 className="section-title">Bugünün Menüsü</h2>
          <p className="section-subtitle">
            Her gün taze hazırlanan lezzetler
          </p>

          {todayMenu ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 text-center">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <span className="day-badge text-lg px-6 py-2">{todayMenu.day}</span>
                  <span className="text-gray-500">{new Date(todayMenu.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                  <div className="text-center w-full">
                    <span className="text-sm font-semibold text-brand-teal tracking-wider uppercase block mb-2">ÇORBA</span>
                    <h3 className="font-serif text-xl font-bold text-brand-brown-dark mb-2">{todayMenu.soup}</h3>
                  </div>
                  <div className="text-center w-full">
                    <span className="text-sm font-semibold text-brand-teal tracking-wider uppercase block mb-2">ANA YEMEK</span>
                    <h3 className="font-serif text-2xl font-bold text-brand-brown-dark mb-2">{todayMenu.mainDish}</h3>
                    {todayMenu.secondDish && <p className="text-sm text-gray-500">veya {todayMenu.secondDish}</p>}
                  </div>
                  <div className="text-center w-full">
                    <span className="text-sm font-semibold text-brand-teal tracking-wider uppercase block mb-2">YARDIMCI YEMEK</span>
                    <h3 className="font-serif text-xl font-bold text-brand-brown-dark mb-2">{todayMenu.side}</h3>
                  </div>
                </div>

                <div className="mt-16 text-center">
                  <Link href="/menu" className="btn-secondary group">
                    Haftalık Menüyü Görüntüle
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Bugün için menü bulunamadı veya hafta sonu.</p>
              <Link href="/menu" className="btn-primary">
                Aylık Menüyü İncele
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
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
              <div className="mt-12 text-center">
                <Link href="/hakkimizda" className="btn-primary">
                  Daha Fazla Bilgi →
                </Link>
              </div>
            </div>

            {/* Right Side - Images + Stats */}
            <div className="space-y-6">
              {/* Food Images Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/images/about/sehriyeli-pilav.png"
                    alt="Şehriyeli Pirinç Pilavı"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/images/about/bulgur-pilavi.png"
                    alt="Bulgur Pilavı"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/images/about/etli-kuru-fasulye.png"
                    alt="Etli Kuru Fasulye"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/images/about/pilic-baget.png"
                    alt="Piliç Baget"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {about.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gradient-cream rounded-2xl p-5 text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-brand-teal mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Gallery */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <h2 className="section-title">Lezzetlerimizden Kareler</h2>
          <p className="section-subtitle">
            Her gün taze malzemelerle hazırlanan yemeklerimiz
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryData.gallery.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-brand-teal-light font-medium uppercase">
                      {item.category}
                    </span>
                    <h4 className="text-white font-semibold mt-1">{item.alt}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <h2 className="section-title">Müşterilerimiz Ne Diyor?</h2>
          <p className="section-subtitle">
            Birlikte çalıştığımız şirketlerden geri bildirimler
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <p className="text-gray-600 italic mb-6">
                  {testimonial.content}
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-brand-brown-dark">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-teal text-white">
        <div className="container mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6" style={{ textAlign: 'center' }}>
            Ofisinize Lezzet Getirmeye Hazır mısınız?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mb-10" style={{ textAlign: 'center' }}>
            Hemen başvurun, size özel bir teklif hazırlayalım. İlk haftanız %20 indirimli!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/basvuru"
              className="bg-white text-brand-teal hover:bg-gray-100 font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ padding: '20px 48px', fontSize: '18px', whiteSpace: 'nowrap' }}
            >
              Hemen Başvurun
            </Link>
            <a
              href={`https://wa.me/${content.siteInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-brand-teal font-semibold rounded-full transition-all duration-300"
              style={{ padding: '20px 48px', fontSize: '18px', whiteSpace: 'nowrap' }}
            >
              WhatsApp ile Ulaşın
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
