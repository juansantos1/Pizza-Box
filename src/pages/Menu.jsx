import { useState, useEffect } from 'react'
import ProductModal from '../components/ProductModal'
import { motion, AnimatePresence } from 'framer-motion'
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input'

const BANNERS = ['/images/banner1.jpg', '/images/banner2.jpg']

import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../data/products'

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("Clásica")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentBanner, setCurrentBanner] = useState(0)



  const nextBanner = () => {
    setCurrentBanner(prev => (prev + 1) % BANNERS.length)
  }

  const prevBanner = () => {
    setCurrentBanner(prev => (prev - 1 + BANNERS.length) % BANNERS.length)
  }

  const placeholders = [
    "¿Antojo de Hawaiana?",
    "Busca 'Pepperoni'",
    "¿Qué tal una Dolce Burrata?",
    "Prueba 'La Roma'",
    "Refrescante Granizado de maracuya"
  ];

  const handleSearchSubmit = (e, value) => {
    e.preventDefault();
    if (!value) return;
    
    const searchQuery = value.toLowerCase().trim();
    const foundProduct = MOCK_PRODUCTS.find(p => 
      p.title.toLowerCase().includes(searchQuery) || 
      p.description.toLowerCase().includes(searchQuery)
    );
    
    if (foundProduct) {
      setActiveCategory(foundProduct.categoria);
      // Pequeño retraso para que cambie de categoría antes de abrir el modal
      setTimeout(() => {
        setSelectedProduct(foundProduct);
      }, 100);
    } else {
      alert("No se encontró ningún producto con esa búsqueda.");
    }
  };

  return (
    <div className="w-full pt-[80px] md:pt-[100px] flex flex-col items-center bg-[#FDFBF7] min-h-screen">
      
      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl px-6 md:px-12 my-6 z-20"
      >
        <div className="relative w-full md:w-1/2 mx-auto">
          <PlaceholdersAndVanishInput 
            placeholders={placeholders} 
            onChange={() => {}} 
            onSubmit={handleSearchSubmit} 
          />
        </div>
      </motion.div>

      {/* Image Carousel */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative w-full h-[180px] md:h-[400px] bg-gray-100 overflow-hidden flex items-center justify-center group mb-8"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentBanner}
            src={BANNERS[currentBanner]}
            alt={`Banner promocional ${currentBanner + 1}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Carousel Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />
        
        {/* Arrows */}
        <button 
          onClick={prevBanner}
          className="absolute left-4 md:left-8 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md z-10 hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextBanner}
          className="absolute right-4 md:right-8 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md z-10 hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentBanner === idx ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </motion.div>

      <div className="w-full max-w-7xl px-6 md:px-12 mb-6">
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold tracking-[0.1em] text-[#1C1A17] uppercase text-center mb-8"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ¿Qué te gustaría comer hoy?
        </motion.h1>

        {/* Categories Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex items-center justify-start md:justify-center gap-3 whitespace-nowrap">
            {MOCK_CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-[#801818] text-white border-[#801818] shadow-md' 
                    : 'bg-white text-[#1C1A17] border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Products Section */}
      <div className="w-full max-w-7xl px-6 md:px-12 mb-24">
        {/* CSS Grid on PC, Vertical Stack on Mobile */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={activeCategory} // Re-animate when category changes
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6"
        >
          {MOCK_PRODUCTS.filter(product => product.categoria === activeCategory).map((product) => (
            <motion.div 
              variants={itemVariants}
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-row p-3 md:p-5 gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all cursor-pointer"
            >
              
              {/* Product Image Fixed Left */}
              <div className="w-[100px] h-[100px] md:w-[160px] md:h-[160px] flex-shrink-0 bg-gray-50 rounded-[12px] overflow-hidden flex items-center justify-center border border-gray-100">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info Right */}
              <div className="flex flex-col flex-grow text-left justify-start pointer-events-none">
                <span className="text-[#801818] font-bold text-base md:text-xl mb-0.5">{product.price}</span>
                <h3 className="text-sm md:text-lg font-bold text-[#1C1A17] leading-tight mb-1">{product.title}</h3>
                
                <p className="text-xs md:text-sm text-gray-500 mb-3 line-clamp-2 md:line-clamp-none">
                  {product.description}
                </p>

                <div className="mt-auto pointer-events-auto">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="w-auto px-5 py-2 md:px-8 md:py-2.5 bg-[#FDFBF7] border border-gray-200 text-[#1C1A17] rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-[0.1em] hover:bg-[#801818] hover:text-white hover:border-[#801818] transition-colors shadow-sm text-center"
                  >
                    Agregar
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

    </div>
  )
}
