import { useState } from 'react';
import { HiCalendar, HiChevronLeft, HiChevronRight, HiXMark, HiClock, HiMapPin } from 'react-icons/hi2';
import voleybolPoster from '../assets/Ekler/Kampüs içi voleybol turnuvası.png';
import salsaPoster from '../assets/Ekler/Salsa.png';

const Explore = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Ocak 2026: 1 Ocak Perşembe başlıyor. 31 gün.
  const DAYS_TR = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  const TOTAL_DAYS = 31;
  const START_OFFSET = 3; // Perşembe günü başlıyor

  // Etkinlik Verileri (Detaylı)
  const EVENTS: { [key: number]: { title: string; time: string; color: string; location: string; description: string; image?: string }[] } = {
    5: [{ title: 'Teknoloji Zirvesi', time: '14:00', color: 'bg-blue-500', location: 'Konferans Salonu A', description: 'Sektörün önde gelen isimleri ile teknolojinin geleceğini konuşuyoruz.' }],
    8: [{ title: 'Yapay Zeka Semineri', time: '10:30', color: 'bg-purple-500', location: 'B-204 Dersliği', description: 'Yapay zeka etiği ve gelecekteki kullanım alanları üzerine derinlemesine bir bakış.' }],
    12: [{ title: 'Kısa Film Gösterimi', time: '18:00', color: 'bg-red-500', location: 'Cep Sineması', description: 'Ödüllü kısa filmlerden oluşan özel bir seçki ve yönetmen söyleşisi.' }],
    15: [{ title: 'Kariyer Günleri', time: '09:00', color: 'bg-green-500', location: 'Ana Fuaye', description: 'Onlarca firma ile tanışma ve staj imkanları yakalama fırsatı.' }],
    19: [{ title: 'Voleybol Turnuvası', time: '16:00', color: 'bg-orange-500', location: 'Spor Salonu', description: 'Fakülteler arası voleybol turnuvası final maçı heyecanı!', image: voleybolPoster }],
    22: [{ title: 'Edebiyat Söyleşisi', time: '13:00', color: 'bg-yellow-500', location: 'Kütüphane', description: 'Modern Türk Edebiyatı üzerine keyifli bir sohbet.' }],
    24: [{ title: 'Hackathon Başlangıç', time: '09:00', color: 'bg-indigo-600', location: 'İnovasyon Merkezi', description: '48 saat sürecek kodlama maratonu başlıyor! Takımını kur, projeni geliştir.' }],
    25: [{ title: 'Hackathon Bitiş', time: '17:00', color: 'bg-indigo-600', location: 'İnovasyon Merkezi', description: 'Projelerin sunumu ve ödül töreni.' }],
    28: [{ title: 'Dans Atölyesi', time: '15:30', color: 'bg-pink-500', location: 'Dans Stüdyosu', description: 'Salsa ve Bachata temel adımlarını öğreniyoruz.', image: salsaPoster }],
    30: [{ title: 'E-Spor Finali', time: '20:00', color: 'bg-gray-800', location: 'E-Spor Arenası', description: 'League of Legends şampiyonluk maçı dev ekranda!' }],
  };

  const daysArray = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);
  const emptySlots = Array.from({ length: START_OFFSET }, (_, i) => i);

  return (
    <div className="p-4 md:p-8 min-h-full pb-20 animate-fade-in relative">
      {/* BAŞLIK */}
      <div className="bg-[#fbca1f] border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase text-black flex items-center gap-3">
            <HiCalendar className="w-10 h-10" />
            YAKLAŞAN ETKİNLİKLER
          </h1>
          <p className="font-bold text-black/70 mt-1">Kampüsün nabzı burada atıyor. Hiçbir şeyi kaçırma! 📅</p>
        </div>
        <div className="hidden md:block text-5xl font-black opacity-20">2026</div>
      </div>

      {/* TAKVİM */}
      <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden">

        {/* Takvim Header */}
        <div className="bg-black text-white p-4 flex items-center justify-between border-b-4 border-black dark:border-gray-700">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors"><HiChevronLeft className="w-6 h-6" /></button>
          <h2 className="text-2xl font-black uppercase tracking-widest">OCAK 2026</h2>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors"><HiChevronRight className="w-6 h-6" /></button>
        </div>

        {/* Gün İsimleri */}
        <div className="grid grid-cols-7 border-b-4 border-black dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
          {DAYS_TR.map(day => (
            <div key={day} className="p-3 text-center font-black text-gray-500 dark:text-gray-400 border-r-2 border-black/10 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Günler Grid */}
        <div className="grid grid-cols-7 auto-rows-[120px] md:auto-rows-[140px]">
          {/* Boşluklar */}
          {emptySlots.map(slot => (
            <div key={`empty-${slot}`} className="bg-gray-50/50 dark:bg-gray-800/50 border-r border-b border-gray-200 dark:border-gray-700"></div>
          ))}

          {/* Günler */}
          {daysArray.map(day => {
            const dayEvents = EVENTS[day] || [];
            return (
              <div key={day} className="border-r border-b border-gray-200 dark:border-gray-700 p-2 relative hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                <span className={`font-bold text-lg inline-block w-8 h-8 rounded-full flex items-center justify-center ${dayEvents.length > 0 ? 'bg-black text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                  {day}
                </span>

                <div className="mt-2 space-y-1 overflow-y-auto max-h-[80px] no-scrollbar">
                  {dayEvents.map((event, i) => (
                    <div
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}
                      title="Etkinlik Detayları İçin Tıkla"
                      className={`${event.color} text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded border border-black/20 shadow-sm truncate cursor-pointer hover:scale-105 transition-transform`}
                    >
                      <span className="opacity-75 mr-1">{event.time}</span>
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 font-bold text-sm">Takvimdeki etkinliklere tıklayarak detayları görebilirsiniz.</p>
      </div>

      {/* POPUP MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-500 rounded-3xl p-6 w-full max-w-md shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Dekoratif Header Çizgisi */}
            <div className={`absolute top-0 left-0 w-full h-4 ${selectedEvent.color}`}></div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors border-2 border-transparent hover:border-black"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            <div className="mt-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black text-white mb-3 ${selectedEvent.color} uppercase tracking-wider`}>
                ETKİNLİK DETAYI
              </span>

              <h2 className="text-2xl font-black text-black dark:text-white mb-4 leading-tight">
                {selectedEvent.title}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-bold bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border-2 border-gray-100 dark:border-gray-600">
                  <HiClock className="w-6 h-6 text-black dark:text-white" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-bold bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border-2 border-gray-100 dark:border-gray-600">
                  <HiMapPin className="w-6 h-6 text-black dark:text-white" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              {selectedEvent.image && (
                <div className="mb-6 rounded-xl overflow-hidden shadow-md border-2 border-black">
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-auto object-cover" />
                </div>
              )}

              <div className="bg-[#fbca1f]/20 p-4 rounded-xl border-2 border-[#fbca1f] text-gray-800 dark:text-gray-200 font-medium">
                <p>"{selectedEvent.description}"</p>
              </div>

              <button onClick={() => setSelectedEvent(null)} className="w-full mt-6 bg-black text-white font-black py-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all hover:bg-gray-900">
                KAPAT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;