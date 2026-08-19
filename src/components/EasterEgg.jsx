import React, { useState, useEffect } from 'react';

export default function EasterEgg() {
  const [showBanner, setShowBanner] = useState(false);
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    // Register the global creditos function
    window.creditos = () => {
      // 1. Console Confirmation Message
      console.clear();
      console.log(
        '%c🍕 ¡Huevo de Pascua Activado! 🍕\n%cDesarrollado con ❤️ por JUAN STEVEN SANTOS :)',
        'color: #801818; font-size: 20px; font-weight: bold; font-family: serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);',
        'color: #1C1A17; font-size: 14px; font-style: italic;'
      );

      // 2. Trigger Banner
      setShowBanner(true);

      // 3. Generate Pizza Rain Elements
      const count = 40; // Number of pizzas
      const newPizzas = Array.from({ length: count }).map((_, i) => ({
        id: `pizza-${Date.now()}-${i}-${Math.random()}`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${2 + Math.random() * 3}s`,
        size: `${24 + Math.random() * 24}px`,
        spin: Math.random() > 0.5 ? 'spin-clockwise' : 'spin-counterclockwise',
        opacity: 0.7 + Math.random() * 0.3,
      }));
      setPizzas(newPizzas);

      // Clean up banner after 4.5 seconds
      const bannerTimer = setTimeout(() => {
        setShowBanner(false);
      }, 4500);

      // Clean up pizzas after 6 seconds (allowing all to finish their fall animation)
      const rainTimer = setTimeout(() => {
        setPizzas([]);
      }, 6000);

      return () => {
        clearTimeout(bannerTimer);
        clearTimeout(rainTimer);
      };
    };

    // Clean up global function on unmount
    return () => {
      delete window.creditos;
    };
  }, []);

  return (
    <>
      {/* Dynamic styles for animations */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
          }
        }
        @keyframes sway {
          0%, 100% {
            margin-left: 0px;
          }
          50% {
            margin-left: 25px;
          }
        }
        @keyframes banner-in {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) rotate(-3deg);
            filter: blur(8px);
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.05) rotate(0deg);
            filter: blur(0px);
          }
          20% {
            transform: translate(-50%, -50%) scale(1);
          }
          85% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -60%) scale(0.9);
            filter: blur(6px);
          }
        }
        .pizza-rain-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999999;
          overflow: hidden;
        }
        .falling-pizza {
          position: absolute;
          top: -60px;
          animation-name: fall, sway;
          animation-timing-function: linear, ease-in-out;
          animation-iteration-count: infinite, infinite;
          user-select: none;
        }
        .easter-egg-banner {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10000000;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 2px solid rgba(128, 24, 24, 0.2);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.5),
            0 0 40px rgba(128, 24, 24, 0.1);
          border-radius: 24px;
          padding: 2.5rem 4rem;
          text-align: center;
          animation: banner-in 4.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          pointer-events: none;
          max-width: 90vw;
        }
      `}</style>

      {/* Pizza Rain Layer */}
      {pizzas.length > 0 && (
        <div className="pizza-rain-container">
          {pizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="falling-pizza"
              style={{
                left: pizza.left,
                animationDelay: `${pizza.delay}, ${pizza.delay}`,
                animationDuration: `${pizza.duration}, 4s`,
                fontSize: pizza.size,
                opacity: pizza.opacity,
              }}
            >
              🍕
            </div>
          ))}
        </div>
      )}

      {/* Credit Banner Overlay */}
      {showBanner && (
        <div className="easter-egg-banner">
          <div className="text-xs uppercase tracking-[0.25em] text-[#801818] font-bold mb-2">
            🍕 Pizza Box Creator 🍕
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-wider text-[#1C1A17] drop-shadow-sm select-none">
            JUAN STEVEN SANTOS :)
          </h1>
          <div className="mt-3 text-xs text-gray-500 font-medium">
            ¡Gracias por preferir Pizza Box!
          </div>
        </div>
      )}
    </>
  );
}
