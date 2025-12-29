// src/pages/AdminDashboard.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    HiHome, HiUsers, HiCheckBadge,
    HiXMark, HiCheck, HiExclamationTriangle,
    HiTrash, HiLockClosed, HiArrowRightOnRectangle,
    HiClipboardDocumentList, HiCog6Tooth, HiMegaphone,
    HiCalendarDays, HiCommandLine,
    HiShieldCheck, HiCloudArrowDown, HiServerStack,
    HiMapPin, HiClock, HiChatBubbleBottomCenterText, HiFlag,
    HiTag, HiEnvelope, HiUserCircle,
    HiTicket, HiArrowTrendingUp, HiBolt, HiCpuChip,
    HiMagnifyingGlass, HiFunnel, HiArrowDownTray,
    HiChatBubbleLeftRight, HiAcademicCap, HiFingerPrint // 👈 DÜZELTME: HiSpeakerphone yerine HiChatBubbleLeftRight
} from 'react-icons/hi2';

import { CLUBS } from '../data';

import voleybolPosterSuperAdmin from '../assets/Ekler/Voleybol Turnuvası (süper admin).jpg';
import romeoPoster from '../assets/Ekler/Romeo ve Juliet (etkinlik istekleri).png';
import reactPoster from '../assets/Ekler/React ile modern web.jpg';

// USER PP IMPORTS
import mehmetOzPP from '../assets/Ekler/pp/Mehmet Öz/Mehmet Öz.png';
import cananCanPP from '../assets/Ekler/pp/Canan Can/Canan Can.png';
import trollPP from '../assets/Ekler/pp/Troll hesap/Troll.png';
import aliVeliPP from '../assets/Ekler/pp/Ali Veli/Ali Veli.png';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginCredentials, setLoginCredentials] = useState({ usernameOrEmail: '', password: '' });
    const [activeTab, setActiveTab] = useState<'overview' | 'pending-clubs' | 'all-clubs' | 'events' | 'users' | 'reports' | 'logs' | 'settings'>('overview');

    // --- MOCK VERİLER ---

const [pendingClubs, setPendingClubs] = useState([
        {
            id: 1,
            name: 'Gastronomi ve Mutfak',
            email: 'gastro_club@beykent.edu.tr',
            head: 'Cemre Aşçı',
            headHandle: '@cemre_gastro',
            category: 'Hobi',
            desc: 'Dünya mutfağından lezzetleri kampüse taşımak, yemek atölyeleri ve tadım etkinlikleri düzenlemek istiyoruz. Afiyet olsun!',
            // 2 GÜN ÖNCE
            date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() 
        },
        {
            id: 2,
            name: 'Münazara Kulübü',
            email: 'munazara@beykent.edu.tr',
            head: 'Selin Konuşkan',
            headHandle: '@selin_talks',
            category: 'Kültür',
            desc: 'Fikirlerin çarpıştığı, gerçeğin ortaya çıktığı yer. Üniversiteler arası turnuvalarda okulumuzu temsil etmek ve hitabet yeteneğini geliştirmek.',
            // 5 SAAT ÖNCE
            date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
        },
    ]);
    const [activeClubs, setActiveClubs] = useState(CLUBS.map((club, index) => {
        // Kategori belirleme (Basit mantık)
        let category = 'Genel';
        if (['tech', 'ai', 'startup'].includes(club.id)) category = 'Teknoloji';
        else if (['art', 'music', 'dance', 'theatre', 'media', 'library'].includes(club.id)) category = 'Sanat';
        else if (['sport', 'esports', 'nature'].includes(club.id)) category = 'Spor';
        else if (['help', 'paws'].includes(club.id)) category = 'Sosyal';

        return {
            id: 100 + index,
            name: club.name,
            email: `${club.id}@beykent.edu.tr`,
            head: (club as any).president?.name || 'Atanmadı',
            headHandle: (club as any).president?.name ? `@${(club as any).president.name.toLowerCase().replace(/\s+/g, '')}` : `@${club.id}_baskan`,
            category: category,
            description: club.description,
            members: club.followers,
            events: (club as any).events || 0,
            avatar: club.avatar,
            date: '2024',
            status: 'Aktif'
        };
    }));

    // İSTATİSTİK HESAPLAMA
    const totalMembers = activeClubs.reduce((acc, c) => acc + c.members, 0);
    const totalEvents = activeClubs.reduce((acc, c) => acc + (c as any).events, 0);

    const [eventRequests, setEventRequests] = useState([
        {
            id: 1,
            club: 'Teknoloji Kulübü',
            email: 'yazilim@beykent.edu.tr',
            title: 'React ile Modern Web Geliştirme',
            type: 'Workshop / Eğitim',
            desc: 'Bu atölyede sıfırdan bir React projesi oluşturacağız. Katılımcıların kendi bilgisayarlarını getirmesi zorunludur. Kontenjan 50 kişi ile sınırlıdır.',
            date: '25.12.2025',
            time: '14:00 - 17:00',
            loc: 'B-Blok Konferans Salonu',
            capacity: 50,
            poster: reactPoster
        },
        {
            id: 2,
            club: 'Tiyatro Kulübü',
            email: 'tiyatro@beykent.edu.tr',
            title: 'Romeo & Juliet: Dönem Sonu Oyunu',
            type: 'Gösteri',
            desc: 'Tüm dönem boyunca hazırladığımız oyunumuzun prömiyeri. Girişler ücretsizdir ancak bilet alınması gerekmektedir.',
            date: '30.12.2025',
            time: '19:00 - 21:30',
            loc: 'Ana Sahne (A-Blok)',
            capacity: 250,
            poster: romeoPoster
        },
        {
            id: 3,
            club: 'Spor Kulübü',
            email: 'spor@beykent.edu.tr',
            title: 'Kampüs İçi Voleybol Turnuvası',
            type: 'Turnuva',
            desc: 'Fakülteler arası voleybol turnuvası final maçı heyecanı! Takımını kur gel.',
            date: '19.01.2026',
            time: '16:00 - 18:00',
            loc: 'Spor Salonu',
            capacity: 500,
            poster: voleybolPosterSuperAdmin
        },
    ]);

    const [users, setUsers] = useState([
        {
            id: 104, // ID'ler karışık olsa bile...
            handle: '@arefali',
            name: 'Aref Ali',
            email: '220104535@student.beykent.edu.tr',
            department: 'Mimarlık',
            status: 'active',
            reports: 1,
            joinDate: '12.09.2023', // YENİ ALAN
            avatar: aliVeliPP
        },
        {
            id: 102,
            handle: '@canancan',
            name: 'Canan Can',
            email: '220104444@student.beykent.edu.tr',
            department: 'Hukuk Fakültesi',
            status: 'suspended',
            reports: 5,
            joinDate: '05.10.2022', // YENİ ALAN
            avatar: cananCanPP
        },
        {
            id: 101,
            handle: '@mehmetoz',
            name: 'Mehmet Öz',
            email: '220104535@student.beykent.edu.tr',
            department: 'Bilgisayar Müh.',
            status: 'active',
            reports: 0,
            joinDate: '14.09.2021', // YENİ ALAN
            avatar: mehmetOzPP
        },
        {
            id: 103,
            handle: '@zekaii',
            name: 'Zekai Kirişçi',
            department: 'İşletme',
            email: '220104999@student.beykent.edu.tr',
            status: 'active',
            reports: 12,
            joinDate: '01.11.2024', // YENİ ALAN
            avatar: trollPP
        },
    ]);

    const [reports, setReports] = useState([
        {
            id: 1,
            severity: 'high',
            type: 'Nefret Söylemi',
            location: 'Ana Akış (Feed)',
            // ŞU ANKİ ZAMANDAN 12 DAKİKA ÖNCESİNİ SİMÜLE EDİYORUZ
            timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
            content: 'Buradaki herkes aptal, hiçbiriniz bir işe yaramazsınız!',
            reporter: { name: 'Aref Ali', handle: '@arefali', avatar: aliVeliPP },
            reported: { name: 'Zekai Kirişçi', handle: '@zekaii', avatar: trollPP }
        },
        {
            id: 2,
            severity: 'medium',
            type: 'Spam / Reklam',
            location: 'Teknoloji Kulübü Yorumları',
            // ŞU ANKİ ZAMANDAN 1 GÜN 4 SAAT ÖNCESİNİ SİMÜLE EDİYORUZ
            timestamp: new Date(Date.now() - (1000 * 60 * 60 * 28)).toISOString(),
            content: 'Bedava kontör için şu linke tıklayın: www.badlink.com',
            reporter: { name: 'Mehmet Öz', handle: '@mehmetoz', avatar: mehmetOzPP },
            reported: { name: 'Canan Can', handle: '@canancan', avatar: cananCanPP }
        },
    ]);

    const [systemLogs] = useState([
        { id: 1234, admin: 'SuperAdmin', role: 'ROOT', ip: '192.168.1.12', action: 'DELETE', module: 'USER_MGMT', target: '@canancan', desc: 'Kullanıcı hesabı süresiz askıya alındı (Spam tespiti).', status: 'success', time: '21.12.2025 14:42:10' },
        { id: 1233, admin: 'MehmetY', role: 'MODERATOR', ip: '178.22.41.90', action: 'UPDATE', module: 'CLUB_OPS', target: 'Teknoloji Kulübü', desc: 'Kulüp başkanı yetkileri güncellendi.', status: 'success', time: '21.12.2025 12:15:00' },
        { id: 1232, admin: 'SYSTEM', role: 'AUTO', ip: 'LOCALHOST', action: 'CRON', module: 'DATABASE', target: 'Daily_Backup', desc: 'Günlük veritabanı yedeği oluşturuldu (Size: 4.2GB).', status: 'success', time: '21.12.2025 03:00:00' },
        { id: 1231, admin: 'AliK', role: 'ADMIN', ip: '88.14.22.11', action: 'LOGIN_FAIL', module: 'AUTH', target: 'Panel Login', desc: 'Hatalı şifre denemesi (3. deneme).', status: 'warning', time: '20.12.2025 23:45:12' },
        { id: 1230, admin: 'SuperAdmin', role: 'ROOT', ip: '192.168.1.12', action: 'CREATE', module: 'EVENTS', target: 'Bahar Şenliği', desc: 'Yeni global etkinlik takvime eklendi.', status: 'success', time: '20.12.2025 10:20:05' },
    ]);

    // SETTINGS STATE
    const [settings, setSettings] = useState({
        maintenanceMode: false,
        allowRegistration: true,
        onlySchoolEmail: true,
        autoModeration: false,
        currentSemester: '2025-2026 Güz Dönemi',
        announcementType: 'global', // 'global' | 'club' | 'user'
        announcementTarget: '',
        announcementMsg: ''
    });

    // --- İŞLEM FONKSİYONLARI ---


    // YARDIMCI FONKSİYON: Tarihi "X zaman önce" formatına çevirir
