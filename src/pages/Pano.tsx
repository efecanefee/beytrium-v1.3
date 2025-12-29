import Footer from '../_components/Footer'

const Pano = () => {
  return (
    <>
      <section className="min-h-screen bg-linear-to-br md:mt-0 mt-10 from-gray-50 to-gray-100 py-20 flex items-center">
        <div className="container mx-auto px-4">
          {/* Başlık */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-4">
              PANO
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-semibold">
              Duyurular, Etkinlikler ve Haberler
            </p>
          </div>

          {/* İçerik */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Örnek Duyuru Kartı */}
            <div className="border-8 border-black rounded-lg bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="bg-[#fbca1f] px-6 py-4 border-b-4 border-black">
                <h2 className="text-2xl font-black text-gray-900 uppercase">
                  Yapay Zeka Webinarı
                </h2>
                <p className="text-sm font-semibold text-gray-700 mt-1">
                  25 Ekim 2025 - 14:00
                </p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Sağlıkta Yapay Zeka Devrimi konulu webinarımıza davetlisiniz!
                  Dr. Gökcan Okur ile yapay zekanın sağlık sektöründeki
                  uygulamalarını konuşacağız.
                </p>
                <button className="bg-[#fbca1f] px-6 py-3 font-black border-3 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Detayları Gör
                </button>
              </div>
            </div>

            {/* Örnek Duyuru Kartı 2 */}
            <div className="border-8 border-black rounded-lg bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="bg-gray-200 px-6 py-4 border-b-4 border-black">
                <h2 className="text-2xl font-black text-gray-900 uppercase">
                  Tanışma Kahvesi
                </h2>
                <p className="text-sm font-semibold text-gray-700 mt-1">
                  28 Ekim 2025 - 16:00
                </p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Kulübümüzün ilk tanışma etkinliğine davetlisiniz. Kahve
                  eşliğinde sohbet edip, projeler hakkında fikir alışverişinde
                  bulunalım!
                </p>
                <button className="bg-[#fbca1f] px-6 py-3 font-black border-3 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Detayları Gör
                </button>
              </div>
            </div>

            {/* Boş Durum Mesajı (isteğe bağlı) */}
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg font-semibold">
                Daha fazla duyuru yakında eklenecek...
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Pano

