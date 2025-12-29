import { useEffect, useRef, useState } from "react";
import who from "../assets/who/who.png";
import who2 from "../assets/who/who2.png";
import who3 from "../assets/who/who3.png";
import who4 from "../assets/who/who4.png";
const Who = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const slides = [
    {
      title: "Biz Kimiz, Neyiz, Amacımız Ne?",
      description1:
        // Önceki önerilerimden güçlendirilmiş metin:
        "Merhaba ben Bilgisayar Mühendisliği öğrencisi Fatih size bu kulüb okulda neden var biz kimiz onu açıklayacağım",
      image: who,
    },
    {
      title: "DÜŞÜN. KODLA. HAYATA GEÇİR",
      description1:
        "Yandaki foto 3 yıl önceki ben diyebilirim o kadar çok teknik detay var ki projeye başlamak bir ölüm ve bana karmaşık geliyordu nerden başlayacağımı bilmiyordum kulüpte bu sorunu önceden yaşamış arkadaşımla bir araya gelerek bu kulübü kurduk amacımız çok basit ",
      description2:
        "DÜŞÜN. KODLA. HAYATA GEÇİR.",
      image:who2,
    },
    {
      title: "Etkinliklerimiz ve Aktivitelerimiz",
      description1:
        "Düzenli olarak workshop'lar, hackathon'lar ve teknoloji sohbetleri düzenliyoruz. Bu etkinlikler sayesinde üyelerimiz hem yeni şeyler öğreniyor hem de birbirleriyle bağ kuruyor.",
      description2:
        "Sosyal etkinlikler ve oyun geceleriyle birlikte eğlenmeyi de ihmal etmiyoruz. Çünkü biz sadece kod yazmaktan ibaret olmayan bir topluluk oluşturmayı hedefliyoruz.",
      features: [
        {
          title: "Haftalık Workshop'lar",
          description: "Her hafta farklı konularda teknik eğitim ve uygulama seansları",
        },
        {
          title: "Aylık Hackathon'lar",
          description: "24 saatlik kod maraton'larında takım halinde proje geliştirme",
        },
        {
          title: "Sosyal Aktiviteler",
          description: "Tanışma kahvesi, oyun geceleri ve şehir dışı geziler",
        },
      ],
      image: who3,
    },
    // Yeni eklenen slayt: Harekete Geçirme ve Üyeliğe Davet
    {
      title: "Senin İçin Ne Yapabiliriz?",
      description1:
        "Öğrenmeye ve üretmeye hazır mısın? Eğer aklında bir proje fikri varsa, becerilerini bir sonraki seviyeye taşımak istiyorsan veya sadece bu dinamik topluluğun bir parçası olmak istiyorsan, ilk adımı at.",
      description2:
        "Bize katılarak sadece bir kulüp üyesi olmazsın, aynı zamanda geleceğin teknoloji liderlerinden oluşan bir ekibin parçası olursun. Kodlamaya, öğrenmeye ve eğlenmeye hemen başla!",
      features: [
        {
          title: "Bize Katıl",
          description: "Online formumuzu doldur ve topluluğumuza resmi olarak katıl.",
        },
        {
          title: "Proje Fikrini Paylaş",
          description: "Aklındaki projeyi bize anlat, ekibini kuralım ve hemen başlayalım.",
        },
        {
          title: "Takipte Kal",
          description: "Sosyal medya hesaplarımızdan etkinlik duyurularımızı kaçırma!",
        },
      ],
      // Bu slayt için dinamik ve enerjik bir görsel kullanabilirsiniz.
      image:who4,
    },
];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Scroll ile slide kontrolü
  useEffect(() => {
    if (!sectionRef.current || !isVisible) return;

    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Son slide'da aşağı scroll → Diğer componente geç
      if (currentSlide === slides.length - 1 && scrollingDown) {
        return; // Normal scroll devam etsin
      }

      // İlk slide'da yukarı scroll → Önceki componente dön
      if (currentSlide === 0 && scrollingUp) {
        return; // Normal scroll devam etsin
      }

      // Scroll engelleniyor mu kontrol et
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      // Küçük scroll hareketlerini yoksay
      if (Math.abs(e.deltaY) < 30) {
        return;
      }

      // Slide geçişi yapılacak - scroll'u engelle
      e.preventDefault();
      e.stopPropagation();
      
      isScrolling = true;
      clearTimeout(scrollTimeout);

      if (scrollingDown && currentSlide < slides.length - 1) {
        // Aşağı scroll - sonraki slide
        setCurrentSlide((prev) => prev + 1);
      } else if (scrollingUp && currentSlide > 0) {
        // Yukarı scroll - önceki slide
        setCurrentSlide((prev) => prev - 1);
      }

      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 800); // Animasyon süresi
    };

    const section = sectionRef.current;
    section.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      section.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [isVisible, currentSlide, slides.length]);

  return (
    <section
      id="who"
      ref={sectionRef}
      className="min-h-screen bg-white py-20 mb-20 flex items-center relative"
    >
      <div className="container mx-auto px-4">
        {/* Başlık - Dinamik (Slide'a göre değişiyor) */}
        <div
          key={`title-${currentSlide}`}
          className="text-center mb-16 animate-slideUpContent"
        >
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
            {slides[currentSlide].title}
          </h2>
        </div>

        {/* Progress Indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col items-center gap-4">
            {/* Yukarı Ok veya Bilgi */}
            {currentSlide > 0 ? (
              <div className="text-gray-400 animate-bounce">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
              </div>
            ) : (
              <div className="text-xs text-gray-400 text-center max-w-[80px] opacity-70">
                Yukarı kaydır
              </div>
            )}
            
            {/* Progress Dots */}
            <div className="flex flex-col gap-3">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border-3 border-black transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-[#fbca1f] scale-150 shadow-lg"
                      : index < currentSlide
                      ? "bg-gray-400"
                      : "bg-white"
                  }`}
                  title={`Slide ${index + 1}/${slides.length}`}
                />
              ))}
            </div>

            {/* Aşağı Ok veya Bilgi */}
            {currentSlide < slides.length - 1 ? (
              <div className="text-gray-400 animate-bounce">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            ) : (
              <div className="text-xs text-gray-400 text-center max-w-[80px] opacity-70">
                Aşağı kaydır
              </div>
            )}
          </div>
        </div>

        {/* İçerik - Carousel */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Sol Taraf - Görsel */}
          <div
            key={`image-${currentSlide}`}
            className="order-1 lg:order-1 animate-slideUpImage"
          >
            <div className="relative border-8 border-black rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-[500px] object-cover object-center"
              />
            </div>
          </div>

          {/* Sağ Taraf - Yazı */}
          <div
            key={`content-${currentSlide}`}
            className="space-y-6 order-2 lg:order-2 animate-slideUpContent"
          >
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                {slides[currentSlide].description1}
              </p>
              {slides[currentSlide].description2 && (
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                  {slides[currentSlide].description2}
                </p>
              )}
            </div>

            {/* Özellikler - Opsiyonel */}
            {slides[currentSlide].features && (
              <div className="space-y-4 mt-8">
                {slides[currentSlide].features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                    style={{
                      animation: `slideUpFeature 0.8s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#fbca1f] border-3 border-black flex items-center justify-center shrink-0 mt-1">
                      <span className="font-black text-base">✓</span>
                    </div>
                    <div>
                      <h4 className="font-black text-2xl text-gray-900">
                        {feature.title}
                      </h4>
                      <p className="text-gray-700 text-lg">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Who;