// YARDIMCI FONKSİYON: "0 saat" detayını gizleyen akıllı format
const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const days = Math.floor(diffInSeconds / 86400);
    const hours = Math.floor((diffInSeconds % 86400) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);

    if (days > 0) {
        // EĞER SAAT 0 İSE GÖSTERME (Örn: "2 gün önce" yazar, "2 gün 0 saat" yazmaz)
        return `${days} gün${hours > 0 ? ` ${hours} saat` : ''} önce`;
    }
    if (hours > 0) return `${hours} saat ${minutes} dk önce`;
    if (minutes > 0) return `${minutes} dk önce`;
    return "Az önce";
};
    

    const handleClubApprove = (id: number) => {
        const club = pendingClubs.find(c => c.id === id);
        if (club) {
            const newClub = {
                id: Date.now(),
                name: club.name,
                email: 'pending@beykent.edu.tr',
                head: club.head,
                headHandle: '@yeni_baskan',
                category: 'Genel',
                description: club.desc,
                members: 1,
                date: '2025',
                status: 'Aktif',
                events: 0,
                avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=' + club.name
            };
            setActiveClubs([...activeClubs, newClub]);
            setPendingClubs(pendingClubs.filter(c => c.id !== id));
            alert(`${club.name} onaylandı ve aktif edildi!`);
        }
    };

    const handleClubReject = (id: number) => {
        setPendingClubs(pendingClubs.filter(c => c.id !== id));
        alert('Başvuru reddedildi.');
    };

    const handleClubDelete = (id: number) => {
        if (confirm('Bu kulübü ve tüm verilerini silmek istediğine emin misin?')) {
            setActiveClubs(activeClubs.filter(c => c.id !== id));
        }
    }

    const handleEventAction = (id: number, approved: boolean) => {
        setEventRequests(eventRequests.filter(e => e.id !== id));
        alert(approved ? 'Etkinlik onaylandı ve takvime eklendi.' : 'Etkinlik reddedildi.');
    }

    const handleUserBan = (id: number) => {
        alert('Kullanıcı askıya alındı!');
        setUsers(users.map(u => u.id === id ? { ...u, status: 'suspended' } : u));
    };

    const handleReportAction = (id: number, action: 'delete' | 'ban' | 'dismiss') => {
        if (action === 'delete') alert('İçerik silindi.');
        if (action === 'ban') alert('Kullanıcı banlandı ve içerik silindi.');
        if (action === 'dismiss') alert('Şikayet reddedildi/görmezden gelindi.');
        setReports(reports.filter(r => r.id !== id));
    };

    const handleBackup = () => {
        alert('Sistem yedeği indirilmeye başlandı... (beytrium_backup_v1.sql)');
    }

    const handleSendAnnouncement = () => {
        if (!settings.announcementMsg) return alert('Lütfen bir mesaj yazın.');

        let target = 'HERKESE';
        if (settings.announcementType === 'club') target = `${settings.announcementTarget || 'Seçili'} KULÜBÜNE`;
        if (settings.announcementType === 'user') target = `${settings.announcementTarget || 'Seçili'} KULLANICISINA`;

        alert(`DUYURU GÖNDERİLDİ!\n\nHedef: ${target}\nMesaj: ${settings.announcementMsg}`);
        setSettings({ ...settings, announcementMsg: '', announcementTarget: '' });
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Basit doğrulama (gerçek uygulamada backend'e istek atılır)
        if (loginCredentials.usernameOrEmail && loginCredentials.password) {
            setIsAuthenticated(true);
        } else {
            alert('Lütfen kullanıcı adı/e-posta ve şifre giriniz.');
        }
    }

    // GİRİŞ EKRANI
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#fbca1f] font-['Oswald'] flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-[#fbca1f] rounded-full border-4 border-black flex items-center justify-center text-black text-4xl mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <HiLockClosed />
                        </div>
                        <h1 className="text-3xl font-black uppercase mb-2">SÜPER ADMİN</h1>
                        <p className="text-gray-600 font-bold text-sm">Yönetim Paneli Girişi</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block font-black text-sm uppercase mb-2 text-gray-700">
                                Kullanıcı Adı veya E-Posta
                            </label>
                            <input
                                type="text"
                                value={loginCredentials.usernameOrEmail}
                                onChange={(e) => setLoginCredentials({ ...loginCredentials, usernameOrEmail: e.target.value })}
                                className="w-full border-4 border-black p-4 rounded-xl font-bold text-lg focus:outline-none focus:ring-0 focus:border-[#fbca1f] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                placeholder="admin@beykent.edu.tr"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-black text-sm uppercase mb-2 text-gray-700">
                                Şifre
                            </label>
                            <input
                                type="password"
                                value={loginCredentials.password}
                                onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                                className="w-full border-4 border-black p-4 rounded-xl font-bold text-lg focus:outline-none focus:ring-0 focus:border-[#fbca1f] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white font-black text-lg py-4 rounded-xl border-4 border-black hover:bg-gray-800 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] flex items-center justify-center gap-2"
                        >
                            <HiLockClosed className="text-xl" />
                            GİRİŞ YAP
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/home" className="text-gray-600 font-bold text-sm hover:text-black transition-colors flex items-center justify-center gap-2">
                            <HiArrowRightOnRectangle className="rotate-180" />
                            Ana Uygulamaya Dön
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fbca1f] font-['Oswald'] flex flex-col md:flex-row">

            {/* --- SIDEBAR --- */}
            <aside className="w-full md:w-72 bg-black text-white p-6 flex flex-col justify-between shrink-0 border-r-4 border-black h-screen sticky top-0 overflow-y-auto no-scrollbar">
                <div>
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className="w-12 h-12 bg-[#fbca1f] rounded-full border-2 border-white flex items-center justify-center text-black text-2xl animate-pulse">
                            <HiLockClosed />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black leading-none tracking-tighter">SÜPER<br />ADMIN</h1>
                        </div>
                    </div>

                    <nav className="space-y-3">
                        <MenuButton label="Genel Bakış" icon={<HiHome />} active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />

                        <div className="text-gray-500 text-xs font-bold uppercase mt-4 mb-2 pl-2">Kulüp & Etkinlik</div>
                        <MenuButton label="Onay Bekleyenler" icon={<HiCheckBadge />} active={activeTab === 'pending-clubs'} count={pendingClubs.length} onClick={() => setActiveTab('pending-clubs')} />
                        <MenuButton label="Tüm Kulüpler" icon={<HiClipboardDocumentList />} active={activeTab === 'all-clubs'} onClick={() => setActiveTab('all-clubs')} />
                        <MenuButton label="Etkinlik İstekleri" icon={<HiCalendarDays />} active={activeTab === 'events'} count={eventRequests.length} onClick={() => setActiveTab('events')} />

                        <div className="text-gray-500 text-xs font-bold uppercase mt-4 mb-2 pl-2">Kullanıcı & Güvenlik</div>
                        <MenuButton label="Kullanıcılar" icon={<HiUsers />} active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                        <MenuButton label="Raporlar / Şikayet" icon={<HiExclamationTriangle />} active={activeTab === 'reports'} count={reports.length} onClick={() => setActiveTab('reports')} />
                        <MenuButton label="Sistem Logları" icon={<HiCommandLine />} active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />

                        <div className="text-gray-500 text-xs font-bold uppercase mt-4 mb-2 pl-2">Sistem</div>
                        <MenuButton label="Sistem Ayarları" icon={<HiCog6Tooth />} active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                    </nav>
                </div>

                <Link to="/home" className="mt-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold p-2 border-2 border-transparent hover:border-gray-600 rounded-lg">
                    <HiArrowRightOnRectangle /> Uygulamaya Dön
                </Link>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 p-4 md:p-10 overflow-y-auto bg-[#fbca1f]">
                <div className="max-w-6xl mx-auto bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 min-h-[85vh]">

                    {/* 1. GENEL BAKIŞ */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Kullanıcı Kartı */}
                                <div className="bg-blue-200 border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:-translate-y-1 transition-transform">
                                    <div className="absolute -right-6 -top-6 text-blue-300/50 text-9xl group-hover:rotate-12 transition-transform"><HiUsers /></div>
                                    <h3 className="font-bold text-lg text-black/70 uppercase">Toplam Üye</h3>
                                    <p className="text-5xl font-black mt-2 relative z-10">{totalMembers.toLocaleString()}</p>
                                    <div className="mt-4 flex items-center gap-2 font-bold text-sm bg-white/50 w-fit px-2 py-1 rounded border-2 border-black">
                                        <HiArrowTrendingUp className="text-green-600" /> <span className="text-green-700">%12 artış</span> (bu hafta)
                                    </div>
                                </div>

                                {/* Kulüp Kartı */}
                                <div className="bg-[#1ABCAA] border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:-translate-y-1 transition-transform">
                                    <div className="absolute -right-6 -top-6 text-teal-300/50 text-9xl group-hover:rotate-12 transition-transform"><HiClipboardDocumentList /></div>
                                    <h3 className="font-bold text-lg text-black/70 uppercase">Aktif Kulüp</h3>
                                    <p className="text-5xl font-black mt-2 relative z-10">{activeClubs.length}</p>
                                    <div className="mt-4 flex items-center gap-2 font-bold text-sm bg-white/50 w-fit px-2 py-1 rounded border-2 border-black">
                                        <span className="text-gray-800">2 yeni başvuru</span>
                                    </div>
                                </div>

                                {/* Etkinlik Kartı */}
                                <div className="bg-pink-300 border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:-translate-y-1 transition-transform">
                                    <div className="absolute -right-6 -top-6 text-pink-400/50 text-9xl group-hover:rotate-12 transition-transform"><HiCalendarDays /></div>
                                    <h3 className="font-bold text-lg text-black/70 uppercase">Etkinlikler</h3>
                                    <p className="text-5xl font-black mt-2 relative z-10">{totalEvents}</p>
                                    <div className="mt-4 flex items-center gap-2 font-bold text-sm bg-white/50 w-fit px-2 py-1 rounded border-2 border-black">
                                        <span className="text-pink-800">{eventRequests.length} onay bekliyor</span>
                                    </div>
                                </div>

                                {/* Uyarı Kartı */}
                                <div className="bg-red-300 border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:-translate-y-1 transition-transform">
                                    <div className="absolute -right-6 -top-6 text-red-400/50 text-9xl group-hover:rotate-12 transition-transform"><HiExclamationTriangle /></div>
                                    <h3 className="font-bold text-lg text-black/70 uppercase">Raporlar</h3>
                                    <p className="text-5xl font-black mt-2 relative z-10">{reports.length}</p>
                                    <div className="mt-4 flex items-center gap-2 font-bold text-sm bg-white/50 w-fit px-2 py-1 rounded border-2 border-black">
                                        <span className="text-red-900 font-black">Acil müdahale gerek</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                                    <h3 className="text-2xl font-black mb-6 flex items-center gap-2 uppercase">
                                        <span className="bg-[#fbca1f] px-2 border-2 border-black">TOP 3</span> Popüler Kulüp
                                    </h3>
                                    <div className="space-y-4">
                                        {[...activeClubs].sort((a, b) => b.members - a.members).slice(0, 3).map((club, idx) => (
                                            <div key={club.id} className="flex items-center gap-4 p-3 border-b-2 border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                                <div className="font-black text-4xl text-gray-300 w-8">0{idx + 1}</div>
                                                <img src={(club as any).avatar} alt={club.name} className="w-12 h-12 rounded-full border-2 border-black bg-white object-cover" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-lg">{club.name}</h4>
                                                    <p className="text-sm text-gray-500 font-bold">{club.members.toLocaleString()} Üye</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-black text-xl">{club.members}</div>
                                                    <div className="text-xs text-gray-400 font-bold">Üye</div>
                                                </div>
                                                <div className="w-24 h-2 bg-gray-200 rounded-full border border-black overflow-hidden">
                                                    <div className="h-full bg-green-400" style={{ width: `${(club.members / 250) * 100}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-black text-green-400 rounded-2xl border-4 border-gray-800 p-4 font-mono text-sm shadow-[8px_8px_0px_0px_rgba(100,100,100,0.5)] flex flex-col">
                                    <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-2">
                                        <span className="flex items-center gap-2 font-bold"><HiCommandLine /> SYSTEM_LOGS</span>
                                        <div className="flex gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                                    </div>
                                    <div className="flex-1 overflow-hidden space-y-2">
                                        {systemLogs.slice(0, 5).map(log => (
                                            <div key={log.id} className="truncate hover:text-white cursor-default">
                                                <span className="text-gray-500">[{log.time}]</span> <span className="text-yellow-500">{log.action}</span>
                                            </div>
                                        ))}
                                        <div className="text-gray-500 animate-pulse pt-2">_waiting for new events...</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-100 border-4 border-black rounded-2xl p-6">
                                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <HiBolt className="text-[#fbca1f] text-2xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]" /> Hızlı İşlemler
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <button onClick={() => setActiveTab('pending-clubs')} className="bg-white border-2 border-black p-4 rounded-xl font-bold hover:bg-black hover:text-white hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">📋 Başvuruları Aç</button>
                                    <button onClick={() => setActiveTab('reports')} className="bg-white border-2 border-black p-4 rounded-xl font-bold hover:bg-red-600 hover:text-white hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">🚨 Şikayetleri Gör</button>
                                    <button onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })} className="bg-white border-2 border-black p-4 rounded-xl font-bold hover:bg-purple-600 hover:text-white hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">🛠️ Bakım Modu</button>
                                    <button onClick={() => alert("Sistem önbelleği temizlendi! 🧹")} className="bg-white border-2 border-black p-4 rounded-xl font-bold hover:bg-blue-600 hover:text-white hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2"><HiCpuChip className="text-lg" /> Önbelleği Temizle</button>
                                </div>
                            </div>
                        </div>
                    )}
{/* 2. ONAY BEKLEYEN KULÜPLER (REVİZE: DETAYLI TARİH + ARAMA BUTONU) */}
{activeTab === 'pending-clubs' && (
    <div className="space-y-8 animate-fade-in">
        
        {/* ÜST BÖLÜM */}
        <div className="flex flex-col gap-6 border-b-4 border-black pb-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-4xl font-black uppercase flex items-center gap-3">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            {pendingClubs.length}
                        </span>
                        BAŞVURU MERKEZİ
                    </h2>
                    <p className="text-gray-600 font-bold mt-2 text-lg">Yeni kulüp taleplerini incele ve karara bağla.</p>
                </div>
                
                {pendingClubs.length > 0 ? (
                    <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-xl border-2 border-blue-200">
                        <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div>
                        <span className="font-black text-blue-800 text-sm uppercase">İnceleme Bekliyor</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-xl border-2 border-green-200">
                        <HiCheckBadge className="text-green-600 text-xl" />
                        <span className="font-black text-green-800 text-sm uppercase">Tüm İşlemler Tamam</span>
                    </div>
                )}
            </div>

            {/* Arama Barı */}
            {pendingClubs.length > 0 && (
                <div className="bg-gray-100 p-4 rounded-2xl border-2 border-black flex flex-col md:flex-row gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="relative flex-1 flex gap-2">
                        <div className="relative w-full">
                            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input 
                                type="text" 
                                placeholder="Kulüp adı, başkan veya kategori ara..." 
                                className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-xl font-bold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-500 text-gray-800"
                            />
                        </div>
                        {/* YENİ: ARA BUTONU */}
                        <button className="px-4 py-3 bg-[#fbca1f] border-2 border-black rounded-xl font-bold hover:bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
                            <HiMagnifyingGlass className="text-xl text-black" />
                        </button>
                    </div>
                    
                    <button className="px-6 py-3 bg-white border-2 border-black rounded-xl font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none hover:bg-yellow-50 transition-all flex items-center gap-2">
                        <HiFunnel /> Filtrele
                    </button>
                </div>
            )}
        </div>

        {/* LİSTE */}
        {pendingClubs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 border-4 border-dashed border-gray-300 rounded-3xl bg-gray-50">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-green-200">🎉</div>
                <h3 className="text-2xl font-black text-gray-400 uppercase">Harika İş!</h3>
                <p className="text-gray-400 font-bold mt-2">Şu an bekleyen başvuru yok.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-8">
                {pendingClubs.map(club => (
                    <div key={club.id} className="group relative">
                        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-4 border-black bg-blue-500"></div>
                        
                        <div className="relative bg-white border-4 border-black rounded-2xl overflow-hidden flex flex-col lg:flex-row hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200">
                            
                            {/* SOL TARAF */}
                            <div className="lg:w-1/3 bg-blue-50 p-6 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-between">
                                <div>
                                    {/* Kategori ve Tarih */}
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="bg-black text-white px-3 py-1 text-xs font-black rounded uppercase flex items-center gap-1 shadow-sm">
                                            <HiTag className="text-[#fbca1f]" /> {club.category}
                                        </span>

                                        {/* TARİH KUTUSU */}
                                        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border-2 border-blue-200 shadow-sm cursor-help" title={new Date(club.date).toLocaleString('tr-TR')}>
                                            <div className="p-1 bg-blue-100 rounded-md">
                                                <HiClock className="text-lg text-blue-600" />
                                            </div>
                                            <div className="flex flex-col leading-tight">
                                                <span className="font-black text-sm text-blue-900">
                                                    {formatTimeAgo(club.date)}
                                                </span>
                                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">
                                                    {new Date(club.date).toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logo ve İsim */}
                                    <div className="text-center mb-6">
                                        <div className="w-24 h-24 mx-auto bg-white border-4 border-black rounded-full flex items-center justify-center text-5xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
                                            🎓
                                        </div>
                                        <h3 className="text-2xl font-black leading-tight mb-1">{club.name}</h3>
                                        <p className="text-sm font-bold text-gray-500">Başvuru ID: #{202500 + club.id}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-white p-3 rounded-xl border-2 border-black shadow-sm flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl border-2 border-gray-200">👤</div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase">BAŞKAN ADAYI</p>
                                            <p className="font-bold text-sm leading-none">{club.head}</p>
                                            <p className="text-xs text-blue-600 font-bold">{club.headHandle}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border-2 border-black shadow-sm flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl border-2 border-gray-200">📧</div>
                                        <div className="overflow-hidden">
                                            <p className="text-[10px] font-black text-gray-400 uppercase">İLETİŞİM</p>
                                            <p className="font-bold text-sm truncate">{club.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SAĞ TARAF */}
                            <div className="flex-1 p-8 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-black text-xl mb-4 flex items-center gap-2 border-b-2 border-gray-100 pb-2">
                                        <HiClipboardDocumentList className="text-blue-600" /> 
                                        KULÜP VİZYONU & AMACI
                                    </h4>
                                    <div className="bg-[#fbca1f]/10 p-6 rounded-2xl border-2 border-dashed border-[#fbca1f] relative">
                                        <span className="absolute -top-3 -left-3 text-4xl text-[#fbca1f]">❝</span>
                                        <p className="font-medium text-lg text-gray-800 italic leading-relaxed z-10 relative">
                                            {club.desc}
                                        </p>
                                        <span className="absolute -bottom-3 -right-3 text-4xl text-[#fbca1f] rotate-180">❝</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-end pt-8 mt-4 border-t-2 border-gray-100">
                                    <button 
                                        onClick={() => handleClubReject(club.id)} 
                                        className="px-6 py-3 rounded-xl border-2 border-black font-black text-red-600 hover:bg-red-50 hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,0.2)] transition-all flex items-center justify-center gap-2"
                                    >
                                        <HiXMark className="text-xl" /> REDDET
                                    </button>
                                    <button 
                                        onClick={() => handleClubApprove(club.id)} 
                                        className="px-8 py-3 rounded-xl border-2 border-black bg-[#fbca1f] font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 active:bg-[#e0b20d]"
                                    >
                                        <HiCheck className="text-xl" /> ONAYLA & AKTİF ET
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
)}

{/* 3. TÜM KULÜPLER (REVİZE EDİLMİŞ - ARAMA BUTONLU) */}
{activeTab === 'all-clubs' && (
    <div className="space-y-8 animate-fade-in">
        
        {/* ÜST PANEL: Başlık, İstatistik ve Arama */}
        <div className="flex flex-col gap-6 border-b-4 border-black pb-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-4xl font-black uppercase flex items-center gap-3">
                        <span className="bg-[#fbca1f] text-black border-2 border-black px-3 py-1 rounded-lg text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            {activeClubs.length}
                        </span>
                        KULÜP YÖNETİMİ
                    </h2>
                    <p className="text-gray-600 font-bold mt-2 text-lg">Kampüs topluluklarını yönet ve denetle.</p>
                </div>
                
                {/* Hızlı İstatistikler */}
                <div className="flex gap-3">
                    <div className="bg-black text-white px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(100,100,100,0.5)]">
                        <div className="text-xs font-bold text-gray-400 uppercase">Toplam Üye</div>
                        <div className="text-xl font-black">{totalMembers.toLocaleString()}</div>
                    </div>
                    <div className="bg-white text-black px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="text-xs font-bold text-gray-500 uppercase">Etkinlikler</div>
                        <div className="text-xl font-black">{totalEvents}</div>
                    </div>
                </div>
            </div>

            {/* Arama ve Filtreleme Barı */}
            <div className="bg-gray-100 p-4 rounded-2xl border-2 border-black flex flex-col md:flex-row gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative flex-1 flex gap-2">
                    <div className="relative w-full">
                        <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        <input 
                            type="text" 
                            placeholder="Kulüp adı, kategori veya başkan ara..." 
                            className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-xl font-bold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-500 text-gray-800"
                        />
                    </div>
                    {/* YENİ: ARA BUTONU */}
                    <button className="px-4 py-3 bg-[#fbca1f] border-2 border-black rounded-xl font-bold hover:bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
                        <HiMagnifyingGlass className="text-xl text-black" />
                    </button>
                </div>
                
                <div className="flex gap-2">
                    <select className="px-4 py-3 bg-white border-2 border-black rounded-xl font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-yellow-50 transition-all outline-none appearance-none">
                        <option>Tüm Kategoriler</option>
                        <option>Teknoloji</option>
                        <option>Sanat</option>
                        <option>Spor</option>
                        <option>Sosyal</option>
                    </select>
                    {/* DÜZELTME: Dışa Aktar */}
                    <button className="px-6 py-3 bg-black text-white border-2 border-black rounded-xl font-bold shadow-[2px_2px_0px_0px_rgba(100,100,100,1)] hover:bg-gray-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2">
                        <HiArrowDownTray /> <span className="hidden md:inline">Dışa Aktar</span>
                    </button>
                </div>
            </div>
        </div>

        {/* KULÜP LİSTESİ TABLOSU */}
        <div className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <table className="w-full text-left border-collapse">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="p-4 font-black w-16 text-center">ID</th>
                        <th className="p-4 font-black">Kulüp Kimliği</th>
                        <th className="p-4 font-black hidden md:table-cell">Başkan & Yönetim</th>
                        <th className="p-4 font-black text-center hidden lg:table-cell">İstatistik</th>
                        <th className="p-4 font-black text-center">Durum</th>
                        <th className="p-4 font-black text-right">İşlem</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-100">
                    {activeClubs.map((club) => (
                        <tr key={club.id} className="hover:bg-yellow-50/50 transition-colors group">
                            
                            {/* 1. ID */}
                            <td className="p-4 text-center font-mono text-gray-400 font-bold">
                                #{club.id}
                            </td>

                            {/* 2. KULÜP KİMLİĞİ */}
                            <td className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl border-2 border-black overflow-hidden bg-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                        <img src={(club as any).avatar} alt={club.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-black text-lg leading-tight mb-1">{club.name}</div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-xs font-bold bg-gray-200 px-2 py-0.5 rounded border border-gray-300 flex items-center gap-1">
                                                <HiTag className="text-gray-500" /> {club.category}
                                            </span>
                                            <span className="text-xs text-gray-500 font-bold">{club.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* 3. BAŞKAN & YÖNETİM */}
                            <td className="p-4 hidden md:table-cell">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-black flex items-center justify-center text-lg shrink-0">
                                        🎓
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{club.head}</div>
                                        <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-fit">
                                            {club.headHandle}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* 4. İSTATİSTİK (ÜYE & ETKİNLİK) */}
                            <td className="p-4 hidden lg:table-cell text-center">
                                <div className="flex justify-center gap-4">
                                    <div className="text-center">
                                        <div className="font-black text-lg">{club.members}</div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">Üye</div>
                                    </div>
                                    <div className="w-px h-8 bg-gray-300"></div>
                                    <div className="text-center">
                                        <div className="font-black text-lg">{(club as any).events}</div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">Etkinlik</div>
                                    </div>
                                </div>
                            </td>

                            {/* 5. DURUM */}
                            <td className="p-4 text-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-black border-2 border-black uppercase inline-flex items-center gap-1 ${club.status === 'Aktif' ? 'bg-green-400 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-gray-300 text-gray-600'}`}>
                                    {club.status === 'Aktif' ? <HiCheckBadge /> : <HiLockClosed />}
                                    {club.status}
                                </span>
                            </td>

                            {/* 6. İŞLEM */}
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button className="p-2 bg-white border-2 border-black rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors" title="Düzenle">
                                        <HiCog6Tooth className="text-xl" />
                                    </button>
                                    <button 
                                        onClick={() => handleClubDelete(club.id)} 
                                        className="p-2 bg-white border-2 border-black rounded-lg text-red-500 hover:text-white hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all" 
                                        title="Sil"
                                    >
                                        <HiTrash className="text-xl" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)}


{/* 4. ETKİNLİK İSTEKLERİ (REVİZE EDİLMİŞ - ARAMA BUTONLU) */}
{activeTab === 'events' && (
    <div className="space-y-8 animate-fade-in">
        
        {/* ÜST PANEL */}
        <div className="flex flex-col gap-6 border-b-4 border-black pb-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-4xl font-black uppercase flex items-center gap-3">
                        <span className="bg-pink-500 text-white px-3 py-1 rounded-lg text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            {eventRequests.length}
                        </span>
                        ETKİNLİK DENETİM
                    </h2>
                    <p className="text-gray-600 font-bold mt-2 text-lg">Takvim onayı bekleyen etkinlik talepleri.</p>
                </div>
                
                {/* Durum */}
                {eventRequests.length > 0 ? (
                    <div className="flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-xl border-2 border-pink-200">
                        <HiCalendarDays className="text-pink-600 text-xl" />
                        <span className="font-black text-pink-800 text-sm uppercase">Takvim Onayı Bekleniyor</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-xl border-2 border-green-200">
                        <HiCheckBadge className="text-green-600 text-xl" />
                        <span className="font-black text-green-800 text-sm uppercase">Takvim Güncel</span>
                    </div>
                )}
            </div>

            {/* Arama Barı */}
            {eventRequests.length > 0 && (
                <div className="bg-gray-100 p-4 rounded-2xl border-2 border-black flex flex-col md:flex-row gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="relative flex-1 flex gap-2">
                        <div className="relative w-full">
                            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input 
                                type="text" 
                                placeholder="Etkinlik adı, kulüp veya yer ara..." 
                                className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-xl font-bold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-500 text-gray-800"
                            />
                        </div>
                        {/* YENİ: ARA BUTONU */}
                        <button className="px-4 py-3 bg-[#fbca1f] border-2 border-black rounded-xl font-bold hover:bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
                            <HiMagnifyingGlass className="text-xl text-black" />
                        </button>
                    </div>
                    
                    <button className="px-6 py-3 bg-white border-2 border-black rounded-xl font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none hover:bg-yellow-50 transition-all flex items-center gap-2">
                        <HiFunnel /> Filtrele
                    </button>
                </div>
            )}
        </div>

        {/* ETKİNLİK LİSTESİ */}
        {eventRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 border-4 border-dashed border-gray-300 rounded-3xl bg-gray-50">
                <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-pink-200">📅</div>
                <h3 className="text-2xl font-black text-gray-400 uppercase">Takvim Tertemiz!</h3>
                <p className="text-gray-400 font-bold mt-2">Şu an onay bekleyen etkinlik yok.</p>
            </div>
        ) : (
            <div className="grid gap-8">
                {eventRequests.map(event => (
                    <div key={event.id} className="relative group">
                        {/* Gölge Kart */}
                        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-4 border-black bg-pink-500"></div>

                        {/* Ana Kart (Bilet Görünümü) */}
                        <div className="relative bg-white border-4 border-black rounded-2xl overflow-hidden flex flex-col lg:flex-row hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200">
                            
                            {/* SOL: Afiş ve Kulüp (Bilet Koçanı) */}
                            <div className="lg:w-1/4 bg-gray-900 text-white relative flex flex-col">
                                <div className="h-48 lg:h-full relative overflow-hidden group-hover:opacity-90 transition-opacity">
                                    <img src={event.poster} alt="Event Poster" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-black text-xs border-2 border-black">
                                                {event.club.charAt(0)}
                                            </div>
                                            <span className="font-bold text-sm truncate">{event.club}</span>
                                        </div>
                                        <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                            <HiEnvelope /> {event.email}
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 bg-[#fbca1f] text-black px-2 py-1 text-[10px] font-black uppercase rounded transform rotate-3">
                                        Önizleme
                                    </div>
                                </div>
                                
                                {/* Tırtıklı Kenar Efekti (CSS ile yapılabilir ama basit tutuyoruz) */}
                                <div className="hidden lg:block absolute right-[-8px] top-0 bottom-0 w-4 bg-transparent border-l-4 border-dashed border-white z-10"></div>
                            </div>

                            {/* SAĞ: Detaylar ve Onay */}
                            <div className="flex-1 p-6 flex flex-col justify-between bg-white relative">
                                {/* Delik Efekti (Sol üst ve alt) */}
                                <div className="hidden lg:block absolute -left-3 top-1/2 w-6 h-6 bg-[#fbca1f] rounded-full border-4 border-black z-20"></div>

                                <div>
                                    {/* Üst Satır: Tip ve Kapasite */}
                                    <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                                        <span className="bg-[#fbca1f] border-2 border-black px-3 py-1 text-xs font-black uppercase rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            {event.type}
                                        </span>
                                        <div className="flex items-center gap-2 font-bold text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded border-2 border-gray-200">
                                            <HiTicket className="text-pink-500" /> 
                                            {event.capacity} Kişilik Yer
                                        </div>
                                    </div>

                                    {/* Başlık ve Açıklama */}
                                    <h3 className="text-2xl font-black mb-3 leading-tight">{event.title}</h3>
                                    <p className="text-gray-600 font-medium italic border-l-4 border-pink-200 pl-4 mb-6">
                                        "{event.desc}"
                                    </p>

                                    {/* Tarih ve Yer Bilgileri */}
                                    <div className="flex flex-wrap gap-4 text-sm font-bold bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                                        <div className="flex items-center gap-2 min-w-[140px]">
                                            <div className="p-2 bg-white border border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                <HiCalendarDays className="text-lg" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 uppercase">TARİH</span>
                                                <span>{event.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 min-w-[140px]">
                                            <div className="p-2 bg-white border border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                <HiClock className="text-lg" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 uppercase">SAAT</span>
                                                <span>{event.time}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 w-full lg:w-auto">
                                            <div className="p-2 bg-white border border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                <HiMapPin className="text-lg text-red-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 uppercase">KONUM</span>
                                                <span className="text-blue-600 underline">{event.loc}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Aksiyon Butonları */}
                                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6 pt-6 border-t-2 border-dashed border-gray-300">
                                    <button 
                                        onClick={() => handleEventAction(event.id, false)} 
                                        className="px-6 py-3 bg-white border-2 border-black rounded-xl font-black text-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
                                    >
                                        <HiXMark className="text-xl" /> REDDET
                                    </button>
                                    <button 
                                        onClick={() => handleEventAction(event.id, true)} 
                                        className="px-8 py-3 bg-black border-2 border-black rounded-xl font-black text-green-400 shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(100,100,100,1)] transition-all flex items-center justify-center gap-2 active:bg-gray-900"
                                    >
                                        <HiCheck className="text-xl" /> TAKVİME EKLE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
)}                  


{/* 5. KULLANICI YÖNETİMİ (REVİZE SON HALİ - ARAMA BUTONLU) */}
{activeTab === 'users' && (
    <div className="space-y-8 animate-fade-in">
        
        {/* ÜST PANEL: Başlık ve Arama */}
        <div className="flex flex-col gap-6 border-b-4 border-black pb-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-black uppercase flex items-center gap-3">
                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            {users.length}
                        </span>
                        KULLANICI LİSTESİ
                    </h2>
                    <p className="text-gray-600 font-bold mt-2 text-sm">Sisteme kayıtlı tüm hesapların yönetimi.</p>
                </div>
                
                {/* Hızlı İstatistik (Opsiyonel) */}
                <div className="flex items-center gap-2 text-sm font-bold bg-gray-100 px-3 py-2 rounded-lg border-2 border-gray-200">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div> Aktif: {users.filter(u => u.status === 'active').length}
                    <div className="w-px h-4 bg-gray-400 mx-2"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500"></div> Yasaklı: {users.filter(u => u.status !== 'active').length}
                </div>
            </div>

            {/* Arama ve Araç Barı */}
            <div className="bg-gray-100 p-4 rounded-2xl border-2 border-black flex flex-col md:flex-row gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative flex-1 flex gap-2">
                    <div className="relative w-full">
                        <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        <input 
                            type="text" 
                            placeholder="Kullanıcı adı, e-posta veya bölüm ara..." 
                            className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-xl font-bold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-500 text-gray-800"
                        />
                    </div>
                    {/* YENİ: ARA BUTONU */}
                    <button className="px-4 py-3 bg-[#fbca1f] border-2 border-black rounded-xl font-bold hover:bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
                        <HiMagnifyingGlass className="text-xl text-black" />
                    </button>
                </div>
                
                {/* Buton Grubu */}
                <div className="flex gap-2">
                    <button className="px-6 py-3 bg-white border-2 border-black rounded-xl font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-50 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center gap-2 text-gray-800">
                        <HiFunnel className="text-lg" /> Filtrele
                    </button>
                    {/* DÜZELTME: Dışa Aktar */}
                    <button className="px-6 py-3 bg-black text-white border-2 border-black rounded-xl font-bold shadow-[2px_2px_0px_0px_rgba(100,100,100,1)] hover:bg-gray-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2">
                        <HiArrowDownTray className="text-lg" /> Dışa Aktar
                    </button>
                </div>
            </div>
        </div>

        {/* LİSTE TABLOSU */}
        <div className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <table className="w-full text-left border-collapse">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="p-4 font-black w-16 text-center">#</th>
                        <th className="p-4 font-black">Kullanıcı Profili</th>
                        <th className="p-4 font-black hidden md:table-cell">İletişim & Bölüm</th>
                        <th className="p-4 font-black hidden lg:table-cell">Kayıt Tarihi</th>
                        <th className="p-4 font-black text-center w-32 border-l border-gray-700">Durum</th>
                        <th className="p-4 font-black text-center w-32 border-l border-gray-700">İşlem</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-100">
                    {[...users].sort((a, b) => a.name.localeCompare(b.name)).map((user, index) => (
                        <tr key={user.id} className="hover:bg-indigo-50 transition-colors group">
                            
                            {/* SIRA NO */}
                            <td className="p-4 text-center font-black text-gray-300 group-hover:text-indigo-300">
                                {index + 1}
                            </td>

                            {/* KULLANICI PROFİLİ */}
                            <td className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-black object-cover bg-white" />
                                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="font-black text-lg leading-tight">{user.name}</div>
                                            {user.reports > 0 && (
                                                <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded border border-red-200 font-bold animate-pulse" title={`${user.reports} şikayet`}>
                                                    ⚠ {user.reports}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm font-bold text-indigo-600">{user.handle}</div>
                                    </div>
                                </div>
                            </td>

                            {/* İLETİŞİM */}
                            <td className="p-4 hidden md:table-cell">
                                <div className="font-bold text-gray-800 text-sm flex items-center gap-1">
                                    <HiEnvelope className="text-gray-400" /> {user.email}
                                </div>
                                <div className="text-xs font-bold text-gray-500 uppercase mt-1 bg-gray-100 w-fit px-2 py-0.5 rounded border border-gray-200">
                                    {user.department}
                                </div>
                            </td>

                            {/* TARİH */}
                            <td className="p-4 hidden lg:table-cell">
                                <div className="flex items-center gap-2">
                                    <HiCalendarDays className="text-gray-400" />
                                    <span className="font-bold text-sm text-gray-600">{user.joinDate}</span>
                                </div>
                            </td>

                            {/* SÜTUN 5: DURUM */}
                            <td className="p-4 text-center border-l-2 border-gray-100">
                                <span className={`px-3 py-1 rounded-full text-xs font-black border-2 border-black uppercase inline-flex items-center gap-1 ${user.status === 'active' ? 'bg-green-400 text-black' : 'bg-red-500 text-white'}`}>
                                    {user.status === 'active' ? 'AKTİF' : 'YASAKLI'}
                                </span>
                            </td>

                            {/* SÜTUN 6: İŞLEM */}
                            <td className="p-4 text-center border-l-2 border-gray-100">
                                {user.status === 'active' ? (
                                    <button 
                                        onClick={() => handleUserBan(user.id)} 
                                        className="w-full py-2 bg-white border-2 border-red-200 text-red-600 rounded-lg font-bold hover:bg-red-600 hover:text-white hover:border-black transition-all flex items-center justify-center gap-2 text-xs shadow-sm hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                                        title="Hesabı süresiz dondur"
                                    >
                                        <HiLockClosed className="text-sm" /> DONDUR
                                    </button>
                                ) : (
                                    <button 
                                        className="w-full py-2 bg-gray-100 border-2 border-gray-200 text-gray-400 rounded-lg font-bold cursor-not-allowed flex items-center justify-center gap-2 text-xs"
                                        disabled
                                    >
                                        <HiXMark className="text-sm" /> İŞLEM YOK
                                    </button>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)}


{/* 6. RAPOR MERKEZİ (SON HALİ - ARAMA BUTONLU) */}
{activeTab === 'reports' && (
    <div className="space-y-8 animate-fade-in">
        
        {/* ÜST BÖLÜM: BAŞLIK, İSTATİSTİK VE ARAMA PANELİ */}
        <div className="flex flex-col gap-6 border-b-4 border-black pb-8">
            
            {/* 1. Satır: Başlık ve Risk Göstergeleri */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="text-4xl font-black uppercase flex items-center gap-3">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">{reports.length}</span>
                        AÇIK VAKA
                    </h2>
                    <p className="text-gray-600 font-bold mt-2 text-lg">Disiplin ve şikayet yönetim merkezi.</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 bg-red-100 px-3 py-1.5 rounded-lg border-2 border-red-200">
                        <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
                        <span className="font-black text-red-800 text-xs uppercase">Yüksek</span>
                    </div>
                    <div className="flex items-center gap-2 bg-orange-100 px-3 py-1.5 rounded-lg border-2 border-orange-200">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="font-black text-orange-800 text-xs uppercase">Orta</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-lg border-2 border-blue-200">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="font-black text-blue-800 text-xs uppercase">Düşük</span>
                    </div>
                </div>
            </div>

            {/* 2. Satır: ARAMA VE FİLTRELEME BAR */}
            <div className="bg-gray-100 p-4 rounded-2xl border-2 border-black flex flex-col md:flex-row gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative flex-1 flex gap-2">
                    <div className="relative w-full">
                        <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        <input 
                            type="text" 
                            placeholder="Vaka No (#ID), Şikayetçi veya Şüpheli ara..." 
                            className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-xl font-bold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-500 text-gray-800"
                        />
                    </div>
                    {/* YENİ: ARA BUTONU */}
                    <button className="px-4 py-3 bg-[#fbca1f] border-2 border-black rounded-xl font-bold hover:bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
                        <HiMagnifyingGlass className="text-xl text-black" />
                    </button>
                </div>
                
                {/* Butonlar */}
                <div className="flex gap-2">
                    <button className="px-6 py-3 bg-white border-2 border-black rounded-xl font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none hover:bg-yellow-50 transition-all flex items-center gap-2">
                        <HiFunnel /> <span className="hidden md:inline">Filtrele</span>
                    </button>
                    <button className="px-6 py-3 bg-black text-white border-2 border-black rounded-xl font-bold shadow-[2px_2px_0px_0px_rgba(100,100,100,1)] hover:bg-gray-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2">
                        <HiArrowDownTray /> <span className="hidden md:inline">Dışa Aktar</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Vaka Listesi */}
        <div className="grid gap-8">
            {reports.map((report) => (
                <div key={report.id} className="relative group">
                    {/* Arkaplan Gölge Kartı */}
                    <div className={`absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-4 border-black ${report.severity === 'high' ? 'bg-red-600' : report.severity === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>

                    {/* Ana Kart */}
                    <div className="relative bg-white border-4 border-black rounded-2xl overflow-hidden hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200">

                        {/* Kart Başlığı */}
                        <div className="bg-gray-50 border-b-4 border-black p-4 flex flex-wrap justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                                <span className="font-black text-xl text-gray-400">#CASE-{202500 + report.id}</span>
                                <span className={`px-3 py-1 rounded text-xs font-black uppercase border-2 border-black flex items-center gap-1 ${report.severity === 'high' ? 'bg-red-100 text-red-700' : report.severity === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                    <HiFlag /> {report.type}
                                </span>
                            </div>
                            
                            {/* DİNAMİK VE DETAYLI TARİH GÖSTERİMİ */}
                            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border-2 border-gray-200 shadow-sm cursor-help" title={new Date(report.timestamp).toLocaleString('tr-TR')}>
                                <div className="p-1.5 bg-gray-100 rounded-md">
                                    <HiClock className="text-lg text-black" />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="font-black text-sm text-gray-800">
                                        {formatTimeAgo(report.timestamp)}
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                                        {new Date(report.timestamp).toLocaleString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Kart İçeriği */}
                        <div className="p-6 flex flex-col lg:flex-row gap-8">
                            
                            {/* Sol: Taraflar */}
                            <div className="lg:w-1/3 flex flex-col justify-center gap-6 border-r-0 lg:border-r-4 border-gray-100 lg:pr-6">
                                {/* Şikayetçi */}
                                <div className="flex items-center gap-4 bg-blue-50 p-3 rounded-xl border-2 border-blue-100">
                                    <img src={report.reporter.avatar} className="w-12 h-12 rounded-full border-2 border-black bg-white object-cover" />
                                    <div>
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">MÜŞTEKİ</p>
                                        <p className="font-black text-base leading-none">{report.reporter.name}</p>
                                        <p className="text-xs font-bold text-gray-500 mt-0.5">{report.reporter.handle}</p>
                                    </div>
                                </div>
                                {/* Ok */}
                                <div className="flex justify-center -my-2 text-gray-300 text-2xl rotate-90 lg:rotate-0"><HiArrowDownTray className="lg:-rotate-90" /></div>
                                {/* Şüpheli */}
                                <div className="flex items-center gap-4 bg-red-50 p-3 rounded-xl border-2 border-red-100">
                                    <img src={report.reported.avatar} className="w-12 h-12 rounded-full border-2 border-black bg-white object-cover grayscale" />
                                    <div>
                                        <p className="text-[10px] font-black text-red-600 uppercase tracking-wider">ŞÜPHELİ</p>
                                        <p className="font-black text-base leading-none">{report.reported.name}</p>
                                        <p className="text-xs font-bold text-gray-500 mt-0.5">{report.reported.handle}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Sağ: Kanıt ve Aksiyon */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <HiChatBubbleBottomCenterText className="text-xl text-black" />
                                        <span className="font-black uppercase text-sm">Tespit Edilen İçerik / Kanıt</span>
                                    </div>
                                    <div className="bg-[#fbca1f]/10 p-5 rounded-xl border-2 border-dashed border-[#fbca1f] relative group-hover:bg-[#fbca1f]/20 transition-colors">
                                        <HiExclamationTriangle className="absolute top-3 right-3 text-[#fbca1f] text-2xl opacity-50" />
                                        <p className="font-bold text-lg text-gray-800 italic">"{report.content}"</p>
                                        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-gray-400">
                                            <HiMapPin /> Konum: {report.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t-2 border-gray-100 flex flex-wrap justify-end gap-3">
                                    <button onClick={() => handleReportAction(report.id, 'dismiss')} className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 hover:text-black transition-colors">Yoksay</button>
                                    <button onClick={() => handleReportAction(report.id, 'delete')} className="px-5 py-2.5 rounded-xl border-2 border-black font-bold hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-2"><HiTrash className="text-lg" /> İçeriği Sil</button>
                                    <button onClick={() => handleReportAction(report.id, 'ban')} className="px-5 py-2.5 rounded-xl border-2 border-black bg-red-600 text-white font-black hover:bg-red-700 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-2"><HiBolt className="text-lg" /> HESABI DONDUR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)}

                    {/* 7. SİSTEM LOGLARI */}
                    {activeTab === 'logs' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                                <div>
                                    <h2 className="text-3xl font-black uppercase flex items-center gap-2"><HiCommandLine className="text-black" /> Sistem Denetim Kayıtları</h2>
                                    <p className="text-gray-500 font-bold text-sm">Tüm yönetici işlemleri IP adresleri ile birlikte kayıt altındadır.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="bg-white border-2 border-black px-4 py-2 font-bold rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex items-center gap-2 text-sm hover:bg-gray-50"><HiFunnel /> Filtrele</button>
                                    <button className="bg-black text-white border-2 border-black px-4 py-2 font-bold rounded-lg shadow-[2px_2px_0px_0px_rgba(100,100,100,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex items-center gap-2 text-sm hover:bg-gray-800"><HiArrowDownTray /> CSV İndir</button>
                                </div>
                            </div>
                            <div className="bg-[#1e1e1e] rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-sm">
                                <div className="bg-[#2d2d2d] p-3 border-b border-gray-700 flex items-center justify-between">
                                    <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                                    <div className="flex items-center gap-2 bg-[#3e3e3e] px-3 py-1 rounded text-gray-400 text-xs w-64"><HiMagnifyingGlass /><input type="text" placeholder="Search logs..." className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500" /></div>
                                    <div className="text-gray-500 text-xs font-bold">v2.4.1-stable</div>
                                </div>
                                <div className="grid grid-cols-12 gap-4 p-4 text-gray-500 font-bold border-b border-gray-700 bg-[#252526]">
                                    <div className="col-span-2">TIMESTAMP</div><div className="col-span-2">ADMIN / IP</div><div className="col-span-1">ACTION</div><div className="col-span-2">MODULE / TARGET</div><div className="col-span-4">DESCRIPTION</div><div className="col-span-1 text-center">STATUS</div>
                                </div>
                                <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                                    {systemLogs.map((log, idx) => (
                                        <div key={log.id} className={`grid grid-cols-12 gap-4 p-3 border-b border-gray-800 hover:bg-[#2a2d2e] transition-colors items-center group ${idx % 2 === 0 ? 'bg-[#1e1e1e]' : 'bg-[#1e1e1e]/50'}`}>
                                            <div className="col-span-2 text-gray-400 text-xs">{log.time}</div>
                                            <div className="col-span-2"><div className="text-yellow-400 font-bold">{log.admin}</div><div className="text-gray-600 text-xs">{log.ip}</div></div>
                                            <div className="col-span-1"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${log.action === 'DELETE' || log.action === 'LOGIN_FAIL' ? 'border-red-500 text-red-400 bg-red-500/10' : log.action === 'UPDATE' ? 'border-blue-500 text-blue-400 bg-blue-500/10' : log.action === 'CRON' ? 'border-purple-500 text-purple-400 bg-purple-500/10' : 'border-green-500 text-green-400 bg-green-500/10'}`}>{log.action}</span></div>
                                            <div className="col-span-2"><div className="text-gray-300 font-bold">{log.module}</div><div className="text-gray-500 text-xs truncate" title={log.target}>{log.target}</div></div>
                                            <div className="col-span-4 text-gray-400 truncate group-hover:text-white transition-colors" title={log.desc}><span className="text-gray-600 mr-2">$</span>{log.desc}</div>
                                            <div className="col-span-1 text-center">{log.status === 'success' ? <span className="text-green-500 text-xs">● 200 OK</span> : log.status === 'warning' ? <span className="text-orange-500 text-xs">● 403 FORBIDDEN</span> : <span className="text-red-500 text-xs">● 500 ERROR</span>}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 8. SİSTEM AYARLARI (GÜNCELLENMİŞ & MODÜLER) */}
                    {activeTab === 'settings' && (
                        <div className="space-y-8 animate-fade-in">
                            <h2 className="text-3xl font-black uppercase">Sistem Ayarları ve Kontroller</h2>

                            {/* MODÜL 1: İLETİŞİM VE DUYURU MERKEZİ */}
                            <div className="p-6 border-4 border-black bg-yellow-50 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                {/* 👇 DÜZELTME: HiSpeakerphone yerine HiChatBubbleLeftRight kullanıldı */}
                                <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><HiChatBubbleLeftRight /> İletişim ve Duyuru Merkezi</h3>

                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Sol: Hedef Seçimi */}
                                    <div className="w-full md:w-1/3 space-y-4">
                                        <label className="block font-bold text-gray-700">Duyuru Tipi</label>
                                        <div className="flex flex-col gap-2">
                                            <button onClick={() => setSettings({ ...settings, announcementType: 'global' })} className={`p-3 border-2 border-black rounded-lg font-bold text-left flex items-center justify-between transition-all ${settings.announcementType === 'global' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}>
                                                <span className="flex items-center gap-2"><HiMegaphone /> Global Duyuru</span>
                                                {settings.announcementType === 'global' && <HiCheck />}
                                            </button>
                                            <button onClick={() => setSettings({ ...settings, announcementType: 'club' })} className={`p-3 border-2 border-black rounded-lg font-bold text-left flex items-center justify-between transition-all ${settings.announcementType === 'club' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}>
                                                <span className="flex items-center gap-2"><HiClipboardDocumentList /> Kulübe Özel</span>
                                                {settings.announcementType === 'club' && <HiCheck />}
                                            </button>
                                            <button onClick={() => setSettings({ ...settings, announcementType: 'user' })} className={`p-3 border-2 border-black rounded-lg font-bold text-left flex items-center justify-between transition-all ${settings.announcementType === 'user' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}>
                                                <span className="flex items-center gap-2"><HiUserCircle /> Üyeye Özel (DM)</span>
                                                {settings.announcementType === 'user' && <HiCheck />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Sağ: Mesaj İçeriği */}
                                    <div className="w-full md:w-2/3 space-y-4">
                                        {settings.announcementType !== 'global' && (
                                            <div>
                                                <label className="block font-bold text-gray-700 mb-1">
                                                    {settings.announcementType === 'club' ? 'Kulüp Seçin / Yazın' : 'Kullanıcı Adı / Email'}
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder={settings.announcementType === 'club' ? "Örn: Yazılım Kulübü" : "Örn: @kullaniciadi"}
                                                    className="w-full border-4 border-black p-3 rounded-lg font-bold"
                                                    value={settings.announcementTarget}
                                                    onChange={(e) => setSettings({ ...settings, announcementTarget: e.target.value })}
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <label className="block font-bold text-gray-700 mb-1">Mesaj İçeriği</label>
                                            <textarea
                                                rows={4}
                                                className="w-full border-4 border-black p-3 rounded-lg font-bold resize-none"
                                                placeholder="Duyuru metnini buraya giriniz..."
                                                value={settings.announcementMsg}
                                                onChange={(e) => setSettings({ ...settings, announcementMsg: e.target.value })}
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-end">
                                            <button onClick={handleSendAnnouncement} className="px-8 py-3 bg-black text-white font-black text-lg border-2 border-black rounded-xl hover:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-2">
                                                GÖNDER <HiArrowRightOnRectangle className="rotate-180" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* MODÜL 2: SİSTEM KONTROLLERİ */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black border-b-4 border-black inline-block">🔒 Erişim ve Kontrol</h3>

                                    <div className="p-6 border-4 border-black bg-white rounded-xl flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div><h3 className="text-lg font-black">Bakım Modu</h3><p className="text-sm text-gray-500 font-bold">Siteyi sadece adminlere aç</p></div>
                                        <button onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })} className={`w-14 h-8 rounded-full border-4 border-black p-0.5 transition-colors ${settings.maintenanceMode ? 'bg-green-400' : 'bg-gray-200'}`}><div className={`w-5 h-5 rounded-full border-2 border-black bg-white transition-transform ${settings.maintenanceMode ? 'translate-x-6' : ''}`}></div></button>
                                    </div>

                                    <div className="p-6 border-4 border-black bg-white rounded-xl flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div><h3 className="text-lg font-black">Kayıtları Durdur</h3><p className="text-sm text-gray-500 font-bold">Yeni üye alımını kapat</p></div>
                                        <button onClick={() => setSettings({ ...settings, allowRegistration: !settings.allowRegistration })} className={`w-14 h-8 rounded-full border-4 border-black p-0.5 transition-colors ${!settings.allowRegistration ? 'bg-red-400' : 'bg-gray-200'}`}><div className={`w-5 h-5 rounded-full border-2 border-black bg-white transition-transform ${!settings.allowRegistration ? 'translate-x-6' : ''}`}></div></button>
                                    </div>

                                    {/* Akademik Dönem Ayarı */}
                                    <div className="p-6 border-4 border-black bg-blue-50 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <h3 className="text-lg font-black flex items-center gap-2 mb-2"><HiAcademicCap /> Akademik Dönem</h3>
                                        <p className="text-sm text-gray-500 font-bold mb-3">Arşivleme ve etkinlikler bu döneme göre işlenir.</p>
                                        <select
                                            className="w-full border-4 border-black p-2 rounded-lg font-bold cursor-pointer"
                                            value={settings.currentSemester}
                                            onChange={(e) => setSettings({ ...settings, currentSemester: e.target.value })}
                                        >
                                            <option>2025-2026 Güz Dönemi</option>
                                            <option>2025-2026 Bahar Dönemi</option>
                                            <option>2025 Yaz Okulu</option>
                                        </select>
                                    </div>

                                    {/* 👇 DÜZELTME: HiShieldCheck burada kullanıldı */}
                                    <div className="p-6 border-4 border-black bg-blue-100 rounded-xl flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div><h3 className="text-lg font-black flex items-center gap-2"><HiShieldCheck /> Kurumsal E-Posta</h3><p className="text-sm text-gray-500 font-bold">Sadece @beykent.edu.tr</p></div>
                                        <button onClick={() => setSettings({ ...settings, onlySchoolEmail: !settings.onlySchoolEmail })} className={`w-14 h-8 rounded-full border-4 border-black p-0.5 transition-colors ${settings.onlySchoolEmail ? 'bg-blue-400' : 'bg-gray-200'}`}><div className={`w-5 h-5 rounded-full border-2 border-black bg-white transition-transform ${settings.onlySchoolEmail ? 'translate-x-6' : ''}`}></div></button>
                                    </div>
                                </div>

                                {/* MODÜL 3: VERİ VE TEHLİKELİ BÖLGE */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black border-b-4 border-black inline-block text-red-600">⚠️ Veri ve Kritik İşlemler</h3>

                                    <div className="p-6 border-4 border-black bg-gray-50 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <h3 className="text-lg font-black flex items-center gap-2"><HiCloudArrowDown /> Manuel Yedekleme</h3>
                                        <p className="text-sm text-gray-500 font-bold mb-4">Veritabanının tam yedeğini (.sql) indir.</p>
                                        <button onClick={handleBackup} className="w-full bg-black text-white font-bold py-2 rounded-lg hover:bg-gray-800 border-2 border-transparent">YEDEĞİ İNDİR</button>
                                    </div>

                                    <div className="p-6 border-4 border-red-600 bg-red-50 rounded-xl shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
                                        <h3 className="text-lg font-black flex items-center gap-2 text-red-700"><HiServerStack /> Dönem Sıfırlama</h3>
                                        <p className="text-sm text-red-900 font-bold mb-4">Etkinlikleri arşivle ve mezunları sistemden düşür.</p>
                                        <button onClick={() => confirm('Bu işlem geri alınamaz! Dönemi sonlandırmak istediğine emin misin?') && alert('Dönem sonlandırma işlemi başlatıldı...')} className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 border-2 border-black">DÖNEMİ SONLANDIR</button>
                                    </div>

                                    <div className="p-6 border-4 border-black bg-white rounded-xl flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-70 hover:opacity-100 transition-opacity">
                                        <div><h3 className="text-lg font-black flex items-center gap-2"><HiFingerPrint /> Admin Loglarını Temizle</h3><p className="text-sm text-gray-500 font-bold">30 günden eski kayıtları sil</p></div>
                                        <button onClick={() => alert('Log temizleme isteği kuyruğa eklendi.')} className="px-4 py-2 bg-gray-200 border-2 border-black rounded font-bold hover:bg-gray-300">TEMİZLE</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

// YARDIMCI BİLEŞENLER
const MenuButton = ({ label, icon, active, onClick, count }: any) => (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all border-2 border-transparent ${active ? 'bg-[#fbca1f] text-black border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] translate-x-1' : 'hover:bg-gray-800'}`}>
        <div className="flex items-center gap-3"><span className="text-xl">{icon}</span><span>{label}</span></div>
        {count > 0 && <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{count}</span>}
    </button>
);

export default AdminDashboard;