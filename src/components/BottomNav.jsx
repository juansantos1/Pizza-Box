import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function BottomNav({ onCartClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isHome = location.pathname === '/';
  const isMenu = location.pathname === '/menu';

  // CSS filter para color rojo (#B22222) aproximadamente
  const redFilter = "invert(17%) sepia(90%) saturate(3015%) hue-rotate(345deg) brightness(85%) contrast(93%)";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-[9999] flex justify-around items-center py-2 px-4">
      {/* Botón 1 */}
      <a 
        href="/" 
        onClick={(e) => handleNavClick(e, '/')}
        className="flex flex-col items-center gap-1 focus:outline-none"
      >
        <img 
          src="/images/logotipo-inicio.png" 
          alt="Inicio" 
          className="w-[26px] h-[26px] object-contain transition-all" 
          style={{ filter: isHome ? redFilter : 'none' }}
        />
        <span className={`text-[11px] font-medium transition-colors ${isHome ? 'text-[#B22222]' : 'text-[#1C1A17]'}`}>Inicio</span>
      </a>

      {/* Botón 2 */}
      <a 
        href="/menu" 
        onClick={(e) => handleNavClick(e, '/menu')}
        className="flex flex-col items-center gap-1 focus:outline-none"
      >
        <img 
          src="/images/logotipo-menu.png" 
          alt="Menú" 
          className="w-[26px] h-[26px] object-contain transition-all" 
          style={{ filter: isMenu ? redFilter : 'none' }}
        />
        <span className={`text-[11px] font-medium transition-colors ${isMenu ? 'text-[#B22222]' : 'text-[#1C1A17]'}`}>Menú</span>
      </a>

      {/* Botón 3: Carrito */}
      <button onClick={onCartClick} className="relative flex flex-col items-center gap-1 focus:outline-none">
        <div className="relative">
          <img 
            src="/images/logotipo-carrito.png" 
            alt="Carrito" 
            className="w-[26px] h-[26px] object-contain" 
          />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#801818] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[11px] font-medium text-[#1C1A17]">Carrito</span>
      </button>

      {/* Botón 4: Contacto */}
      <button onClick={handleContactClick} className="flex flex-col items-center gap-1 focus:outline-none">
        <img 
          src="/images/logotipo-telefono.png" 
          alt="Contacto" 
          className="w-[26px] h-[26px] object-contain" 
        />
        <span className="text-[11px] font-medium text-[#1C1A17]">Contacto</span>
      </button>
    </nav>
  )
}

