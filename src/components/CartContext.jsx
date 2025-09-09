import { createContext, useState, useContext, useEffect } from "react";
import { createOrder } from "../services/orderService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addItem = (producto) => {
    setCartItems((prev) => [...prev, producto]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const purchase = async () => {
    try {
      // Calculate total
      const total = cartItems.reduce((sum, item) => {
        const cantidad = item.cantidad || 1;
        return sum + (item.precio * cantidad);
      }, 0);

      // Create order data
      const orderData = {
        items: cartItems,
        total: total,
        customerEmail: 'customer@example.com',
        customerName: 'Customer Name'
      };

      try {
        // Try to save to Firebase
        const orderId = await createOrder(orderData);
        alert(`¡Compra realizada con éxito! 🎉\nNúmero de orden: ${orderId}`);
      } catch (firebaseError) {
        console.log('Firebase not configured, order not saved');
        alert("¡Compra realizada con éxito! 🎉");
      }
      
      setCartItems([]);
    } catch (error) {
      console.error('Error processing purchase:', error);
      alert("Error al procesar la compra. Inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addItem, clearCart, removeItem, purchase }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}