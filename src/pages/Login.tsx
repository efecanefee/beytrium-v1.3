// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiArrowPath } from 'react-icons/hi2'; // Dönen ikon için
import logoRound from '../assets/logo-round.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // YENİ: Yükleme durumu için state
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasyonlar
        if (!email.endsWith('@student.beykent.edu.tr')) {
            setError('Sadece @student.beykent.edu.tr adresi ile giriş yapabilirsiniz!');
            return;
        }

        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        // Hata yoksa yüklemeyi başlat
        setError('');
        setIsLoading(true);

        // YENİ: 2 Saniyelik yapay bekleme (Sunucu simülasyonu)
        setTimeout(() => {
            setIsLoading(false); // Yükleme bitti
            navigate('/home');    // Ana uygulamaya git
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] animate-gradient-xy flex items-center justify-center p-4 font-['Oswald'] relative overflow-hidden">

            {/* Animated Background Orbs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#1ABCAA] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#fbca1f] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-2000"></div>

            <div className="bg-white/90 backdrop-blur-sm border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 w-full max-w-md relative overflow-hidden z-10">

                {/* Dekoratif Çizgi */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1ABCAA] to-[#fbca1f]"></div>

                <div className="flex flex-col items-center mb-8">
                    <img src={logoRound} className="w-24 h-24 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 bg-white" alt="Logo" />
                    <h1 className="text-4xl font-black text-center">BEYTRIUM</h1>
                    <p className="font-bold text-gray-500">Öğrenci Kulüpleri Platformu</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block font-black text-lg mb-2">OKUL E-POSTASI</label>
                        <input
                            type="email"
                            placeholder="ornek@student.beykent.edu.tr"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border-4 border-black rounded-xl p-3 font-bold outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-400"
                            required
                            disabled={isLoading} // Yüklenirken engelle
                        />
                    </div>

                    <div>
                        <label className="block font-black text-lg mb-2">ŞİFRE</label>
                        <input
                            type="password"
                            placeholder="••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border-4 border-black rounded-xl p-3 font-bold outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-400"
                            required
                            disabled={isLoading} // Yüklenirken engelle
                        />
                    </div>

                    {error && (
                        <div className="bg-red-100 border-2 border-red-500 text-red-600 font-bold p-3 rounded-lg text-sm flex items-center gap-2 animate-pulse">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    {/* BUTON (Loading Durumu Eklendi) */}
                    <button
                        type="submit"
                        disabled={isLoading} // Tıklamayı engelle
                        className={`
                    w-full text-xl font-black py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3
                    ${isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed translate-x-[2px] translate-y-[2px] shadow-none'
                                : 'bg-[#1ABCAA] text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                            }
                `}
                    >
                        {isLoading ? (
                            <>
                                <HiArrowPath className="w-6 h-6 animate-spin" /> {/* Dönen İkon */}
                                GİRİŞ YAPILIYOR...
                            </>
                        ) : (
                            "GİRİŞ YAP"
                        )}
                    </button>

                    <div className="text-center font-bold text-gray-500 text-sm space-y-2">
                        <p>Hesabın yok mu? <Link to="/register" className={`text-black underline ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>Kayıt Ol</Link></p>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Login;