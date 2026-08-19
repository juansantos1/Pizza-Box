const footerLinks = {
  sedes: [
    { label: 'Sede Quirinal: Av. Tenerife Calle 21 con 7A', href: '#' },
    { label: 'Sede Altico: Calle 6 con Carrera 14', href: '#' },
  ],
  contact: [
    { icon: 'call', label: '608 866 2538', href: 'tel:6088662538' },
    { icon: 'call', label: '313 401 2480', href: 'tel:3134012480' },
    { icon: 'chat', label: 'WhatsApp: +57 300 000 0000', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#0b0b0b] w-full py-16 relative overflow-hidden">
      {/* TEXTO DE FONDO ULTRA-GIGANTE Y CONDENSADO */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 
          className="text-[13vw] font-black tracking-tighter text-white opacity-[0.03] uppercase select-none whitespace-nowrap"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", transform: 'scaleY(1.2)' }}
        >
          Maestros de la pizza
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-16 max-w-7xl mx-auto relative z-10 items-center">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col gap-4 items-start">
          <img
            alt="Pizza Box Logo"
            className="h-16 w-auto object-contain opacity-90"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQxX-YNX2EPf41E9_i6gEPpq6nmOBCZW8vmK454FntXVtc9KYYcgBRRNw_6DrT6MnPDzntY-mQLivV9kLWpQ66UOEeVq0qNVIxoK69QwvWoq5I9lYL19rZKXVIJYYGJedDhUuj9DilIELPEmMV74FAAIIewCh0hw8wmBsNJ_eLVMJ5-HWvmrZ76czbseZvuuUefCd_xmam91FLZJgphiFc-NnBCrSS9mIxVUCLZtlMEHm81SzFZ5NqXxJlf_STW2tQMlpZaZmd9-tS"
          />
          <p className="text-sm text-gray-400 font-sans mt-2">
            © 2025 Pizza Box Neiva - Maestros de la Pizza.
          </p>
        </div>

        {/* Locations Links */}
        <div className="flex flex-col gap-4 text-left">
          <h4 className="font-sans text-[15px] font-black uppercase text-white tracking-widest">
            NUESTRAS SEDES
          </h4>
          <div className="flex flex-col gap-4">
            <div>
              <div className="font-sans text-[15px] text-gray-400 flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-gray-400">location_on</span>
                <span>Sede Quirinal: Calle 18 # 5-44</span>
              </div>
              <div className="font-sans text-xs text-gray-500 ml-8 mt-0.5">
                Todos los días: 4:30 PM a 11:00 PM
              </div>
            </div>
            <div>
              <div className="font-sans text-[15px] text-gray-400 flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-gray-400">location_on</span>
                <span>Sede Altico: Carrera 12 # 6-21</span>
              </div>
              <div className="font-sans text-xs text-gray-500 ml-8 mt-0.5">
                Todos los días: 4:30 PM a 11:00 PM
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Socials */}
        <div className="flex flex-col gap-4 text-left" id="domicilios">
          <h4 className="font-sans text-[15px] font-black uppercase text-white tracking-widest">
            CONTACTO
          </h4>
          <div className="flex flex-col gap-3">
            <div className="font-sans text-[15px] text-gray-400 flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-gray-400">chat</span>
              <span>WhatsApp Av Tenerife: 319 371 7988</span>
            </div>
            <div className="font-sans text-[15px] text-gray-400 flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-gray-400">chat</span>
              <span>WhatsApp Altico: 313 401 2480</span>
            </div>
          </div>
          <div className="flex gap-3 mt-1">
            <a
              href="https://www.instagram.com/pizzaboxneiva"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <img src="/images/icono-instagram.png" alt="Instagram" className="w-full h-full object-contain" />
            </a>
            <a
              href="https://web.facebook.com/PizzaBoxNeiva"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <img src="/images/icono-facebook.png" alt="Facebook" className="w-full h-full object-contain" />
            </a>
            <a
              href="https://www.tiktok.com/@pizzaboxneiva"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <img src="/images/icono-tik-tok.png" alt="TikTok" className="w-full h-full object-contain" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
