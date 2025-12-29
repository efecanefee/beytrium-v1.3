import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { HiCalendar, HiChevronLeft, HiChevronRight, HiXMark, HiClock, HiMapPin, HiArrowPath } from 'react-icons/hi2';

// Resimler
import voleybolPoster from '../assets/Ekler/Kampüs içi voleybol turnuvası.png';
import salsaPoster from '../assets/Ekler/Salsa.png';

interface Event {
  title: string;
  time: string;
  color: string;
  location: string;
  description: string;
  image?: string;
}

interface EventsData {
  [year: number]: {
    [month: number]: {
      [day: number]: Event[];
    };
  };
}

const Explore = () => {
  const [selectedEvent, setSelectedEvent] = useState<{ data: Event; day: number } | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const modalContentRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  // --- DİNAMİK DEĞİŞKENLER ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const DAYS_TR = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  // --- ODAKLANMA FONKSİYONU ---
  const scrollToToday = () => {
    // Biraz bekleyelim ki React render işlemini bitirsin (100ms yeterli)
    setTimeout(() => {
      const element = document.getElementById('current-day-card');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // 1. Sayfa ilk açıldığında bugüne odaklan
  useEffect(() => {
    scrollToToday();
  }, []);

  // Modal Scroll Kilitleme
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedEvent]);

  const EVENTS: EventsData = {
    2026: {
      0: {
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
      }
    }
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = (firstDayOfMonth + 6) % 7;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptySlots = Array.from({ length: startOffset }, (_, i) => i);

  const prevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  // GÜNCELLENMİŞ "Bugüne Git": Hem tarihi ayarla hem de oraya kaydır
  const goToToday = () => {
    setCurrentDate(new Date());
    scrollToToday();
  };

  const getEventsForDay = (day: number) => EVENTS[year]?.[month]?.[day] || [];
  const isToday = (day: number) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const monthName = currentDate.toLocaleDateString('tr-TR', { month: 'long' }).toUpperCase();
  const monthNameNormal = currentDate.toLocaleDateString('tr-TR', { month: 'long' });

  // --- MODAL RENDER ---
  const renderModal = () => {
    if (!selectedEvent) return null;
    const formattedDate = `${selectedEvent.day} ${monthNameNormal} ${year} - ${selectedEvent.data.time}`;

    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ margin: 0 }}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedEvent(null)}
        ></div>

        <div
          ref={modalContentRef}
          className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-500 rounded-3xl p-6 w-full max-w-md shadow-[0px_0px_50px_rgba(0,0,0,0.5)] relative overflow-hidden max-h-[85vh] overflow-y-auto no-scrollbar z-10 animate-fade-in"
          onClick={e => e.stopPropagation()}
        >
          <div className={`absolute top-0 left-0 w-full h-4 ${selectedEvent.data.color}`}></div>
          <button
            onClick={() => setSelectedEvent(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors border-2 border-transparent hover:border-black z-10"
          >
            <HiXMark className="w-6 h-6" />
          </button>

          <div className="mt-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-black text-white mb-3 ${selectedEvent.data.color} uppercase tracking-wider`}>
              ETKİNLİK DETAYI
            </span>

            <h2 className="text-2xl font-black text-black dark:text-white mb-4 leading-tight">
              {selectedEvent.data.title}
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold bg-gray-100 dark:bg-gray-700/50 p-3 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                <HiClock className="w-6 h-6 text-black dark:text-white shrink-0" />
                <span>{formattedDate}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold bg-gray-100 dark:bg-gray-700/50 p-3 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                <HiMapPin className="w-6 h-6 text-black dark:text-white shrink-0" />
                <span>{selectedEvent.data.location}</span>
              </div>
            </div>

            {selectedEvent.data.image && (
              <div className="mb-6 rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                <img src={selectedEvent.data.image} alt={selectedEvent.data.title} className="w-full h-48 object-cover" />
              </div>
            )}

            <div className="bg-[#fbca1f]/20 p-4 rounded-xl border-2 border-[#fbca1f] text-gray-900 dark:text-gray-100 font-medium text-sm">
              <p>"{selectedEvent.data.description}"</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 min-h-full pb-20 animate-fade-in relative">

      <div className="bg-[#fbca1f] border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase text-black flex items-center gap-3">
            <HiCalendar className="w-10 h-10" />
            ETKİNLİK TAKVİMİ
          </h1>
          <p className="font-bold text-black/70 mt-1">Kampüsün nabzı burada atıyor. 📅</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={goToToday} className="flex items-center gap-2 bg-white px-4 py-2 font-black border-2 border-black rounded-lg hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer">
            <HiArrowPath className="w-5 h-5" /> BUGÜN
          </button>
          <div className="hidden md:block text-5xl font-black opacity-20 select-none">{year}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden relative">
        <div className="relative z-30 bg-black text-white p-4 flex items-center justify-between border-b-4 border-black dark:border-gray-700">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-700 rounded-full transition-colors active:scale-95 cursor-pointer select-none">
            <HiChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center pointer-events-none">
            <h2 className="text-2xl font-black uppercase tracking-widest">{monthName}</h2>
            <span className="text-sm font-bold text-gray-400">{year}</span>
          </div>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-700 rounded-full transition-colors active:scale-95 cursor-pointer select-none">
            <HiChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-7 border-b-4 border-black dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
          {DAYS_TR.map(day => (
            <div key={day} className="p-3 text-center font-black text-gray-500 dark:text-gray-400 border-r-2 border-black/10 last:border-r-0 text-sm md:text-base">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-[120px] md:auto-rows-[140px] relative z-10">
          {emptySlots.map(slot => (
            <div key={`empty-${slot}`} className="bg-gray-50/50 dark:bg-gray-800/50 border-r border-b border-gray-200 dark:border-gray-700"></div>
          ))}
          {daysArray.map(day => {
            const dayEvents = getEventsForDay(day);
            const isCurrentDay = isToday(day);
            return (
              <div
                key={day}
                // ÖNEMLİ: Eğer bu gün "bugün" ise, ona özel bir ID veriyoruz.
                id={isCurrentDay ? 'current-day-card' : undefined}
                className={`border-r border-b border-gray-200 dark:border-gray-700 p-2 relative transition-colors group ${isCurrentDay ? 'bg-yellow-50 dark:bg-yellow-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
              >
                <span className={`font-bold text-lg inline-flex w-8 h-8 rounded-full items-center justify-center ${isCurrentDay ? 'bg-[#fbca1f] text-black border-2 border-black shadow-sm' : dayEvents.length > 0 ? 'bg-black text-white' : 'text-gray-400 dark:text-gray-500'}`}>{day}</span>
                <div className="mt-2 space-y-1 overflow-y-auto max-h-[70px] md:max-h-[90px] no-scrollbar">
                  {dayEvents.map((event, i) => (
                    <div
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setSelectedEvent({ data: event, day: day }); }}
                      className={`${event.color} text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded border border-black/20 shadow-sm truncate cursor-pointer hover:scale-105 transition-transform`}
                    >
                      <span className="opacity-75 mr-1 hidden md:inline">{event.time}</span>
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-center">
        {/* DÜZELTME:
            text-gray-500 -> Açık modda koyu gri (Okunur)
            dark:text-gray-400 -> Koyu modda açık gri (Okunur)
            opacity sınıfını kaldırdık, rengin kendisi zaten hafif soluk.
        */}
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Şu an gösterilen: {monthName} {year}
        </p>
      </div>
      {selectedEvent && createPortal(renderModal(), document.body)}

    </div>
  );
};

export default Explore;