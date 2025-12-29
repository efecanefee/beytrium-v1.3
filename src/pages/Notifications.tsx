// src/pages/Notifications.tsx
import { HiBell, HiHeart, HiChatBubbleLeft, HiUserPlus } from 'react-icons/hi2';

const NOTIFICATIONS = [
    { id: 1, type: 'like', text: 'Mehmet Fatih gönderini beğendi.', time: '2dk önce', icon: HiHeart, color: 'bg-red-500' },
    { id: 2, type: 'comment', text: 'Yağız Türkmen gönderine yorum yaptı: "Harika!"', time: '15dk önce', icon: HiChatBubbleLeft, color: 'bg-blue-500' },
    { id: 3, type: 'follow', text: 'Ayşe Yılmaz seni takip etmeye başladı.', time: '1sa önce', icon: HiUserPlus, color: 'bg-[#fbca1f] text-black' },
    { id: 4, type: 'like', text: 'Teknoloji Kulübü gönderini beğendi.', time: '3sa önce', icon: HiHeart, color: 'bg-red-500' },
];

const Notifications = () => {
    return (
        <div className="p-4 md:p-8 min-h-full pb-20 animate-fade-in">
            {/* BAŞLIK */}
            <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black dark:text-white">BİLDİRİMLER</h1>
                    <p className="font-bold text-gray-500 dark:text-gray-400">Son aktiviteler.</p>
                </div>
                <div className="bg-[#fbca1f] p-3 rounded-full border-2 border-black shadow-md">
                    <HiBell className="w-8 h-8 text-black" />
                </div>
            </div>

            <div className="space-y-4 max-w-3xl">
                {NOTIFICATIONS.map(notif => (
                    <div key={notif.id} className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-xl p-4 flex items-center gap-4 hover:translate-x-1 transition-transform cursor-pointer shadow-sm">
                        <div className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center shrink-0 ${notif.color} text-white`}>
                            <notif.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-lg leading-tight text-black dark:text-white">{notif.text}</p>
                            <p className="text-xs font-bold text-gray-400 mt-1">{notif.time}</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#1ABCAA]"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;