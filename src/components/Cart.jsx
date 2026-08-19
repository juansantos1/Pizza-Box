import React, { useEffect, useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';
import './TruckButton.css';

// Utility to format price as currency
const formatPrice = (price) => {
  return '$' + price.toLocaleString('es-CO');
};

export default function Cart({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const buttonRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    branch: 'Av. Tenerife',
    phone: '',
    address: '',
    paymentMethod: 'En Efectivo'
  });

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setIsProcessing(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executeCheckoutRedirect = () => {
    let orderDetails = cartItems.map(item => {
      let additionsLines = item.additions.map(a => `    + Adición: ${a.name} (+ ${formatPrice(a.price)})`).join('\n');
      let itemTotal = item.unitPrice * item.quantity;
      
      let text = '';
      if (item.type === 'combined') {
        text = `  • ${item.quantity}x *${item.title}* (${item.size})\n`;
        text += `    - *Mitad 1:* ${item.half1}\n`;
        text += `    - *Mitad 2:* ${item.half2}`;
      } else {
        text = `  • ${item.quantity}x *${item.title}* (${item.size})`;
      }

      if (additionsLines) {
        text += `\n${additionsLines}`;
      }
      text += `\n    Subtotal: ${formatPrice(itemTotal)}`;
      return text;
    }).join('\n\n');

    const message = `🍕 *¡NUEVO PEDIDO - PIZZA BOX!* 🍕

👤 *Datos del Cliente:*
• *Nombre:* ${formData.name}
• *Celular:* ${formData.phone}
• *Sucursal:* ${formData.branch}
• *Dirección:* ${formData.address}
• *Método de Pago:* ${formData.paymentMethod}

🛒 *Detalle del Pedido:*
${orderDetails}

💰 *TOTAL A PAGAR:* *${formatPrice(cartTotal)}*`;

    const encodedMessage = encodeURIComponent(message);
    
    // Altico o Av. Tenerife
    const targetNumber = formData.branch === 'Av. Tenerife' ? '573193717988' : '573134012480';
    
    window.open(`https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodedMessage}`, '_blank');
    
    clearCart();
    setStep(3);
    setIsProcessing(false);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if(isProcessing) return;
    setIsProcessing(true);

    const button = buttonRef.current;
    if (!button) {
      executeCheckoutRedirect();
      return;
    }

    let box = button.querySelector('.box'),
        truck = button.querySelector('.truck');

    // Reset animation classes just in case
    button.classList.remove('done');
    if (!button.classList.contains('animation')) {
      button.classList.add('animation');

      gsap.to(button, { '--box-s': 1, '--box-o': 1, duration: .3, delay: .5 });
      gsap.to(box, { x: 0, duration: .4, delay: .7 });
      gsap.to(button, { '--hx': -5, '--bx': 50, duration: .18, delay: .92 });
      gsap.to(box, { y: 0, duration: .1, delay: 1.15 });
      gsap.set(button, { '--truck-y': 0, '--truck-y-n': -26 });

      gsap.to(button, {
          '--truck-y': 1,
          '--truck-y-n': -25,
          duration: .2,
          delay: 1.25,
          onComplete() {
              gsap.timeline({
                  onComplete() {
                      button.classList.add('done');
                      
                      setTimeout(() => {
                        executeCheckoutRedirect();
                      }, 1000);
                  }
              })
              .to(truck, { x: 0, duration: .4 })
              .to(truck, { x: 40, duration: 1 })
              .to(truck, { x: 20, duration: .6 })
              .to(truck, { x: 96, duration: .4 });

              gsap.to(button, { '--progress': 1, duration: 2.4, ease: "power2.in" });
          }
      });
    }
  };

  return (
    <>
      {/* Overlay for mobile and PC */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[99999] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-[100dvh] bg-white z-[100000] transition-transform duration-500 ease-in-out flex flex-col shadow-2xl
          w-[100vw] md:w-[460px]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-2xl font-serif font-bold text-[#1C1A17]">
            Carrito
          </h2>
          <button onClick={onClose} className="p-2 text-[#1C1A17] hover:bg-gray-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Dynamic Content: Empty State vs Items List */}
        {step === 3 ? (
          <div className="flex flex-col items-center justify-center flex-grow p-8 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-sans font-bold text-[#1C1A17] mb-3">
              ¡Pedido Enviado!
            </h3>
            <p className="text-gray-500 mb-10 text-sm max-w-[280px]">
              Tu pedido ha sido enviado con éxito a WhatsApp. Gracias por preferir a Pizza Box.
            </p>
            <button 
              onClick={onClose}
              className="w-full px-8 py-4 bg-[#1C1A17] text-white rounded-[14px] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors shadow-md"
            >
              Cerrar
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow p-8 text-center">
            <img 
              src="/images/logotipo-carrito.png" 
              alt="Carrito Vacío" 
              className="w-20 h-20 md:w-24 md:h-24 object-contain mb-8 opacity-40 grayscale"
            />
            <h3 className="text-xl md:text-2xl font-sans font-bold text-[#1C1A17] mb-4">
              Tu carrito está vacío
            </h3>
            <p className="text-sm text-gray-500 mb-10 max-w-[280px]">
              ¿Qué esperas? Explora nuestro menú y empieza a comprar.
            </p>
            <button 
              onClick={onClose}
              className="w-full px-8 py-4 bg-[#1C1A17] text-white rounded-[14px] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors shadow-md"
            >
              Explorar menú
            </button>
          </div>
        ) : step === 1 ? (
          <>
            {/* Scrollable Items List */}
            <div className="flex-grow overflow-y-auto p-6" style={{ scrollbarWidth: 'thin' }}>
              <div className="flex flex-col gap-6">
                {cartItems.map(item => (
                  <div key={item.cartItemId} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-[#F4F4F2] rounded-xl flex items-center justify-center shrink-0 p-2">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain drop-shadow-md" />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-[#1C1A17] leading-tight pr-2">{item.title}</h4>
                        <button 
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-2">
                        <p className="font-medium text-gray-700">{item.size}</p>
                        {item.type === 'combined' && (
                          <div className="mt-1 mb-1">
                            <p>• Mitad 1: {item.half1}</p>
                            <p>• Mitad 2: {item.half2}</p>
                          </div>
                        )}
                        {item.additions.length > 0 && (
                          <p className="mt-0.5">+ {item.additions.map(a => a.name).join(', ')}</p>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center mt-auto">
                        <span className="font-bold text-[#801818]">{formatPrice(item.unitPrice * item.quantity)}</span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-gray-100 rounded-full h-8 px-1">
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-gray-600 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#1C1A17]">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-gray-600 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Checkout Section */}
            <div className="p-6 pb-10 md:pb-6 border-t border-gray-100 bg-gray-50 shrink-0">
              <div className="flex justify-between items-center mb-4 text-lg">
                <span className="font-bold text-[#1C1A17]">Total</span>
                <span className="font-bold text-[#801818] text-xl">{formatPrice(cartTotal)}</span>
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full h-14 bg-[#1C1A17] text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors shadow-lg"
              >
                Continuar Orden
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Checkout Form */}
            <div className="flex-grow overflow-y-auto p-6" style={{ scrollbarWidth: 'thin' }}>
              <div className="mb-6 flex items-center">
                <button onClick={() => setStep(1)} className="text-gray-500 hover:text-[#1C1A17] flex items-center gap-2 text-sm font-medium transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver al carrito
                </button>
              </div>
              
              <h3 className="text-2xl font-sans font-bold text-[#1C1A17] mb-6">Datos de Envío</h3>
              
              <form id="checkout-form" className="flex flex-col gap-5" onSubmit={handleCheckout}>
                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-bold text-[#1C1A17]">Nombre</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Nombre sin apellido" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#801818]/20 focus:border-[#801818] transition-all"
                  />
                </div>

                {/* Sucursal */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="branch" className="text-sm font-bold text-[#1C1A17]">¿A qué sucursal deseas ordenar?</label>
                  <select 
                    id="branch" 
                    name="branch" 
                    required
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#801818]/20 focus:border-[#801818] transition-all bg-white"
                  >
                    <option value="Av. Tenerife">Av. Tenerife</option>
                    <option value="Altico">Altico</option>
                  </select>
                </div>

                {/* Teléfono */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-bold text-[#1C1A17]">Teléfono/Celular</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder="Para confirmar por WhatsApp" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#801818]/20 focus:border-[#801818] transition-all"
                  />
                </div>

                {/* Dirección */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="address" className="text-sm font-bold text-[#1C1A17]">Dirección</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    required 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    placeholder="Únicamente para la ciudad de Neiva, Huila" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#801818]/20 focus:border-[#801818] transition-all"
                  />
                </div>

                {/* Método de Pago Segmented */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-[#1C1A17]">¿Cómo deseas pagar?</label>
                  <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl mt-1">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'En Efectivo' }))}
                      className={`flex-1 py-3 flex flex-col md:flex-row items-center justify-center gap-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                        formData.paymentMethod === 'En Efectivo' 
                          ? 'bg-white shadow-sm text-[#1C1A17]' 
                          : 'text-gray-500 hover:text-[#1C1A17] hover:bg-white/50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2z"></path><path d="M16 12h.01"></path><path d="M12 12h.01"></path><path d="M8 12h.01"></path></svg>
                      Efectivo
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'Con Transferencia' }))}
                      className={`flex-1 py-3 flex flex-col md:flex-row items-center justify-center gap-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                        formData.paymentMethod === 'Con Transferencia' 
                          ? 'bg-white shadow-sm text-[#1C1A17]' 
                          : 'text-gray-500 hover:text-[#1C1A17] hover:bg-white/50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18"></path><path d="M7 15h.01"></path><path d="M11 15h2"></path></svg>
                      Transferencia
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Bottom Checkout Section for Step 2 */}
            <div className="p-6 pb-10 md:pb-6 border-t border-gray-100 bg-gray-50 shrink-0">
              <div className="flex justify-between items-center mb-4 text-lg">
                <span className="font-bold text-[#1C1A17]">Total a pagar</span>
                <span className="font-bold text-[#801818] text-xl">{formatPrice(cartTotal)}</span>
              </div>
              <button 
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="truck-button"
                ref={buttonRef}
              >
                  <span className="default">Hacer Orden</span>
                  <span className="success">
                      Orden Enviada
                      <svg viewBox="0 0 12 10">
                          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </svg>
                  </span>
                  <div className="truck">
                      <div className="wheel"></div>
                      <div className="back"></div>
                      <div className="front"></div>
                      <div className="box"></div>
                  </div>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}


