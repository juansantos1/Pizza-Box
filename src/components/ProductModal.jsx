import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PRODUCTS } from '../data/products';


const ADDITIONS_CATEGORIES = {
  'Quesos': [
    { name: 'Queso Mozzarella', price: 6000 },
    { name: 'Parmesano', price: 5000 },
    { name: 'Queso Stracciatella', price: 5000 },
    { name: 'Queso Burrata', price: 18000 }
  ],
  'Carnes': [
    { name: 'Pepperoni', price: 5000 },
    { name: 'Jamón', price: 4000 },
    { name: 'Pollo', price: 5000 },
    { name: 'Carne', price: 5000 },
    { name: 'Tocineta', price: 4000 },
    { name: 'Cábano', price: 4000 },
    { name: 'Chorizo', price: 4000 },
    { name: 'Chorizo español', price: 6000 }
  ],
  'Vegetales y Extras': [
    { name: 'Salsa Pesto', price: 5000 },
    { name: 'Piña', price: 4000 },
    { name: 'Maíz', price: 4000 },
    { name: 'Champiñones', price: 4000 },
    { name: 'Jalapeños', price: 3000 },
    { name: 'Aceitunas', price: 4000 },
    { name: 'Aguacate', price: 3000 }
  ],
  'Dulce': [
    { name: 'Arequipe', price: 1500 }
  ]
};

const formatAdditionPrice = (price) => {
  return `${price / 1000} K`;
};

