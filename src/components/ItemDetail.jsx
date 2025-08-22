import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import '../productos.css';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        console.log("Buscando producto con ID:", id);
        const response = await fetch('/productosgamer.json');
        const data = await response.json();
        
        const productoId = parseInt(id);
        const productoEncontrado = data.find(p => p.id === productoId);
        
        if (productoEncontrado) {
          console.log("Producto encontrado:", productoEncontrado); 
          setProducto(productoEncontrado);
        } else {
          console.log("Producto no encontrado para ID:", productoId); 
        }
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProducto();
  }, [id]);

  const incrementarCantidad = useCallback(() => {
    if (producto && cantidad < producto.stock) {
      setCantidad(prev => prev + 1);
      console.log("Cantidad incrementada a:", cantidad + 1);
    }
  }, [cantidad, producto]);

  const decrementarCantidad = useCallback(() => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
      console.log("Cantidad decrementada a:", cantidad - 1);
    }
  }, [cantidad]);

  const agregarAlCarrito = () => {
    if (producto) {
      addItem({...producto, cantidad});
      navigate('/');
    }
  };
  
  const volverAProductos = () => {
    navigate('/');
  };

  if (loading) {
    return <img src="./src/assets/loading3.webp" alt="Cargando..." className="loading" />;
  }

  if (!producto) {
    return <div className="producto-detalle">Producto no encontrado</div>;
  }

  return (
    <div className="producto-detalle-overlay">
      <div className="producto-detalle" data-aos="fade-up">
        <button className="cerrar-detalle" onClick={volverAProductos}>×</button>
        <div className="producto-detalle-contenido">
          <div className="producto-detalle-imagen">
            <img src={producto.imagen} alt={producto.nombre} />
          </div>
          <div className="producto-detalle-info">
            <h2>{producto.nombre}</h2>
            <p className="producto-detalle-categoria">Categoría: {producto.categoria}</p>
            <p className="producto-detalle-descripcion">{producto.descripcion}</p>
            <p className="producto-detalle-precio">Precio: ${producto.precio}</p>
            <p className="producto-detalle-stock">Stock disponible: {producto.stock}</p>
            
            <div className="producto-detalle-cantidad">
              <button 
                type="button"
                className="cantidad-btn" 
                onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                disabled={cantidad <= 1}
              >
                -
              </button>
              <span className="cantidad-valor">{cantidad}</span>
              <button 
                type="button"
                className="cantidad-btn" 
                onClick={() => producto && cantidad < producto.stock && setCantidad(cantidad + 1)}
                disabled={!producto || cantidad >= producto.stock}
              >
                +
              </button>
            </div>
            
            <button 
              className="agregar-carrito-btn"
              onClick={agregarAlCarrito}
              disabled={producto.stock === 0}
            >
              Agregar al carrito
            </button>
            
            <button 
              className="volver-btn"
              onClick={volverAProductos}
            >
              Volver a productos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;