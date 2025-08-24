
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.jsx';
import Productos from './components/ItemListContainer.jsx';
import ItemDetail from './components/ItemDetail.jsx';
import Footer from './components/Footer.jsx';
import { CartProvider } from './components/CartContext.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Productos mensaje="Bienvenido a nuestra tienda" />} />
              <Route path="/categoria/:categoriaId" element={<Productos mensaje="Productos por categoría" />} />
              <Route path="/producto/:id" element={<ItemDetail />} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;