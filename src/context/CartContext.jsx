import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Generate a unique ID based on product details to group identical items
  const generateCartItemId = (productId, size, additions) => {
    // Additions are now objects { name, price }
    const additionsKey = [...additions].map(a => a.name).sort().join(',');
    return `${productId}-${size}-${additionsKey}`;
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const cartItemId = generateCartItemId(product.id, product.size, product.additions);
      const existingItemIndex = prevItems.findIndex(item => item.cartItemId === cartItemId);

      if (existingItemIndex >= 0) {
        // Item exists, just increment quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + product.quantity,
        };
        return newItems;
      } else {
        // New item
        return [...prevItems, { ...product, cartItemId }];
      }
    });
  };

  const updateQuantity = (cartItemId, delta) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}
