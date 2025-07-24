import logo from '../assets/logo.png'; 
import cart from '../assets/cart.png';
import { useState } from 'react';

import '../Navbar.css';

function Navbar() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <nav className='navBBar'>
        <a href="">
          <img src={logo} alt="Logo" style={{ height: '100%' }} className='logo' />
        </a>

        <button className='carrito' onClick={() => setShowCart(!showCart)}>
          <img src={cart} alt="cart" className='cart-icon'/>
          <span className='cart-count'>0</span>
        </button>

        {showCart && (
          <div className='cart-details'>
            <p>Tu carrito está vacío</p>
            <span className='cart-total'>Total: $0</span>
            <button className='checkout-button'>Finalizar compra</button>
            <button className='close-cart' onClick={() => setShowCart(false)}>Cerrar</button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;

