import logo from '../assets/logo.png'; 
import CartWidget from './CartWidget';
import { useState } from 'react';

import '../NavBar.css';

function Navbar() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <nav className='navBBar'>
        <a href="">
          <img src={logo} alt="Logo" style={{ height: '100%' }} className='logo' />
        </a>

       <CartWidget/>
      </nav>
    </>
  );
}

export default Navbar;

