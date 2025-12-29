import logo from "../assets/logo.png";
import { HiEnvelope, HiPhone, HiMapPin } from "react-icons/hi2";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Ana Sayfa", href: "#hero" },
    { name: "Hakkımızda", href: "#who" },
    { name: "S.S.S", href: "#faq" },
    { name: "İletişim", href: "#contact" },
  ];

  const handleNavigation = (href: string) => {
    if (location.pathname !== "/") {
      // Farklı bir sayfadaysan (Pano gibi), önce ana sayfaya git
      navigate("/");
      // Sonra scroll yap
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // Ana sayfadaysan direkt scroll yap
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/beykenthinkhub?igsh=MW1zeXdvdHBuNWtwMw==" },
    { name: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/company/i%CC%87stanbul-beykent-%C3%BCniversitesi-bilimsel-ara%C5%9Ft%C4%B1rma-ve-teknoloji-kul%C3%BCb%C3%BC-thinkhub/" },
    { name: "GitHub", icon: FaGithub, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 border-t-8 border-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Logo ve Açıklama */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img
                src={logo}
                alt="Beytrium Logo"
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 text-lg font-semibold leading-relaxed mb-6">
              Beykent Üniversitesi teknoloji ve yazılım topluluğu. Birlikte
              öğrenip, birlikte üretiyoruz!
            </p>
            {/* Sosyal Medya */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-[#fbca1f] border-3 border-black rounded-lg flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    aria-label={social.name}
                  >
                    <IconComponent className="text-black" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-2xl font-black mb-6 uppercase text-[#fbca1f]">
              Hızlı Erişim
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-gray-300 text-lg font-semibold hover:text-[#fbca1f] transition-colors duration-200 inline-block hover:translate-x-1 cursor-pointer"
                  >
                    → {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-2xl font-black mb-6 uppercase text-[#fbca1f]">
              İletişim
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiEnvelope className="text-2xl text-[#fbca1f] mt-1" />
                <div>
                  <p className="text-gray-400 text-sm font-black uppercase">
                    Email
                  </p>
                  <p className="text-gray-300 font-semibold text-sm break-all">
                    info@beytrium.com
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HiPhone className="text-2xl text-[#fbca1f] mt-1" />
                <div>
                  <p className="text-gray-400 text-sm font-black uppercase">
                    Telefon
                  </p>
                  <p className="text-gray-300 font-semibold text-sm">
                    +90 530 513 9894
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HiMapPin className="text-2xl text-[#fbca1f] mt-1" />
                <div>
                  <p className="text-gray-400 text-sm font-black uppercase">
                    Adres
                  </p>
                  <p className="text-gray-300 font-semibold text-sm">
                    Beykent Üniversitesi
                    <br />
                    İstanbul, Türkiye
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Çizgi ve Copyright */}
        <div className="mt-12 pt-8 border-t-4 border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 font-semibold text-center md:text-left">
              © {new Date().getFullYear()} Beytrium. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 font-semibold hover:text-[#fbca1f] transition-colors"
              >
                Gizlilik Politikası
              </a>
              <a
                href="#"
                className="text-gray-400 font-semibold hover:text-[#fbca1f] transition-colors"
              >
                Kullanım Koşulları
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

