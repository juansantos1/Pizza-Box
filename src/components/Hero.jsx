import { Link } from 'react-router-dom';
import TextReveal from './TextReveal';
import SplitText from './SplitText';

export default function Hero() {
  return (
    /* Outer container with margins — the hero looks like a floating card */
    <div className="w-full px-4 md:px-10 pt-24 md:pt-28 pb-0 bg-[#FDFBF7]">
      <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden min-h-[88vh] flex flex-col justify-end shadow-2xl">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-section.png"
            alt="Interior de restaurante de lujo con pizza gourmet"
            className="w-full h-full object-cover object-center brightness-[0.65] contrast-[1.05]"
          />
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        </div>

        {/* Bottom-Left Content */}
        <div className="relative z-20 flex flex-col items-start text-left max-w-2xl px-8 md:px-14 pb-10 md:pb-16 gap-5">
          <div 
            className="text-white text-3xl md:text-5xl lg:text-6xl font-normal tracking-wide leading-tight drop-shadow-lg"
            style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
          >
            <TextReveal text="El Arte de la Pizza. Directo a tu Mesa." />
          </div>

          <SplitText 
            text="Bienvenidos a Pizza Box Neiva, donde la tradición artesanal se encuentra con el sabor auténtico. Disfruta de nuestras pizzas horneadas a la perfección con ingredientes seleccionados, masas crujientes y especialidades únicas hechas para compartir. Pide ahora y vive una experiencia gourmet en casa."
            className="text-white/75 text-sm md:text-base leading-relaxed max-w-lg font-light tracking-wide drop-shadow text-left"
            delay={5}
            duration={0.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="left"
          />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              to="/menu"
              className="text-center px-8 py-4 text-xs uppercase tracking-[0.15em] font-semibold bg-white text-[#1C1A17] rounded-full hover:bg-[#FDFBF7] transition-all duration-300 hover:shadow-xl"
            >
              Ver Menú
            </Link>
            <a
              href="#nosotros"
              className="text-center px-8 py-4 text-xs uppercase tracking-[0.15em] font-semibold bg-[#B22222] text-white rounded-full hover:bg-[#9a1c1c] transition-all duration-300 hover:shadow-xl"
            >
              Pedir Ahora
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

