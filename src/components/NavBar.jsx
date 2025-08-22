import logo from '../assets/logo.png'; 
import CartWidget from './CartWidget';
import { useState } from 'react';

import '../Navbar.css';

function Navbar() {
 

  return (
    <>
      <nav className='navBBar'>
        <a href="">
          <img src={logo} alt="Logo" style={{ height: '100%' }} className='logo' />
        </a>
        <div className='navBarList'>
          <li><a href="/">Inicio</a></li>
          <li><a href="#">PlayStation 5</a></li>
          <li><a href="#">Catalogo</a></li>
        </div>
       <CartWidget/>
      </nav>
    </>
  );
}

export default Navbar;

