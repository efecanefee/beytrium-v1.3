import {
  HiUser, HiShieldCheck, HiBell, HiMoon, HiSun,
  HiChatBubbleLeftRight,
  HiDocumentText, HiStar, HiGlobeAlt,
  HiBookmark, HiUserGroup, HiChevronRight,
  HiQrCode, HiEye, HiAdjustmentsHorizontal,
  HiNoSymbol, HiEnvelope, HiSparkles
} from 'react-icons/hi2';
import { Link, useOutletContext } from 'react-router-dom';
import { CURRENT_USER } from '../data';

interface LayoutContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Settings = () => {
  const { darkMode, setDarkMode } = useOutletContext<LayoutContextType>();

  const handleClick = (feature: string) => {
    if (feature === "Görünüm ve Tema") {
      setDarkMode(!darkMode);
    } else {
      alert(`${feature} özelliği yakında eklenecek! 🚧`);
    }
  };

  const sections = [
    {
      title: "Hesap & Kimlik",
      items: [
        { icon: <HiUser />, label: "Hesabım", desc: "Profil bilgilerini düzenle", color: "bg-blue-100 dark:bg-blue-900/30" },
        { icon: <HiQrCode />, label: "Dijital Kimlik / QR", desc: "Etkinlik girişleri için kimliğin", color: "bg-[#fbca1f]/40 dark:bg-[#fbca1f]/20" },
        { icon: <HiUserGroup />, label: "Kulüp Üyeliklerim", desc: "Üye olduğun kulüpleri yönet", color: "bg-indigo-100 dark:bg-indigo-900/30" },
        { icon: <HiShieldCheck />, label: "Giriş ve Şifre", desc: "Şifre ve 2FA işlemleri", color: "bg-green-100 dark:bg-green-900/30" },
      ]
    },
    {
      title: "Gizlilik ve İletişim",
      items: [
        { icon: <HiEye />, label: "Profil Gizliliği", desc: "Profilini kimler görebilir?", color: "bg-rose-100 dark:bg-rose-900/30" },
        { icon: <HiEnvelope />, label: "Mesaj Ayarları", desc: "Sana kimler mesaj atabilir?", color: "bg-sky-200 dark:bg-sky-900/30" },
        { icon: <HiNoSymbol />, label: "Engellenenler", desc: "Engellediğin kişi ve kulüpler", color: "bg-gray-300 dark:bg-gray-700" },
        { icon: <HiBell />, label: "Bildirim Tercihleri", desc: "Hangi bildirimleri alacaksın?", color: "bg-purple-100 dark:bg-purple-900/30" },
      ]
    },
    {
      title: "İçerik ve Keşfet",
      items: [
        { icon: <HiSparkles />, label: "Keşfet Algoritması", desc: "İlgi alanlarını ve akışı düzenle", color: "bg-fuchsia-100 dark:bg-fuchsia-900/30" },
        { icon: <HiAdjustmentsHorizontal />, label: "Akış Filtreleri", desc: "Ana sayfada neleri görmek istersin?", color: "bg-teal-100 dark:bg-teal-900/30" },
        { icon: <HiBookmark />, label: "Kaydedilenler", desc: "Arşivlediğin gönderiler", color: "bg-orange-100 dark:bg-orange-900/30" },
        // --- TEMA BUTONU ---
        {
          icon: darkMode
            ? <HiSun className="animate-pulse text-yellow-500 scale-110" />
            : <HiMoon className="animate-bounce text-gray-700 dark:text-gray-300" />,
          label: "Görünüm ve Tema",
          desc: darkMode ? "Açık moda geçmek için tıkla" : "Koyu moda geçmek için tıkla",
          color: "bg-yellow-100 dark:bg-yellow-900/30"
        },
      ]
    },
    {
      title: "Destek & Diğer",
      items: [
        { icon: <HiGlobeAlt />, label: "Dil / Language", desc: "TR - EN", color: "bg-blue-50 dark:bg-blue-900/20" },
        { icon: <HiChatBubbleLeftRight />, label: "Bize Ulaşın / Destek", desc: "Sorun bildir", color: "bg-lime-100 dark:bg-lime-900/30" },
        { icon: <HiDocumentText />, label: "Gizlilik ve Şartlar", desc: "KVKK ve kullanım koşulları", color: "bg-red-50 dark:bg-red-900/20" },
        { icon: <HiStar />, label: "Bizi Değerlendir", desc: "App Store / Play Store", color: "bg-[#1ABCAA]/20 dark:bg-[#1ABCAA]/10" },
      ]
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto pb-24 animate-fade-in">

      {/* BAŞLIK KISMI */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full border-4 border-black dark:border-gray-500 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <img src={CURRENT_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-4">
            {/* ÇÖZÜM: 'style' prop'u kullanarak rengi zorla ayarladık. Bu kesin çalışır. */}
            <h1
              className="text-4xl font-black uppercase tracking-tight"
              style={{ color: darkMode ? '#ffffff' : '#000000' }}
            >
              Ayarlar
            </h1>

            <Link to="/admin" className="ml-2 bg-black dark:bg-white dark:text-black text-white px-3 py-1 rounded-lg text-sm font-black border-2 border-black dark:border-white hover:bg-[#fbca1f] hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] flex items-center gap-1">
              <HiShieldCheck />
              ADMIN
            </Link>
          </div>

          {/* Burayı da garantiye alalım */}
          <p
            className="font-bold mt-1 text-lg"
            style={{ color: darkMode ? '#d1d5db' : '#1f2937' }} // Gri tonları
          >
            Yönetim Paneli
          </p>
        </div>
      </div>

      {/* MENÜ KARTLARI */}
      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl font-black border-b-4 border-black dark:border-white inline-block px-2 bg-[#fbca1f] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              {section.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  onClick={() => handleClick(item.label)}
                  className="group flex items-center gap-4 p-4 border-4 border-black dark:border-gray-500 bg-white dark:bg-gray-800 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transition-all cursor-pointer relative overflow-hidden active:scale-[0.98]"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-2 ${item.color} group-hover:w-full transition-all duration-300 -z-0 opacity-50`}></div>

                  <div className={`w-12 h-12 flex items-center justify-center text-2xl border-2 border-black dark:border-gray-500 rounded-full bg-white dark:bg-gray-700 dark:text-white relative z-10 shrink-0`}>
                    {item.icon}
                  </div>

                  <div className="flex-1 relative z-10">
                    <h3 className="font-black text-lg leading-tight text-gray-900 dark:text-white">{item.label}</h3>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>

                  <HiChevronRight className="text-xl opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 relative z-10 text-black dark:text-white" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;