// src/pages/ClubManagement.tsx
import { useState } from 'react';
import { HiUserGroup, HiPlus, HiXMark, HiCheck, HiBriefcase } from 'react-icons/hi2';
import { CLUBS } from '../data'; // Import CLUBS

// PP IMPORTS
import ayseYilmazPP from '../assets/Ekler/pp/Ayşe Yılmaz/Ayşe Yılmaz.png';
import mehmetDemirPP from '../assets/Ekler/pp/Mehmet Demir/Mehmet Demir.png';
import canerPP from '../assets/Ekler/pp/Caner Erkin/Caner Erkin.png';

// Dummy Bekleyen Üyeler (Avatarlı)
const PENDING_MEMBERS = [
    { id: 1, name: 'Ayşe Yılmaz', department: 'Bilgisayar Müh.', studentId: '21000001', avatar: ayseYilmazPP },
    { id: 2, name: 'Mehmet Demir', department: 'Yazılım Müh.', studentId: '21000002', avatar: mehmetDemirPP },
    { id: 3, name: 'Caner Erkin', department: 'Endüstri Müh.', studentId: '21000003', avatar: canerPP },
];

const ClubManagement = () => {
    const [pendingMembers, setPendingMembers] = useState(PENDING_MEMBERS);
    const techClub = CLUBS.find(c => c.id === 'tech'); // Get Tech Club

    // Üye Onaylama
    const handleApprove = (id: number) => {
        setPendingMembers(current => current.filter(m => m.id !== id));
        // Gerçekte API isteği atılır
    };

    // Üye Reddetme
    const handleReject = (id: number) => {
        setPendingMembers(current => current.filter(m => m.id !== id));
    };

    return (
        <div className="p-4 md:p-8 min-h-full pb-20 animate-fade-in">

            {/* BAŞLIK */}
            <div className="bg-[#fbca1f] border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">KULÜP YÖNETİM PANELİ</h1>
                    <p className="font-bold text-black/70 text-lg">{techClub?.name || 'Teknoloji Kulübü'} 🚀</p>
                </div>
                <div className="bg-black text-white px-4 py-2 rounded-lg font-black border-2 border-black transform rotate-2 shadow-lg">
                    YÖNETİCİ MODU
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* SOL KOLON: ÜYE ONAYLARI */}
                <div className="xl:col-span-2 space-y-8">

                    {/* BEKLEYEN ÜYELER */}
                    <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-black dark:text-white">
                            <HiUserGroup className="text-[#1ABCAA]" />
                            ÜYELİK BAŞVURULARI
                            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">{pendingMembers.length}</span>
                        </h2>

                        {pendingMembers.length === 0 ? (
                            <div className="text-center py-10 text-gray-400 font-bold dark:text-gray-500">
                                Şu an bekleyen başvuru yok. 🎉
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pendingMembers.map(member => (
                                    <div key={member.id} className="flex flex-col md:flex-row items-center justify-between bg-gray-50 dark:bg-gray-700/50 border-2 border-black dark:border-gray-600 p-4 rounded-xl gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full border-2 border-black bg-white" />
                                            <div>
                                                <h3 className="font-black text-lg text-black dark:text-white">{member.name}</h3>
                                                <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{member.department} • {member.studentId}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <button
                                                onClick={() => handleApprove(member.id)}
                                                className="flex-1 md:flex-none bg-[#1ABCAA] text-white px-4 py-2 rounded-lg font-black border-2 border-black hover:bg-[#159c8d] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-1"
                                            >
                                                <HiCheck /> ONAYLA
                                            </button>
                                            <button
                                                onClick={() => handleReject(member.id)}
                                                className="flex-1 md:flex-none bg-red-500 text-white px-4 py-2 rounded-lg font-black border-2 border-black hover:bg-red-600 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-1"
                                            >
                                                <HiXMark /> REDDET
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* AKTİF ETKİNLİKLER (Mock) */}
                    <div className="bg-black text-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_#fbca1f]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black flex items-center gap-2 text-[#fbca1f]">
                                <HiBriefcase />
                                ETKİNLİK YÖNETİMİ
                            </h2>
                            <button className="bg-white text-black px-4 py-2 rounded-lg font-black border-2 border-transparent hover:bg-[#fbca1f] transition-colors flex items-center gap-2">
                                <HiPlus /> YENİ ETKİNLİK
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-900 p-4 rounded-xl border-2 border-gray-700">
                                <h3 className="font-bold text-lg mb-1">Yapay Zeka Webinarı</h3>
                                <p className="text-sm text-gray-400 mb-3">25 Aralık 2024 • 20:00</p>
                                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-[#1ABCAA] w-3/4 h-full"></div>
                                </div>
                                <p className="text-xs text-right mt-1 font-mono text-[#1ABCAA]">240/300 Kayıt</p>
                            </div>
                            <div className="bg-gray-900 p-4 rounded-xl border-2 border-gray-700 opacity-50">
                                <h3 className="font-bold text-lg mb-1">React Workshop</h3>
                                <p className="text-sm text-gray-400 mb-3">Geçmiş Etkinlik</p>
                                <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
                                    <HiCheck /> Tamamlandı
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* SAĞ KOLON: KULÜP AYARLARI */}
                <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] h-fit sticky top-6">
                    <h2 className="text-xl font-black mb-6 uppercase border-b-4 border-black dark:border-gray-600 pb-2 text-black dark:text-white">Kulüp Ayarları</h2>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex justify-center mb-6">
                            <div className="relative group cursor-pointer">
                                <img src={techClub?.avatar} className="w-24 h-24 rounded-full border-4 border-black bg-gray-100 object-cover" />
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-bold text-xs">DEĞİŞTİR</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-black mb-1 text-black dark:text-gray-300">KULÜP ADI</label>
                                <input type="text" defaultValue={techClub?.name} className="w-full border-4 border-black dark:border-gray-600 rounded-xl p-3 font-bold bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 dark:text-white transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-black mb-1 text-black dark:text-gray-300">KISA AÇIKLAMA</label>
                                <textarea defaultValue={techClub?.description} className="w-full border-4 border-black dark:border-gray-600 rounded-xl p-3 font-bold bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 dark:text-white transition-colors h-24 resize-none" />
                            </div>
                        </div>

                        <button className="w-full bg-black text-white py-3 rounded-xl font-black border-2 border-black hover:bg-[#fbca1f] hover:text-black transition-all mt-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                            DEĞİŞİKLİKLERİ KAYDET
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ClubManagement;
