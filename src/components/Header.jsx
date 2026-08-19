import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Menú', href: '/menu' },
  { label: 'Reseñas', href: '/#reseñas' },
  { label: 'Sedes', href: '/#sedes' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Header({ scrolled, onCartClick }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount } = useCart()

  // Prevent scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)

    // Handle normal routes
    if (href === '/' || href === '/menu') {
      navigate(href)
      window.scrollTo(0, 0)
      return
    }

    // Handle anchor links
    const targetId = href.replace('/#', '').replace('#', '')
    
    // If it's the contact button, scroll to the footer on the current page
    if (targetId === 'contacto') {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }

    if (location.pathname !== '/') {
      // If not on Home and target is not contacto, navigate to Home first
      navigate('/')
      // We wait for the page to render, then scroll
      setTimeout(() => {
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // If already on Home, just scroll
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <header
        className={`absolute md:fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md py-3'
            : 'bg-white shadow-sm py-3.5 md:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center md:justify-between relative min-h-[50px] md:min-h-[auto]">
          
          {/* Mobile Hamburger */}
          <button
            className="md:hidden absolute left-6 p-2 text-[#1C1A17]"
            onClick={() => setMobileOpen(true)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo + Brand Name */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src="/images/pizza-box-logo.png"
              alt="Pizza Box Logo"
              className="h-16 md:h-14 w-auto object-contain"
            />
            <span
              className="hidden md:block text-xl md:text-2xl font-semibold tracking-[0.2em] text-[#1C1A17] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Pizza Box
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs uppercase tracking-[0.2em] font-medium text-[#1C1A17] hover:text-[#801818] transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button & Cart Icon */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/menu"
              onClick={(e) => handleNavClick(e, '/menu')}
              className="inline-block px-6 py-3 text-xs uppercase tracking-[0.15em] font-semibold text-white bg-[#801818] hover:bg-[#6a1212] rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Reserva Mesa
            </a>
            <button onClick={onCartClick} className="relative flex items-center justify-center p-2.5 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
              <img 
                src="/images/logotipo-carrito.png" 
                alt="Carrito" 
                className="w-5 h-5 object-contain"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#801818] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Full Screen) */}
      <div 
        className={`md:hidden fixed top-0 left-0 w-[100vw] h-[100vh] bg-white z-[99999] transition-transform duration-500 ease-in-out flex flex-col ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end items-center p-6 border-b border-gray-100">
          <button onClick={() => setMobileOpen(false)} className="p-2 text-[#1C1A17]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col flex-grow px-6 pt-12 pb-20 overflow-y-auto">
          <h2 
            className="text-2xl font-bold tracking-[0.1em] text-[#1C1A17] text-left uppercase mb-10 max-w-[280px]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            ES MOMENTO DE COMER ALGO
          </h2>

          <div className="flex flex-col gap-4 w-full">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="w-full text-left px-6 py-4 bg-[#f8f9fa] rounded-[14px] text-base uppercase tracking-[0.2em] font-medium text-[#1C1A17] hover:bg-[#eeeeee] transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/menu"
              onClick={(e) => handleNavClick(e, '/menu')}
              className="mt-4 w-full text-left px-6 py-4 text-sm uppercase tracking-[0.15em] font-semibold text-white bg-[#801818] rounded-[14px] cursor-pointer"
            >
              Reserve Table
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