// Utility to format price as currency
const formatPrice = (price) => {
  return '$' + price.toLocaleString('es-CO');
};

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('Box (28 cms)');
  const [selectedAdditions, setSelectedAdditions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [pizzaType, setPizzaType] = useState('Completa');
  const [half2Id, setHalf2Id] = useState('');

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize('Box (28 cms)');
      setSelectedAdditions([]);
      setQuantity(1);
      setPizzaType('Completa');
      setHalf2Id('');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  // We can't return null early if we want AnimatePresence to work,
  // we just keep the active product data around for the exit animation.
  // Wait, if product is null, we shouldn't crash.
  
  // To avoid crashing during exit animation when product is null, 
  // we can store a cached copy of the product.
  const [cachedProduct, setCachedProduct] = useState(product);
  
  useEffect(() => {
    if (product) setCachedProduct(product);
  }, [product]);

  const activeProduct = product || cachedProduct;

  const isSpecialCategory = activeProduct?.category === 'Menú Infantil' || activeProduct?.category === 'Bebidas';
  const isCombinable = !isSpecialCategory && ['Clásica', 'Premium', 'Pizza Masters'].includes(activeProduct?.category);

  // For half 2 dropdown
  const combinableOptions = MOCK_PRODUCTS.filter(p => ['Clásica', 'Premium', 'Pizza Masters'].includes(p.category) && p.id !== activeProduct?.id);
  const half2Product = isCombinable && pizzaType === 'Combinada' && half2Id ? combinableOptions.find(p => p.id === parseInt(half2Id)) : null;

  const basePrice = activeProduct?.rawPrice || 45000; 
  const effectiveBasePrice = half2Product ? Math.max(basePrice, half2Product.rawPrice) : basePrice;

  const getMegaboxExtraPrice = (prod) => {
    if (!prod) return 0;
    const title = prod.title;
    if (title === 'Hawaiana' || title === 'Pollo y Champiñones') return 23000;
    if (title === 'Pepperoni' || title === 'Dolce Burrata') return 22000;
    if (title === 'Diavola' || title === 'Al pesto' || title === 'La roma' || title === 'Vesubio' || title === 'Master') return 24000;
    if (title === 'La Torino') return 27000;
    return 15000; // fallback
  };

  const megaboxExtraPrice = half2Product 
    ? Math.max(getMegaboxExtraPrice(activeProduct), getMegaboxExtraPrice(half2Product))
    : getMegaboxExtraPrice(activeProduct);

  const toggleAddition = (additionObj) => {
    setSelectedAdditions(prev => 
      prev.some(a => a.name === additionObj.name) 
        ? prev.filter(a => a.name !== additionObj.name)
        : [...prev, additionObj]
    );
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const calculateUnitPrice = () => {
    let total = effectiveBasePrice;
    if (!isSpecialCategory) {
      if (selectedSize === 'Megabox (38 cms)') {
        total += megaboxExtraPrice;
      }
      total += selectedAdditions.reduce((sum, item) => sum + item.price, 0);
    }
    return total;
  };

  const unitPrice = calculateUnitPrice();
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const isCombined = isCombinable && pizzaType === 'Combinada' && half2Product;
    addToCart({
      id: isCombined ? `${activeProduct.id}-${half2Product.id}` : activeProduct.id,
      title: isCombined ? 'Pizza Combinada' : activeProduct.title,
      type: isCombined ? 'combined' : 'normal',
      half1: isCombined ? activeProduct.title : null,
      half2: isCombined ? half2Product.title : null,
      image: activeProduct.image,
      size: selectedSize,
      additions: selectedAdditions,
      unitPrice: unitPrice,
      quantity: quantity
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999999] flex items-center justify-center"
            onClick={onClose}
          >
            {/* Modal Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white w-full h-full md:h-[85vh] md:max-h-[750px] md:w-[800px] lg:w-[900px] md:rounded-2xl flex flex-col relative overflow-hidden"
              onClick={e => e.stopPropagation()} // Prevent clicks inside from closing
            >
              
              {/* Close Button (Mobile & PC) */}
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 z-30 p-2 bg-white/80 md:bg-gray-100 backdrop-blur rounded-full text-gray-800 hover:bg-gray-200 transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* MAIN SCROLLABLE AREA FOR MOBILE / FLEX ROW FOR PC */}
              <div className="flex flex-col md:flex-row flex-grow overflow-y-auto md:overflow-hidden w-full h-full">

                {/* Left Column: Image */}
                <div 
                  className="w-full md:w-[55%] h-[250px] md:h-auto bg-[#F4F4F2] flex items-center justify-center p-0 md:p-4 shrink-0 relative rounded-b-2xl md:rounded-2xl md:overflow-hidden"
                  style={{ borderRadius: '16px', overflow: 'hidden' }}
                >
                  <img 
                    src={activeProduct.image} 
                    alt={activeProduct.title} 
                    className="w-full h-full object-cover max-h-[250px] md:max-h-none rounded-b-2xl md:rounded-2xl drop-shadow-xl"
                    style={{ borderRadius: '16px', overflow: 'hidden', objectFit: 'cover' }}
                  />
                </div>

                {/* Right Column: Content with Scroll */}
                <div className="w-full md:w-[45%] flex flex-col flex-grow bg-white md:overflow-y-auto h-auto md:h-full">
                  
                  {/* Scrollable Content */}
                  <div className="flex-grow p-6 md:p-8 pb-32 md:pb-32" style={{ scrollbarWidth: 'thin' }}>
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1A17] mb-2 uppercase">
                      {isCombinable && pizzaType === 'Combinada' ? `Mitad 1: ${activeProduct.title}` : activeProduct.title}
                    </h2>
                    <div className="text-xl font-bold text-[#801818] mb-3">
                      Desde {formatPrice(effectiveBasePrice)}
                    </div>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                      {activeProduct.description}
                    </p>
                  </div>

              {/* Pizza Type Toggle */}
              {isCombinable && (
                <div className="mb-8">
                  <h3 className="font-bold text-[#1C1A17] mb-3 uppercase tracking-wide text-sm flex items-center justify-between">
                    <span>¿Cómo quiere su pizza? <span className="text-red-500">*</span></span>
                  </h3>
                  <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl">
                    <button
                      onClick={() => setPizzaType('Completa')}
                      className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                        pizzaType === 'Completa' ? 'bg-white shadow-sm text-[#1C1A17]' : 'text-gray-500 hover:text-[#1C1A17]'
                      }`}
                    >
                      Completa (Sabor original)
                    </button>
                    <button
                      onClick={() => setPizzaType('Combinada')}
                      className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                        pizzaType === 'Combinada' ? 'bg-white shadow-sm text-[#1C1A17]' : 'text-gray-500 hover:text-[#1C1A17]'
                      }`}
                    >
                      Combinada (Mitad y Mitad)
                    </button>
                  </div>
                </div>
              )}

              {/* Half 2 Selection */}
              {isCombinable && pizzaType === 'Combinada' && (
                <div className="mb-8">
                  <h3 className="font-bold text-[#1C1A17] mb-3 uppercase tracking-wide text-sm flex items-center justify-between">
                    <span>Selecciona la Mitad 2: <span className="text-red-500">*</span></span>
                  </h3>
                  <select
                    value={half2Id}
                    onChange={(e) => setHalf2Id(e.target.value)}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#801818] transition-all bg-white"
                  >
                    <option value="" disabled>Seleccione un sabor...</option>
                    {combinableOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.title} ({formatPrice(opt.rawPrice)})</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Size Selection */}
              {!isSpecialCategory && (
                <div className="mb-8">
                  <h3 className="font-bold text-[#1C1A17] mb-3 uppercase tracking-wide text-sm flex items-center justify-between">
                    <span>1. Tamaño <span className="text-red-500">*</span></span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Obligatorio</span>
                  </h3>
                  <div className="flex flex-col gap-3">
                    {['Box (28 cms)', 'Megabox (38 cms)'].map(size => (
                      <label 
                        key={size} 
                        onClick={() => setSelectedSize(size)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedSize === size ? 'border-[#801818] bg-[#801818]/5' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedSize === size ? 'border-[#801818]' : 'border-gray-300'
                          }`}>
                            {selectedSize === size && <div className="w-2.5 h-2.5 bg-[#801818] rounded-full"></div>}
                          </div>
                          <span className="font-semibold text-gray-800">{size}</span>
                        </div>
                        {size === 'Megabox (38 cms)' && <span className="text-sm font-semibold text-[#801818]">+{formatPrice(megaboxExtraPrice)}</span>}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Additions Selection */}
              {!isSpecialCategory && (
                <div className="mb-4">
                  <h3 className="font-bold text-[#1C1A17] mb-1 uppercase tracking-wide text-sm flex items-center justify-between">
                    <span>2. Adiciones Extras</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Opcional</span>
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    {pizzaType === 'Combinada' 
                      ? 'Las adiciones se aplicarán a TODA la pizza combinada' 
                      : 'Personaliza tu pizza con tus ingredientes favoritos'}
                  </p>
                  
                  {Object.entries(ADDITIONS_CATEGORIES).map(([category, items]) => (
                    <div key={category} className="mb-6">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{category}</h4>
                      <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
                        {items.map(additionObj => {
                          const isSelected = selectedAdditions.some(a => a.name === additionObj.name);
                          return (
                            <label 
                              key={additionObj.name}
                              className={`flex items-center p-2.5 md:p-3 rounded-lg border cursor-pointer transition-all ${
                                isSelected ? 'border-[#801818] bg-[#801818]/5' : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              <input 
                                type="checkbox" 
                                className="hidden" 
                                checked={isSelected}
                                onChange={() => toggleAddition(additionObj)}
                              />
                              <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 shrink-0 ${
                                isSelected ? 'bg-[#801818] border-[#801818]' : 'border-gray-300'
                              }`}>
                                {isSelected && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-sm font-medium text-gray-700 leading-tight">
                                {additionObj.name} <span className="text-gray-400 font-normal whitespace-nowrap">(+ {formatAdditionPrice(additionObj.price)})</span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
                </div>
              </div>

            {/* Fixed Bottom Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 md:left-auto md:right-0 md:w-[45%] bg-white border-t border-gray-100 p-4 md:p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-20">
              <div className="flex items-center gap-4">
                
                {/* Quantity Selector */}
                <div className="flex items-center bg-gray-100 rounded-full p-1 h-12 md:h-14">
                  <button 
                    onClick={handleDecrease}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-gray-600 font-bold transition-all disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-bold text-[#1C1A17]">{quantity}</span>
                  <button 
                    onClick={handleIncrease}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-gray-600 font-bold transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  disabled={isCombinable && pizzaType === 'Combinada' && !half2Id}
                  className="flex-grow h-12 md:h-14 bg-[#801818] text-white rounded-full font-bold uppercase tracking-wider text-sm md:text-base hover:bg-[#601212] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Agregar {formatPrice(totalPrice)}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
