import { useState } from "react";
import { useCart } from "./CartContext.jsx"; 
import { db } from "../firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import '../components/Checkout.css';

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    ciudad: "",
    codigoPostal: ""
  });
  const [ordenCreada, setOrdenCreada] = useState(null);

  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const nuevaOrden = {
      items: cartItems.map(item => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad
      })),
      comprador: formData,
      total: cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
      fecha: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, "ordenes"), nuevaOrden);
      setOrdenCreada({ id: docRef.id, ...nuevaOrden });
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  if (ordenCreada) {
    return (
      <div className="orden-confirmacion">
        <h2>¡Gracias por tu compra!</h2>
        <p>ID de la orden: {ordenCreada.id}</p>
        <ul>
          {ordenCreada.items.map(item => (
            <li key={item.id}>
              {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
            </li>
          ))}
        </ul>
        <p>Total: ${ordenCreada.total}</p>
        <button onClick={() => navigate('/')}>Volver a la tienda</button>
      </div>
    );
  }

  return (
    <form className="checkout-form" onSubmit={manejarSubmit}>
      <h2>Checkout</h2>
      <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={manejarCambio} required />
      <input name="email" placeholder="Email" type="email" value={formData.email} onChange={manejarCambio} required />
      <input name="direccion" placeholder="Dirección" value={formData.direccion} onChange={manejarCambio} required />
      <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={manejarCambio} required />
      <input name="codigoPostal" placeholder="Código Postal" value={formData.codigoPostal} onChange={manejarCambio} required />
      <button type="submit">Proceder al pago</button>
    </form>
  );
}

export default Checkout;


