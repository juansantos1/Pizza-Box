import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Manifesto() {
  const containerRef = useRef(null);

  return (
    <section
      id="nosotros"
      className="w-full bg-[#F4F4F2] relative overflow-hidden px-6 py-20 md:py-32"
    >
      {/* Watermark: Company Logo — very low opacity, bottom-right */}
      <div className="absolute bottom-0 right-0 opacity-[0.06] pointer-events-none select-none translate-x-1/4 translate-y-1/4">
        <img
          src="/images/pizza-box-logo.png"
          alt="Pizza Box watermark"
          className="w-[320px] md:w-[480px] h-auto object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-10">

        {/* Left Column: Image (40%) */}
        <div className="w-full md:w-5/12 shrink-0">
          <div className="aspect-square w-full relative shadow-2xl bg-black rounded-xl overflow-hidden group cursor-pointer">
            <img
              src="/images/img-nosostros.jpg"
              alt="Pizzaiolo artesanal estirando masa"
              className="w-full h-full object-cover object-[40%_40%] contrast-[1.1] group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right Column: Manifesto Text (60%) */}
        <div className="w-full md:w-7/12" ref={containerRef} style={{ position: 'relative' }}>
          <div
            className="text-3xl md:text-4xl leading-tight uppercase tracking-wide text-[#1C1A17]"
            style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
          >
            <ScrollReveal
              baseOpacity={1}
              enableBlur
              baseRotation={9}
              blurStrength={4}
              textClassName="!font-normal !text-[clamp(1.2rem,2.5vw,2rem)]"
              highlightWords={['PIZZA', 'ARTESANAL', 'OBRA', 'MAESTRA', 'INGREDIENTE', 'INTENCIÓN', 'DETALLE', 'ELEVAR', 'SABOR', 'PREFERIDO']}
              highlightClass="text-[#B22222]"
            >
              DESCUBRE UN LUGAR DONDE CADA PIZZA ARTESANAL ES TRATADA COMO UNA OBRA MAESTRA. CADA INGREDIENTE ES SELECCIONADO CON TOTAL INTENCIÓN Y CADA DETALLE ESTÁ DISEÑADO PARA ELEVAR TU SABOR PREFERIDO.
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
