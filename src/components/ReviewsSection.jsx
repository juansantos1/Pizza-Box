import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const imageVariants = {
  initial: { opacity: 0, scale: 1.04 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const ReviewImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-300 w-full h-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-xs font-medium">Espacio para foto</span>
      </div>
    );
  }

  if (images.length === 1) {
    return <img src={images[0]} alt="Review" className="w-full h-full object-cover" />;
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.img
        key={activeIndex}
        src={images[activeIndex]}
        variants={imageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </AnimatePresence>
  );
};

const reviews = [
  {
    name: "Viviana Alvarez Muñoz",
    time: "Hace 7 meses",
    rating: 5,
    profilePhoto: "/social-proof/foto_prf-Viviana_Alvarez.png",
    photos: ["/social-proof/fto-opinion-viviana.png"],
    text: "La mejor pizza que me he comprado en la vida, Torino te llevo en mi corazón",
    link: "https://maps.app.goo.gl/rbxs1YhHnZnpwBeVA"
  },
  {
    name: "Orlando Scoppetta",
    time: "Hace 5 meses",
    rating: 4,
    profilePhoto: "/social-proof/foto_prf-orlando.png",
    photos: [
      "/social-proof/fto-opinion-orlando1.png",
      "/social-proof/fto-opinion-orlando2.png",
      "/social-proof/fto-opinion-orlando3.png"
    ],
    text: "Comida: probamos una pizza \"mitad y mitad\", con dos preparaciones recomendadas. Estaba muy bien. Realmente nos gustó. Servicio: muy amable y muy dispuesto a explicar y presentar los productos. Ambiente: agradable. Volvería: sí.",
    link: "https://maps.app.goo.gl/9NrQnCHd4LcHHfGP8"
  },
  {
    name: "Laura Bahos",
    time: "Hace 9 meses",
    rating: 5,
    profilePhoto: "/social-proof/foto_prf-laura.png",
    photos: ["/social-proof/fto-opinion-larua.png"],
    text: "La verdad la pizza es muy deliciosa, tiene gran variedad , la masa no es crocante que en lo personal está genial, no me llama la atención comer pizza pero este lugar lo recomiendo, tienen buena atención, es un buen tamaño para el costo que tiene y la espera por la comida es poca, súper genial, este si es calidad y precio.",
    link: "https://maps.app.goo.gl/KRHXkWYNMChfi7Qr8"
  },
  {
    name: "Marcela P Gonzales",
    time: "Hace un año",
    rating: 4,
    profilePhoto: "/social-proof/foto-perfil-marcela.png",
    photos: [
      "/social-proof/fto-opinion-marcela1.png",
      "/social-proof/fto-opinion-marcela2.png"
    ],
    text: "Es un lugar muy bonito y agradable para ir a comer. La atención es rápida. el sabor de las pizzas es bueno al igual que la presentación. Es un buen lugar para compartir en familia.",
    link: "https://maps.app.goo.gl/ZQ9q8zkR8EzPV7Du7"
  },
  {
    name: "Jofren Ramirez",
    time: "Hace un año",
    rating: 5,
    profilePhoto: "/social-proof/foto-perfil-jofren.png",
    photos: ["/social-proof/foto-opinion-jofren.png"],
    text: "Una verdadera delicia, las mejores pizzas de neiva, super recomendado el lugar, buena atención y calidad.",
    link: "https://maps.app.goo.gl/Nd9CWapEyHqxRryp7"
  },
  {
    name: "Laura Catalina V.",
    time: "Hace 10 meses",
    rating: 5,
    profilePhoto: "/social-proof/foto-perfil-catalina.png",
    photos: ["/social-proof/fto-opinion-catalina.png"],
    text: "Desde las luces cálidas, la música, la atención, la comidaa ¡Todo hace un maridaje perfecto! Amé la pizza, mi favorita hasta ahora es la española🤌🏽. Vas a volver porque te va encantar",
    link: "https://maps.app.goo.gl/mVYrvWeu5QWkcYCh7"
  }
];

export default function ReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const sectionRef = React.useRef(null);

  const scrollToTop = () => {
    if (window.innerWidth < 768 && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextReviews = () => {
    setStartIndex((prev) => (prev + 3 >= reviews.length ? 0 : prev + 3));
    scrollToTop();
  };

  const prevReviews = () => {
    setStartIndex((prev) => (prev - 3 < 0 ? Math.max(0, reviews.length - 3) : prev - 3));
    scrollToTop();
  };

  const visibleReviews = reviews.slice(startIndex, startIndex + 3);

  return (
    <section id="reseñas" ref={sectionRef} className="w-full bg-[#F5F5F3] py-16 md:py-24 px-6 md:px-16">
      <motion.div 
        className="max-w-7xl mx-auto relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center md:items-center text-center md:text-center mb-10 md:mb-4">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1C1A17] font-bold mb-4 title-with-line">
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex flex-col items-center md:items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#1C1A17]">4.4 / 5</span>
              <div className="flex text-[#F5C242]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <span className="text-gray-500 text-sm mt-1">(339 opiniones en Google)</span>
          </div>
        </div>

        <div className="relative mt-10 md:mb-4 flex items-center group">
          {/* Left Arrow */}
          <button 
            onClick={prevReviews}
            className="absolute -left-4 md:-left-12 z-10 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-black hover:bg-gray-100 transition-colors hidden md:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full overflow-hidden px-1">
            <AnimatePresence mode="popLayout">
              {visibleReviews.map((review, index) => (
                <motion.a
                  key={review.name + startIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  href={review.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-xl shadow-sm p-6 hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col"
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {review.profilePhoto ? (
                        <img src={review.profilePhoto} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                          {review.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-semibold text-[#1C1A17] leading-tight">{review.name}</h3>
                        <span className="text-xs text-gray-500">{review.time}</span>
                      </div>
                    </div>
                    {/* Google G logo miniature */}
                    <div className="w-5 h-5 flex-shrink-0">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                  </div>

                  {/* Espacio para foto del cliente */}
                  <div className="w-full h-48 bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-gray-100 relative">
                    <ReviewImageSlider images={review.photos} />
                  </div>

                  {/* Middle row: Stars */}
                  <div className="flex text-[#F5C242] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 fill-current ${i < review.rating ? '' : 'text-gray-300'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Bottom row: Text */}
                  <p className="text-gray-600 text-sm leading-relaxed italic flex-grow">
                    "{review.text}"
                  </p>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={nextReviews}
            className="absolute -right-4 md:-right-12 z-10 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-black hover:bg-gray-100 transition-colors hidden md:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile Arrows (Visible only on small screens) */}
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <button 
            onClick={prevReviews}
            className="p-3 bg-white rounded-full shadow-md text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextReviews}
            className="p-3 bg-white rounded-full shadow-md text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
