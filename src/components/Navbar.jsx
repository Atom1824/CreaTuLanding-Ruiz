import logo from '../assets/logo.png'; 
import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';
import '../Navbar.css';

function Navbar() {
  return (
    <>
      <nav className='navBBar'>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: '100%' }} className='logo' />
        </Link>
        <div className='navBarList'>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/categoria/videojuego">PlayStation 5</Link></li>
          <li><Link to="/">Catalogo</Link></li>
        </div>
       <CartWidget/>
      </nav>
    </>
  );
}

export default Navbar;