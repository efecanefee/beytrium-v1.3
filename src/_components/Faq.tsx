import { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "SİZ KİMSİNİZ?",
      answer:
        "Beykent Üniversitesi bünyesinde faaliyet gösteren bir teknoloji ve yazılım topluluğuyuz. Öğrencilere kod yazma becerilerini geliştirme, projeler üretme ve teknoloji dünyasındaki gelişmeleri takip etme fırsatı sunuyoruz.",
      guncel: true,
    },
    {
      question: "SİPARİŞİM NE ZAMAN GÖNDERİLİR?",
      answer:
        "Etkinlik kayıtlarınız onaylandıktan sonra 24 saat içinde e-posta ile bilgilendirme yapılır. Workshop ve etkinlik detayları katılımcılara önceden iletilir.",
      guncel: false,
    },
    {
      question: "İADE POLİTİKANIZ NASIL?",
      answer:
        "Üyelik ücretsizdir ve herhangi bir iade politikası bulunmamaktadır. İstediğiniz zaman topluluğumuza katılabilir veya ayrılabilirsiniz.",
      guncel: false,
    },
    {
      question: "BEDENİME UYGUN ÜRÜNÜ NASIL SEÇEBİLİRİM?",
      answer:
        "Kulübümüze katılmak için herhangi bir ön şart bulunmamaktadır. Tüm seviyelerden öğrenciler topluluğumuza katılabilir. Yeni başlayanlar için özel eğitim programlarımız mevcuttur.",
      guncel: true,
    },
    {
      question: "YURTDIŞINA KARGO GÖNDERİYOR MUSUNUZ?",
      answer:
        "Online etkinliklerimiz tüm dünyadan katılıma açıktır. Fiziksel etkinliklerimiz kampüslerimizde gerçekleştirilmektedir.",
      guncel: false,
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="min-h-screen bg-gray-200 py-20 flex items-center">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-4">
            S.S.S
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 font-semibold">
            En Sık Sorulan Sorular Senin İçin Derledik
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Sol Kolon - İlk 3 soru */}
          <div className="space-y-6">
            {faqs.slice(0, 3).map((faq, index) => (
              <div
                key={index}
                className="border-4  border-black rounded-lg overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center  hover:cursor-pointer justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 pr-4">
                    {/* GÜNCEL Badge */}
                    {faq.guncel && (
                      <span className="bg-[#fbca1f] text-black font-black text-xs px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase shrink-0">
                        GÜNCEL
                      </span>
                    )}
                    <h3 className="text-lg md:text-xl font-black text-gray-900 uppercase">
                      {faq.question}
                    </h3>
                  </div>
                  <svg
                    className={`w-6 h-6 shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-4 border-t-4 border-black bg-gray-50">
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sağ Kolon - Son 2 soru */}
          <div className="space-y-6">
            {faqs.slice(3, 5).map((faq, index) => (
              <div
                key={index + 3}
                className="border-4  border-black rounded-lg overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px]"
              >
                <button
                  onClick={() => toggleFaq(index + 3)}
                  className="w-full px-6 py-5 flex items-center  hover:cursor-pointer justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 pr-4">
                    {/* GÜNCEL Badge */}
                    {faq.guncel && (
                      <span className="bg-[#fbca1f] text-black font-black text-xs px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase shrink-0">
                        GÜNCEL
                      </span>
                    )}
                    <h3 className="text-lg md:text-xl font-black text-gray-900 uppercase">
                      {faq.question}
                    </h3>
                  </div>
                  <svg
                    className={`w-6 h-6 shrink-0 transition-transform duration-300 ${
                      openIndex === index + 3 ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index + 3 ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-4 border-t-4 border-black bg-gray-50">
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;

