// src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiCheck, HiChevronDown, HiXMark } from 'react-icons/hi2';
import logoRound from '../assets/logo-round.png';
import { CLUBS } from '../data';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Kulüp Ekle/Çıkar
  const toggleClub = (clubId: string) => {
    if (selectedClubs.includes(clubId)) {
        setSelectedClubs(selectedClubs.filter(id => id !== clubId));
    } else {
        setSelectedClubs([...selectedClubs, clubId]);
    }
  };

  const getClubName = (id: string) => CLUBS.find(c => c.id === id)?.name;

  // Kayıt İşlemi
  const handleRegister = () => {
    // Validasyonlar
    if (!name.trim()) {
        setError('Lütfen adınızı ve soyadınızı giriniz.');
        return;
    }
    if (!email.endsWith('@student.beykent.edu.tr')) {
      setError('Sadece @student.beykent.edu.tr adresi ile kayıt olabilirsiniz!');
      return;
    }
    if (password.length < 6) {
        setError('Şifre en az 6 karakter olmalıdır.');
        return;
    }

    // Başarılı Yönlendirme
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#1ABCAA] flex items-center justify-center p-4 font-['Oswald']">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 w-full max-w-md">
        
        <div className="flex flex-col items-center mb-6">
           <img src={logoRound} className="w-20 h-20 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4" />
           <h1 className="text-3xl font-black text-center">ARAMIZA KATIL</h1>
        </div>

        {/* DÜZELTME: onSubmit={(e) => e.preventDefault()} 
            Bu sayede Enter tuşu veya tıklamalar formu yanlışlıkla göndermez.
        */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
                <label className="block font-black text-lg mb-1">AD SOYAD</label>
                <input 
                    type="text" 
                    placeholder="Adınız Soyadınız"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-100 border-4 border-black rounded-xl p-3 font-bold outline-none focus:bg-white transition-colors"
                    required
                />
            </div>

            <div>
                <label className="block font-black text-lg mb-1">OKUL E-POSTASI</label>
                <input 
                    type="email" 
                    placeholder="ornek@student.beykent.edu.tr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-100 border-4 border-black rounded-xl p-3 font-bold outline-none focus:bg-white transition-colors"
                    required
                />
            </div>

            <div>
                <label className="block font-black text-lg mb-1">ŞİFRE</label>
                <input 
                    type="password" 
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-100 border-4 border-black rounded-xl p-3 font-bold outline-none focus:bg-white transition-colors"
                    required
                />
            </div>

            {/* --- KULÜP SEÇİMİ (Artık Güvenli) --- */}
            <div className="relative">
                <label className="block font-black text-lg mb-1">ÜYE OLMAK İSTEDİĞİNİZ KULÜPLER</label>
                
                {/* Seçim Kutusu */}
                <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-gray-100 border-4 border-black rounded-xl p-3 min-h-[56px] cursor-pointer hover:bg-white transition-colors flex flex-wrap items-center gap-2 relative select-none"
                >
                    {selectedClubs.length === 0 && (
                        <span className="text-gray-400 font-bold">Kulüpleri seçmek için tıklayın...</span>
                    )}

                    {selectedClubs.map(id => (
                        <span 
                            key={id} 
                            onClick={(e) => { e.stopPropagation(); toggleClub(id); }} 
                            className="bg-[#fbca1f] text-black border-2 border-black px-2 py-1 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-red-500 hover:text-white transition-colors z-10"
                        >
                            {getClubName(id)}
                            <HiXMark />
                        </span>
                    ))}

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xl">
                        <HiChevronDown />
                    </div>
                </div>

                {/* Açılır Liste */}
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border-4 border-black rounded-xl mt-2 max-h-60 overflow-y-auto z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        {CLUBS.map(club => {
                            const isSelected = selectedClubs.includes(club.id);
                            return (
                                <div 
                                    key={club.id} 
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleClub(club.id); }}
                                    className={`p-3 font-bold cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors border-b-2 border-gray-100 last:border-0 select-none ${isSelected ? 'bg-yellow-50' : ''}`}
                                >
                                    <div className="flex items-center gap-3 pointer-events-none">
                                        <img src={club.avatar} className="w-8 h-8 rounded-full border-2 border-black bg-white" alt={club.name} />
                                        <span>{club.name}</span>
                                    </div>
                                    {isSelected && <HiCheck className="text-xl text-green-600 pointer-events-none" />}
                                </div>
                            );
                        })}
                    </div>
                )}
                
                {/* Uyarı */}
                {selectedClubs.length > 0 && (
                    <div className="bg-yellow-100 border-2 border-yellow-500 text-yellow-800 p-3 rounded-lg mt-2 text-sm font-bold flex items-start gap-2 animate-pulse">
                        <span className="text-xl">⚠️</span>
                        <span className="mt-0.5">
                            Seçtiğiniz {selectedClubs.length > 1 ? 'kulüplere' : 'kulübe'} üyelik işlemi için <u>YÖNETİCİ ONAYI</u> gereklidir. Başvurunuz iletildi.
                        </span>
                    </div>
                )}
            </div>

            {error && (
                <div className="bg-red-100 border-2 border-red-500 text-red-600 font-bold p-3 rounded-lg text-sm">
                    ⚠️ {error}
                </div>
            )}

            {/* DÜZELTME: type="button" ve onClick={handleRegister} 
                Bu buton haricinde hiçbir şey formu gönderemez.
            */}
            <button 
                type="button" 
                onClick={handleRegister}
                className="w-full bg-[#fbca1f] text-black text-xl font-black py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all mt-4"
            >
                KAYIT OL
            </button>
            
            <div className="text-center font-bold text-gray-500 text-sm pt-2">
                Zaten hesabın var mı? <Link to="/login" className="text-black underline">Giriş Yap</Link>
            </div>
        </form>

      </div>
    </div>
  );
};

export default Register;