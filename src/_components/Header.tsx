import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToContact = () => {
    if (location.pathname === '/') {
      const contactSection = document.querySelector('#contact')
      contactSection?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Farklı bir sayfadaysan, önce ana sayfaya git
      navigate('/')
      setTimeout(() => {
        const contactSection = document.querySelector('#contact')
        contactSection?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <header className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-50 w-[98%] md:w-[95%] max-w-7xl">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl md:rounded-4xl border-3 border-black px-2 py-2 md:px-4 md:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-16 md:h-24 lg:h-32 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Ortada Başlık */}
          <div className="hidden lg:flex flex-1 justify-center px-4">
            <h1 className="text-xl xl:text-2xl cursor-pointer font-semibold text-gray-900 text-center">
             İstanbul Beykent Üniversitesi Bilimsel Araştırma ve Teknoloji Kulubü
            </h1>
          </div>

          {/* Butonlar */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <button 
              onClick={scrollToContact}
              className="bg-[#fbca1f] px-4 py-2.5 md:px-[1.3em] md:py-[0.6em] font-black text-sm md:text-lg border-3 border-black rounded-[1em] shadow-[0.2em_0.2em_black] cursor-pointer transition-all duration-150 hover:translate-x-[0.2em] hover:translate-y-[0.2em] hover:shadow-[0.0em_0.0em_black] whitespace-nowrap"
            >
              <span className="hidden sm:inline">İletişime Geç</span>
              <span className="sm:hidden">İletişim</span>
            </button>
            <Link 
              to="/pano"
              className="bg-[#1ABCAA] text-white px-4 py-2.5 md:px-[1.3em] md:py-[0.6em] font-black text-sm md:text-lg border-3 border-black rounded-[1em] shadow-[0.2em_0.2em_black] cursor-pointer transition-all duration-150 hover:translate-x-[0.2em] hover:translate-y-[0.2em] hover:shadow-[0.0em_0.0em_black] whitespace-nowrap"
            >
              Pano
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

