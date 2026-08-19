import React, { useRef, useEffect } from 'react';
import CountUp from './CountUp';

export default function AuthorityBar() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let isTouching = false;
    const isMobile = window.innerWidth < 768;
    
    if (isMobile && scrollContainerRef.current) {
      let scrollAmount = 0;
      let direction = 1;
      const scrollElement = scrollContainerRef.current;
      
      const autoScroll = () => {
        if (!isTouching) {
          const maxScroll = scrollElement.scrollWidth - scrollElement.clientWidth;
          if (maxScroll > 0) {
            scrollAmount += 0.5 * direction;
            if (scrollAmount >= maxScroll) {
              direction = -1;
              scrollAmount = maxScroll;
            } else if (scrollAmount <= 0) {
              direction = 1;
              scrollAmount = 0;
            }
            scrollElement.scrollLeft = scrollAmount;
          }
        } else {
          scrollAmount = scrollElement.scrollLeft;
        }
        animationFrameId = requestAnimationFrame(autoScroll);
      };
      
      const handleTouchStart = () => isTouching = true;
      const handleTouchEnd = () => {
        setTimeout(() => isTouching = false, 2000);
      };
      
      scrollElement.addEventListener('touchstart', handleTouchStart);
      scrollElement.addEventListener('touchend', handleTouchEnd);
      
      const timeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(autoScroll);
      }, 1000);
      
      return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(animationFrameId);
        scrollElement.removeEventListener('touchstart', handleTouchStart);
        scrollElement.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);

  return (
    <div className="bg-[#FDFBF7] w-full py-10 md:py-14 px-6 border-b border-gray-100">
      <div 
        ref={scrollContainerRef}
        className="flex flex-row flex-nowrap gap-10 md:gap-0 md:justify-around md:items-center text-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 md:px-0"
      >
        
        <div className="shrink-0">
          <h3 className="text-xl md:text-2xl font-bold text-[#1C1A17] font-sans">3 VECES CAMPEONES</h3>
          <p className="tracking-widest text-xs text-gray-500 uppercase mt-1">Pizza Master Neiva</p>
        </div>

        <div className="hidden md:block h-8 w-[1px] bg-gray-300 shrink-0"></div>

        <div className="shrink-0">
          <h3 className="text-xl md:text-2xl font-bold text-[#1C1A17]">
            <CountUp from={0} to={100} separator="" direction="up" duration={2} className="inline-block" delay={0.1} />% ARTESANAL
          </h3>
          <p className="tracking-widest text-xs text-gray-500 uppercase mt-1">Masa de alta calidad</p>
        </div>

        <div className="hidden md:block h-8 w-[1px] bg-gray-300 shrink-0"></div>

        <div className="shrink-0">
          <h3 className="text-xl md:text-2xl font-bold text-[#1C1A17]">
            +<CountUp from={0} to={330} separator="" direction="up" duration={2} className="inline-block" delay={0.1} /> RESEÑAS
          </h3>
          <p className="tracking-widest text-xs text-gray-500 uppercase mt-1">Clientes verificados</p>
        </div>

      </div>
    </div>
  );
}
