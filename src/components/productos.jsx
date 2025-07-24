import { useState, useEffect } from 'react';
import '/src/productos.css'; 

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div className='productos'>
      <h2>Productos</h2>
      <div className='product-list'>
        {productos.map((producto) => (
          <div key={producto.id} className='product-item'>
            <img src={producto.image} alt={producto.title} width={100} />
            <h3>{producto.title}</h3>
            <p>Precio: ${producto.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
