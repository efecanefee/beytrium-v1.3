import { HiCodeBracket, HiHeart, HiSparkles } from 'react-icons/hi2';
import { FaReact, FaNodeJs, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiVite } from 'react-icons/si';
import { Link } from 'react-router-dom';

import { CURRENT_USER, OTHER_USERS } from '../data';

const About = () => {
    // Helper to get user by ID from OTHER_USERS
    const getOtherUser = (id: string) => OTHER_USERS.find(u => u.id === id);

    const TEAM = [
        {
            id: "me",
            name: "Mehmet Fatih Karakuş",
            role: "Proje Lideri & Backend",
            avatar: CURRENT_USER.avatar,
            desc: "Sistemin beyni. Veritabanı mimarisi ve API ondan sorulur.",
            links: { linkedin: "#", github: "#" }
        },
        {
            id: "efecan",
            name: "Efecan Efe",
            role: "Full Stack Developer",
            avatar: getOtherUser("efecan")?.avatar || "",
            desc: "Arayüzün estetiğini, arka planın gücüyle birleştirir. Projenin her katmanında imzası var.",
            links: { linkedin: "#", github: "#" }
        },
        {
            id: "yigit",
            name: "Yiğit Yetim",
            role: "Backend & Yönetim Paneli Geliştiricisi",
            avatar: getOtherUser("yigit")?.avatar || "",
            desc: "Tüm sistemi tek bir noktadan yönetecek 'Süper Admin' yapısı onun eseri. Tüm kontrol mekanizmaları parmaklarının ucunda.",
            links: { linkedin: "#", github: "#" }
        },
        {
            id: "yagiz",
            name: "Yağız Türkmen",
            role: "UI/UX Tasarımcı",
            avatar: getOtherUser("yagiz")?.avatar || "",
            desc: "Görsel estetik uzmanı. Renkler ve formlar onun dünyası.",
            links: { linkedin: "#", github: "#" }
        },
        {
            id: "muhammed",
            name: "Muhammed",
            role: "Sunum",
            avatar: getOtherUser("muhammed")?.avatar || "",
            desc: "Projenin sesi. En karmaşık yapıları bile herkesin kolayca anlayabileceği bir dille sunar.",
            links: { linkedin: "#", github: "#" }
        }
    ];

    return (
        <div className="p-4 md:p-8 min-h-full animate-fade-in pb-24">
            {/* BAŞLIK */}
            <div className="bg-[#fbca1f] border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-black uppercase tracking-wider flex items-center gap-3 text-black">
                        <HiCodeBracket className="w-10 h-10" />
                        HAKKIMIZDA
                    </h1>
                    <p className="font-bold text-black/70 text-lg">Fikirlerin Buluşma Noktası 🚀</p>
                </div>
                <div className="absolute right-0 top-0 h-full w-32 bg-white/20 skew-x-12 -mr-10"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* SOL KOLON: MİSYON & TEKNOLOJİ */}
                <div className="space-y-8">
                    {/* MİSYON */}
                    <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)] transition-all">
                        {/* Dekoratif Arkaplan */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#fbca1f] rounded-bl-full -mr-10 -mt-10 opacity-20 z-0"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black dark:bg-gray-900 rounded-tr-full -ml-8 -mb-8 opacity-5 z-0"></div>

                        <h2 className="text-3xl font-black mb-6 relative z-10 flex items-center gap-2 text-black dark:text-white">
                            <span className="bg-black text-white px-3 py-1 rounded transform -rotate-1 inline-block shadow-[4px_4px_0px_0px_#fbca1f]">MİSYONUMUZ</span>
                        </h2>

                        <div className="space-y-4 relative z-10">
                            <p className="font-bold text-lg text-gray-800 dark:text-gray-200 leading-relaxed border-l-4 border-[#fbca1f] pl-4">
                                Beytrium, üniversite öğrencilerinin kampüs içindeki etkileşimini artırmak, kulüp etkinliklerini dijitalleştirmek ve fikirlerin özgürce paylaşıldığı modern bir sosyal platformdur.
                            </p>
                            <p className="font-medium text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                Biz, teknolojiyi sanata ve sosyal yaşama entegre ederek, sadece bir uygulama değil, <span className="font-black text-black dark:text-white bg-[#fbca1f]/30 px-1">yaşayan bir dijital kampüs kültürü</span> oluşturmayı hedefliyoruz.
                            </p>
                        </div>
                    </div>

                    {/* TEKNOLOJİ STACK */}
                    <div className="bg-black text-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_#fbca1f]">
                        <h3 className="text-2xl font-black mb-6 flex items-center gap-2 text-[#fbca1f]">
                            <HiSparkles />
                            TEKNOLOJİ YIĞINI
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            <TechBadge icon={<FaReact className="w-6 h-6 text-[#61DAFB]" />} name="React" />
                            <TechBadge icon={<SiTailwindcss className="w-6 h-6 text-[#38B2AC]" />} name="Tailwind CSS" />
                            <TechBadge icon={<FaNodeJs className="w-6 h-6 text-[#339933]" />} name="Node.js" />
                            <TechBadge icon={<SiTypescript className="w-6 h-6 text-[#3178C6]" />} name="TypeScript" />
                            <TechBadge icon={<SiVite className="w-6 h-6 text-[#646CFF]" />} name="Vite" />
                        </div>
                    </div>
                </div>

                {/* SAĞ KOLON: EKİP */}
                <div className="relative">
                    <div className="absolute -top-6 -left-6 z-0">
                        <div className="bg-[#fbca1f] text-black font-black text-xl px-4 py-2 border-4 border-black transform -rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            RÜYA TAKIM 🌟
                        </div>
                    </div>

                    <div className="space-y-5 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border-4 border-gray-200 dark:border-gray-700">
                        {TEAM.map((member, index) => (
                            <Link to={member.id === 'me' ? '/home/profile' : `/home/user/${member.id}`} key={index} className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] flex items-center gap-4 hover:scale-[1.02] transition-transform group cursor-pointer block">
                                <div className="relative">
                                    <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full border-4 border-black bg-[#e6e6e6]" />
                                    <div className="absolute -bottom-1 -right-1 bg-[#fbca1f] border-2 border-black p-1 rounded-full text-xs">
                                        🚀
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-xl truncate text-black dark:text-white group-hover:underline">{member.name}</h3>
                                    <p className="text-sm font-bold text-[#1ABCAA] uppercase tracking-wide mb-1">{member.role}</p>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 leading-snug">{member.desc}</p>
                                </div>
                                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <object className="contents pointer-events-none">
                                        <div className="flex flex-col gap-2 pointer-events-auto">
                                            <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:scale-110 transition-transform"><FaLinkedin className="w-5 h-5" /></a>
                                            <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:scale-110 transition-transform"><FaGithub className="w-5 h-5" /></a>
                                        </div>
                                    </object>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            {/* CTA SECTION */}
            <div className="mt-16 bg-[#1ABCAA] border-4 border-black rounded-2xl p-10 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        BU HİKAYENİN PARÇASI OL!
                    </h2>
                    <p className="text-white font-bold text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                        Beytrium topluluğuna katılarak fikirlerini paylaş, etkinliklere katıl ve kampüsün nabzını tut.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="mailto:iletisim@beytrium.com" className="bg-black text-white px-8 py-4 rounded-xl font-black text-lg border-4 border-white flex items-center gap-2 hover:bg-[#fbca1f] hover:text-black hover:border-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                            <FaEnvelope />
                            İLETİŞİME GEÇ
                        </a>
                        <Link to="/home" className="bg-white text-black px-8 py-4 rounded-xl font-black text-lg border-4 border-black hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            UYGULAMAYI KEŞFET
                        </Link>
                    </div>
                </div>

                {/* Arkaplan Desenleri */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-black rounded-full"></div>
                </div>
            </div>

            <div className="mt-12 text-center opacity-50 font-bold text-sm dark:text-gray-400">
                <p className="flex items-center justify-center gap-1">
                    Made with <HiHeart className="text-red-500 animate-pulse" /> by Beytrium Team © 2025
                </p>
            </div>
        </div>
    );
};

// Yardımcı Bileşen
const TechBadge = ({ icon, name }: { icon: any, name: string }) => (
    <div className="flex items-center gap-2 bg-gray-900 border-2 border-gray-700 px-4 py-2 rounded-lg hover:border-[#fbca1f] transition-colors cursor-default group">
        <span className="group-hover:scale-110 transition-transform">{icon}</span>
        <span className="font-bold text-sm">{name}</span>
    </div>
);

export default About;
