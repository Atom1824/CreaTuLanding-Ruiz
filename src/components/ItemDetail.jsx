import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, query, where, getDocs } from "firebase/firestore";
import loadingGif from '../assets/loading3.webp';
import '../productos.css';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const { addItem, cartItems } = useCart();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const q = query(collection(db, "productos"), where("id", "==", Number(id)));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          setProducto({ id: docSnap.data().id, ...docSnap.data() });
        } else {
          setProducto(null);
          console.log("Producto no encontrado para ID:", id);
        }
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerProducto();
  }, [id]);

  const agregarAlCarrito = () => {
    if (producto) {
      addItem(producto, cantidad);
      console.log("Producto agregado:", { ...producto, cantidad });
      navigate('/');
    }
  };

  if (loading) return <img src={loadingGif} alt="Cargando..." className="loading" />;
  if (!producto) return <div className="producto-detalle">Producto no encontrado</div>;

  return (
    <div className="producto-detalle-overlay">
      <div className="producto-detalle" data-aos="fade-up">
        <button onClick={() => navigate('/')}>×</button>
        <div className="producto-detalle-contenido">
          <div className="producto-detalle-imagen">
            <img src={producto.imagen} alt={producto.nombre} />
          </div>
          <div className="producto-detalle-info">
            <h2>{producto.nombre}</h2>
            <p>Categoría: {producto.categoria}</p>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Stock: {producto.stock}</p>

            <div>
              <button onClick={() => setCantidad(c => Math.max(1, c - 1))}>-</button>
              <span>{cantidad}</span>
              <button onClick={() => setCantidad(c => Math.min(c + 1, producto.stock))}>+</button>
            </div>

            <button onClick={agregarAlCarrito} disabled={producto.stock === 0}>Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
