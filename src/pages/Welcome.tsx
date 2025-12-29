// src/pages/Welcome.tsx
import { Link } from 'react-router-dom';
import logoRound from '../assets/logo-round.png';

const Welcome = () => {
  // Beykent Laciverti: #001F5B
  // Beykent Sarısı: #fbca1f

  return (
    // GÜNCELLEME 1: Arka plan rengi lacivert yapıldı ve desen eklendi.
    // bg-[radial-gradient...] kısmı deseni oluşturur.
    <div className="min-h-screen bg-[#001F5B] flex flex-col items-center justify-center p-6 font-['Oswald'] relative overflow-hidden bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] bg-[size:20px_20px]">
      
      {/* GÜNCELLEME 2: Arka plan süsleri koyu temaya uyarlandı */}
      {/* Siyah çerçeveler sarı/beyaz yapıldı, opaklıkları ayarlandı */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-[#fbca1f]/20 border-4 border-[#fbca1f]/50 rounded-full blur-sm"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#1ABCAA]/20 border-4 border-white/30 rounded-full blur-md"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 relative group">
            {/* Logonun arkasındaki gölge efekti sarı yapıldı */}
            <div className="absolute inset-0 bg-[#fbca1f] rounded-full translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
            {/* Logonun çerçevesi lacivertte belli olsun diye sarı yapıldı */}
            <img 
                src={logoRound} 
                alt="Beytrium" 
                className="relative w-40 h-40 rounded-full border-4 border-[#fbca1f] bg-white object-cover z-10" 
            />
        </div>

        {/* GÜNCELLEME 3: Yazı renkleri değiştirildi */}
        {/* Başlık sarı yapıldı */}
        <h1 className="text-6xl font-black mb-2 text-center tracking-tighter text-[#fbca1f] drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
            BEYTRIUM
        </h1>
        {/* Alt başlık beyaz yapıldı */}
        <p className="text-xl font-bold mb-12 text-center text-white/90 tracking-wide">
            Kampüsün Sosyal Ağına Hoş Geldin!
        </p>

        {/* GÜNCELLEME 4: Butonlar yeni temaya uyarlandı */}
        <div className="w-full space-y-5">
            {/* GİRİŞ YAP BUTONU: Sarı zemin, Siyah yazı, Beyaz gölge */}
            <Link to="/login" className="block w-full">
                <button className="w-full bg-[#fbca1f] text-[#001F5B] text-xl font-black py-4 rounded-xl border-4 border-white shadow-[4px_4px_0px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#ffffff] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
                    GİRİŞ YAP
                </button>
            </Link>

            {/* KAYIT OL BUTONU: Şeffaf zemin, Beyaz çerçeve/yazı (Outline tarzı) */}
            <Link to="/register" className="block w-full">
                <button className="w-full bg-transparent text-white text-xl font-black py-4 rounded-xl border-4 border-white hover:bg-white/10 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] transition-all backdrop-blur-xs">
                    KAYIT OL
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;