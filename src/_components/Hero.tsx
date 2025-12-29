import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import hero1 from "../assets/hero/hero1.jpeg";
import hero2 from "../assets/hero/hero2.jpeg";
import hero3 from "../assets/hero/hero3.jpg";
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const slides = [
    {
      title: "Kulübümüze Hoşgeldiniz ",
      subtitle:
        "Beceri geliştirme, ortak projeler üretme ve ağınızı genişletme fırsatları burada! En güncel araçlarla kod becerilerinizi ilerletin, ekip olarak gerçek projeler geliştirin ve uzmanlarla tanışıp bağlantılar kurarak geleceğinize yatırım yapın. Öğrenin, üretin, eğlenin!",
      image: hero1,
    },
    {
      title: "Standtlarımız ",
      subtitle:
        "Yeni kurulan bir kulüp olmanın heyecanıyla, hem Hadımköy hem de Ayazağa kampüslerinde siz değerli arkadaşlarımızla bir araya geldik. Kulüp standlarımızda, yandaki tabloda duran ilk projelerimizi ve hedeflerimizi tanıtma fırsatı bulduk, heyecanımızı sizlerle paylaştık.",
      image: hero2,
    },
    {
      title: "Sağlıkta Yapay Zeka Devrimi",
      subtitle:
        "Sağlık hizmetlerinin geleceği yapay zeka ile yeniden şekilleniyor. Radyolog ve Yapay Zeka Sağlık Araştırmacısı Dr. Gökcan Okur'un katılımıyla gerçekleştireceğimiz bu çevrimiçi (online) webinarda sektördeki en güncel trendleri keşfedin. Ücretsiz etkinliğimizde yerinizi almak için ön kayıt yaptırmayı unutmayın ve geleceğin teknolojilerine bugünden hazırlanın!",
      image: hero3,
    },
    {
      title: "Tanışma Kahvesi",
      subtitle:
        "Kulübümüzün enerjisini hissetmek, yeni arkadaşlar edinmek ve ortak ilgi alanlarınızı paylaşmak için sizi ilk tanışma etkinliğimize davet ediyoruz. Samimi bir ortamda hem bizi yakından tanıyın hem de gelecekteki projelerimiz için fikir alışverişinde bulunun. Gelin, ilk adımı birlikte atalım!",
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    },
  ];

  const nextSlide = () => {
    setDirection("right");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Otomatik geçiş
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 saniyede bir geçiş

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section id="hero" className="relative bg-linear-to-br from-gray-100 md:mt-0 mt-10 to-gray-200 min-h-screen py-20 overflow-hidden flex items-center">
      <div className="container mx-auto px-4 mb-20">
        <div className="relative">
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div
              key={`content-${currentSlide}`}
              className={`space-y-6 z-10 animate-slideIn${
                direction === "right" ? "Right" : "Left"
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 font-medium">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* Right Image */}
            <div className="relative w-full">
              <div
                key={`image-${currentSlide}`}
                className={`relative w-full border-8 border-black rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-slideIn${
                  direction === "right" ? "Right" : "Left"
                }`}
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-[600px] object-contain object-center"
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-[#fbca1f] font-black text-2xl border-3 border-black shadow-[0.2em_0.2em_black] cursor-pointer transition-all duration-150 hover:translate-x-[0.2em] hover:translate-y-[0.2em] hover:shadow-[0.0em_0.0em_black] flex items-center justify-center"
              aria-label="Previous slide"
            >
              <HiChevronLeft className="stroke-3" strokeWidth={3} />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full border-2 border-black transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-[#fbca1f] scale-125"
                      : "bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-[#fbca1f] font-black text-2xl border-3 border-black shadow-[0.2em_0.2em_black] cursor-pointer transition-all duration-150 hover:translate-x-[0.2em] hover:translate-y-[0.2em] hover:shadow-[0.0em_0.0em_black] flex items-center justify-center"
              aria-label="Next slide"
            >
              <HiChevronRight className="stroke-3" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
