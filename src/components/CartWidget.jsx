import { useState } from "react";
import { useCart } from "./CartContext";
import cartIcon from "../assets/cart.png";
import '../Navbar.css';

function CartWidget() {
  const { cartItems, removeItem, clearCart, purchase } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const calcularTotal = () => {
    return cartItems.reduce((total, item) => {
      const cantidad = item.cantidad || 1;
      return total + (item.precio * cantidad);
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-widget-container">
      <div className="cart-widget" onClick={() => setIsOpen(!isOpen)}>
        <img src={cartIcon} alt="Cart" />
        <span className="item-count">{cartItems.length}</span>
      </div>

      {isOpen && (
        <div className="cart-dropdown">
          <h4>Mi Carrito</h4>
          {cartItems.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          ) : (
            <>
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index} className="cart-item">
                    <img src={item.imagen} alt={item.nombre} width={50} height={50} />
                    <div className="cart-item-details">
                      <span className="cart-item-name">{item.nombre}</span>
                      <div className="cart-item-price">
                        <span>${item.precio}</span>
                        {item.cantidad && <span className="cart-item-quantity">x{item.cantidad}</span>}
                      </div>
                    </div>
                   <button 
  onClick={() => removeItem(item.id)} 
  className="remove-item-btn"
  title="Eliminar del carrito"
>
  ❌
</button>
                  </li>
                ))}
              </ul>
              
              <div className="cart-total">
                <span>Total:</span>
                <span>${calcularTotal()}</span>
              </div>
              
              <div className="cart-actions">
                <button onClick={clearCart}>Vaciar</button>
                <button onClick={purchase}>Finalizar Compra</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CartWidget;

