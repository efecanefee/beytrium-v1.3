// src/pages/ClubProfile.tsx
import { useParams } from 'react-router-dom';
import { CLUBS } from '../data';
import { HiUserGroup, HiCheckBadge, HiCalendarDays, HiPlus } from 'react-icons/hi2';

const ClubProfile = () => {
  const { id } = useParams();
  const club = CLUBS.find(c => c.id === id);

  if (!club) return <div className="p-8 font-black text-2xl dark:text-white">Kulüp bulunamadı 😔</div>;

  return (
    <div className="p-4 md:p-8 min-h-full pb-20 animate-fade-in">
      {/* KAPAK & HEADER */}
      <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] mb-8">
        <div className="h-56 bg-gray-900 relative border-b-4 border-black dark:border-gray-600 overflow-hidden">
          {(club as any).banner ? (
            <div className="absolute inset-0 bg-center bg-no-repeat" style={{ backgroundImage: `url(${(club as any).banner})`, backgroundSize: '100% 100%' }}>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ) : (
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1ABCAA 25%, transparent 25%, transparent 75%, #1ABCAA 75%, #1ABCAA), repeating-linear-gradient(45deg, #1ABCAA 25%, #000 25%, #000 75%, #1ABCAA 75%, #1ABCAA)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
          )}
        </div>

        <div className="px-8 pb-8">
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6 gap-6 text-center md:text-left">
            <div className="relative group">
              <img src={club.avatar} alt={club.name} className="w-40 h-40 rounded-full border-4 border-black bg-white shadow-xl" />
            </div>

            <div className="flex-1 mb-2">
              <h1 className="text-2xl md:text-4xl font-black uppercase flex items-center justify-center md:justify-start gap-2 text-black dark:text-white whitespace-nowrap">
                {club.name}
                <HiCheckBadge className="text-[#1ABCAA] w-8 h-8" />
              </h1>
              <p className="text-xl font-bold text-gray-500 dark:text-gray-400">{club.handle}</p>
            </div>

            <button className="bg-[#fbca1f] text-black px-6 py-2 rounded-xl font-black border-2 border-black hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
              <HiPlus className="w-5 h-5" /> KULÜBE KATIL
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl border-2 border-black/10 dark:border-gray-600">
                <h3 className="font-black text-lg mb-3 uppercase text-black dark:text-white">Hakkımızda</h3>
                <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                  {(club as any).about || club.description}
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-black text-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#1ABCAA]">
                  <div className="flex items-center gap-2 mb-1 text-[#1ABCAA] font-bold"><HiUserGroup /> ÜYELER</div>
                  <div className="text-3xl font-black">{club.followers.toLocaleString()}</div>
                </div>
                <div className="flex-1 bg-[#1ABCAA] text-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-2 mb-1 text-black font-black"><HiCalendarDays /> ETKİNLİKLER</div>
                  <div className="text-3xl font-black">{(club as any).events || 0}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-lg uppercase border-b-2 border-black dark:border-gray-600 pb-2 text-black dark:text-white">YÖNETİM EKİBİ</h3>
              {(club as any).president && (
                <div className="flex items-center gap-3">
                  <img src={(club as any).president.avatar} alt="Baskan" className="w-10 h-10 rounded-full border-2 border-black bg-white object-cover" />
                  <div>
                    <p className="font-bold text-sm text-black dark:text-white">{(club as any).president.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">{(club as any).president.role}</p>
                  </div>
                </div>
              )}
              {/* ... Diğer üyeler ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;