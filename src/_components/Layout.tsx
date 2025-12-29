// src/_components/Layout.tsx
import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HiHome, HiBell, HiUser, HiMagnifyingGlass, HiArrowRightOnRectangle, HiBriefcase, HiLightBulb, HiCog6Tooth, HiInformationCircle, HiCalendar, HiHashtag } from 'react-icons/hi2';
import logoRound from '../assets/logo-round.png';
import { CURRENT_USER, CLUBS, POSTS, OTHER_USERS, GET_USER } from '../data';

// ... (rest is unchanged until navigation)



const Layout = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<{ type: 'club' | 'user' | 'post', data: any }[]>([]);
  const [darkMode, setDarkMode] = useState(false); // Varsayılan: Açık Mod
  const searchRef = useRef<HTMLDivElement>(null);

  // ... (Arama mantığı aynı, kod kalabalığı olmasın diye burayı kısalttım, öncekiyle aynı) ...
  useEffect(() => {
    if (searchQuery.trim() === '') { setResults([]); return; }
    const query = searchQuery.toLowerCase();
    const matchedClubs = CLUBS.filter(c => c.name.toLowerCase().includes(query) || c.handle.toLowerCase().includes(query)).map(c => ({ type: 'club', data: c }));
    const allUsers = [CURRENT_USER, ...OTHER_USERS];
    const matchedUsers = allUsers.filter(u => u.name.toLowerCase().includes(query) || u.handle.toLowerCase().includes(query)).map(u => ({ type: 'user', data: u }));
    const matchedPosts = POSTS.filter(p => p.content.toLowerCase().includes(query)).map(p => ({ type: 'post', data: p }));
    setResults([...matchedClubs, ...matchedUsers, ...matchedPosts] as any);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) { setResults([]); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = () => { setSearchQuery(''); setResults([]); }

  return (
    // DİNAMİK ARKA PLAN: darkMode ? '#111111' : '#f4f1ea' (Kemik/Kağıt Rengi)
    <div className={`min-h-screen font-['Oswald'] overflow-hidden relative transition-colors duration-500 ${darkMode ? 'bg-[#15202b] dark' : 'bg-[#FFFFCC]'}`}>

      {/* Grid Deseni (Teknik Çizim Havası) - Opaklık ayarlandı */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${darkMode ? '#ffffff' : '#000000'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}>
      </div>

      {/* Dekoratif Işıklar - Koyu temada daha belirgin */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#fbca1f]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1ABCAA]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Container Genişliği Arttırıldı (max-w-7xl -> max-w-[1600px]) */}
      <div className="container mx-auto max-w-[1600px] flex gap-0 md:gap-8 px-0 md:px-4 h-screen relative z-10">

        {/* --- SOL SIDEBAR --- */}
        <div className="hidden md:flex flex-col w-20 xl:w-48 h-full py-4 shrink-0 justify-between items-center xl:items-start overflow-hidden">

          <div className="flex flex-col items-center xl:items-start w-full gap-5">
            {/* 1. LOGO */}
            {/* 1. LOGO & TEMA BUTONU */}
            <div className="flex flex-col xl:flex-row items-center xl:self-start gap-1 xl:ml-[30px]">
              <Link to="/home" className="pl-0 hover:scale-105 transition-transform">
                <img
                  src={logoRound}
                  alt="Beytrium"
                  className="w-16 h-16 xl:w-20 xl:h-20 object-cover rounded-full border-4 border-[#fbca1f] shadow-[0px_0px_25px_rgba(251,202,31,0.4)] bg-white"
                />
              </Link>

              {/* AMPUL BUTONU */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full border-4 border-black transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${!darkMode ? 'bg-[#fbca1f] text-black shadow-[0px_0px_15px_#fbca1f]' : 'bg-gray-700 text-gray-400'}`}
                title={!darkMode ? "Işıkları Kapat (Koyu Mod)" : "Işıkları Aç (Açık Mod)"}
              >
                <HiLightBulb className={`w-5 h-5 xl:w-6 xl:h-6 ${!darkMode ? 'animate-pulse' : ''}`} />
              </button>
            </div>

            {/* 2. MENÜ */}
            <nav className="space-y-3 w-full mt-2">
              <>
                <NavItem to="/home" icon={<HiHome />} text="Anasayfa" active={location.pathname === '/home'} />
                <NavItem to="/home/explore" icon={<HiCalendar />} text="Etkinlikler" active={location.pathname === '/home/explore'} />
                <NavItem to="/home/notifications" icon={<HiBell />} text="Bildirimler" active={location.pathname === '/home/notifications'} />
              </>

              <Link
                to="/"
                className="flex items-center justify-center xl:justify-start gap-3 w-12 h-12 xl:w-full xl:h-auto xl:px-4 xl:py-3 text-lg font-black border-4 border-black rounded-full xl:rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-red-600 text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150"
              >
                <span className="text-2xl shrink-0"><HiArrowRightOnRectangle /></span>
                <span className="hidden xl:inline">ÇIKIŞ YAP</span>
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-center xl:items-start w-full gap-4">
            {/* YENİ: KULÜP YÖNETİM BUTONU */}
            {/* YENİ: KULÜP YÖNETİM BUTONU */}
            <Link to="/home/club-management" className="bg-[#fbca1f] w-12 h-12 xl:w-full xl:py-2 xl:px-2 text-sm font-black border-4 border-black rounded-full xl:rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center shrink-0 text-black mb-0">
              <span className="text-xl shrink-0"><HiBriefcase /></span>
              <span className="hidden xl:inline ml-2 whitespace-nowrap">KULÜP YÖNETİMİ</span>
            </Link>

            {/* SADECE KULÜPLER PAYLAŞIM YAPABİLİR */}
            {CURRENT_USER.isClub && (
              <button className="bg-[#1ABCAA] text-white w-12 h-12 xl:w-full xl:py-2 xl:px-2 text-sm font-black border-4 border-black rounded-full xl:rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center shrink-0">
                <span className="hidden xl:inline whitespace-nowrap">GÖNDERİ OLUŞTUR</span>
                <span className="xl:hidden">+</span>
              </button>
            )}

            <div className="flex items-center gap-2 w-full">
              <Link to="/home/profile" className="flex items-center justify-center w-12 h-12 xl:w-12 xl:h-12 rounded-full bg-white border-4 border-black hover:bg-gray-100 cursor-pointer transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group shrink-0 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <img src={CURRENT_USER.avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-black group-hover:scale-105 transition-transform" />
              </Link>
              <Link to="/home/settings" className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 shrink-0 bg-[#fbca1f] text-white ${location.pathname === '/home/settings' ? 'translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] brightness-90' : ''}`}>
                <span className="text-xl shrink-0"><HiCog6Tooth /></span>
              </Link>
              <Link to="/home/about" className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 shrink-0 bg-white text-black hover:bg-gray-100 ${location.pathname === '/home/about' ? 'translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-gray-100' : ''}`} title="Hakkında">
                <span className="text-xl shrink-0"><HiInformationCircle /></span>
              </Link>
            </div>
          </div>
        </div>

        {/* --- ORTA (FEED) --- */}
        <main className="flex-1 h-full overflow-y-auto border-x-0 md:border-x-4 border-black/30 bg-white/5 pb-20 md:pb-0 no-scrollbar backdrop-blur-sm">
          <Outlet />
        </main>

        {/* --- SAĞ SIDEBAR --- */}
        <div className="hidden lg:block w-80 h-full py-6 pl-2 shrink-0 space-y-6 overflow-y-auto no-scrollbar">

          <div className="relative group" ref={searchRef}>
            <div className="relative">
              <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
              <input
                type="text"
                placeholder="Beytrium'da Ara"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-4 border-black rounded-full py-3 pl-12 pr-6 font-bold outline-none transition-all placeholder-gray-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none"
              />
            </div>
            {/* ... (Sonuçlar Kısmı Aynı) ... */}
            {results.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-[400px] overflow-y-auto z-50">
                {results.map((result, index) => {
                  let link = '#'; let image = ''; let title = ''; let subtitle = '';
                  if (result.type === 'club') { link = `/home/club/${result.data.id}`; image = result.data.avatar; title = result.data.name; subtitle = result.data.handle; }
                  else if (result.type === 'user') { link = result.data.id === 'me' ? '/home/profile' : `/home/user/${result.data.id}`; image = result.data.avatar; title = result.data.name; subtitle = result.data.handle; }
                  else if (result.type === 'post') { let authorId = result.data.authorId || result.data.clubId; let isClub = !!result.data.clubId; if (isClub) link = `/home/club/${authorId}`; else if (authorId === 'me') link = '/home/profile'; else link = `/home/user/${authorId}`; image = isClub ? CLUBS.find(c => c.id === authorId)?.avatar || '' : GET_USER(authorId)?.avatar || ''; title = result.data.content; subtitle = 'Gönderi'; }
                  return (
                    <Link key={index} to={link} onClick={handleResultClick} className="flex items-center gap-3 p-3 hover:bg-gray-100 border-b-2 border-gray-100 last:border-0 transition-colors">
                      <img src={image} className="w-10 h-10 rounded-full border-2 border-black shrink-0 bg-white" alt="" />
                      <div className="overflow-hidden"> <p className="font-bold text-sm truncate">{title}</p> <p className="text-gray-500 text-xs truncate font-medium">{subtitle}</p> </div>
                    </Link>
                  );
                })}
              </div>
            )}
            {searchQuery && results.length === 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-center font-bold text-gray-500 z-50">Sonuç bulunamadı 😔</div>
            )}
          </div>

          <div className="bg-[#374151] border-4 border-black rounded-2xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black mb-4 text-white">KULÜPLERİ KEŞFET</h3>
            <div className="space-y-2">
              {CLUBS.map(club => (
                <Link to={`/home/club/${club.id}`} key={club.id} className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group">
                  <img src={club.avatar} className="w-10 h-10 rounded-full border-2 border-black group-hover:scale-105 transition-transform bg-white" alt={club.name} />
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold truncate text-white group-hover:underline decoration-2">{club.name}</p>
                    <p className="text-gray-400 text-xs truncate">{club.handle}</p>
                  </div>
                  <button className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-black border-2 border-black hover:bg-[#fbca1f] hover:text-black transition-all duration-200">Takip</button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* MOBİL ALT MENU */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t-4 border-black z-50 flex justify-around p-3">
          <Link to="/home" className="p-2"><HiHome className="w-7 h-7" /></Link>
          <Link to="/home/explore" className="p-2"><HiHashtag className="w-7 h-7" /></Link>
          <Link to="/home/notifications" className="p-2"><HiBell className="w-7 h-7" /></Link>
          <Link to="/home/profile" className="p-2"><HiUser className="w-7 h-7" /></Link>
        </div>
      </div>
    </div>
  );
};

// NAVITEM (Aynı)
const NavItem = ({ to, icon, text, active }: any) => (
  <Link to={to} className={`flex items-center justify-center gap-2 w-12 h-12 xl:w-full xl:h-auto xl:px-3 xl:py-2 text-base font-black border-4 border-black rounded-full xl:rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#1ABCAA] text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 ${active ? 'translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] brightness-90' : ''}`}>
    <span className="text-xl shrink-0">{icon}</span>
    <span className="hidden xl:inline whitespace-nowrap">{text}</span>
  </Link>
);

export default Layout;