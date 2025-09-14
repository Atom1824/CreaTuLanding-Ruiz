import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import loadingGif from '../assets/loading3.webp';
import '../productos.css';
import { useCart } from '../components/CartContext.jsx';
import Categorias from '../components/Categorias.jsx';
import ListaProductos from '../components/ListaProductos.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

function ItemListContainer({ mensaje }) {
  const navigate = useNavigate();
  const { categoriaId } = useParams();

  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  const verDetalleProducto = (producto) => {
    navigate(`/producto/${producto.id}`);
  };

  useEffect(() => {
  const obtenerProductos = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const querySnapshot = await getDocs(collection(db, "productos"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setProductos(data);
      const categoriasUnicas = ['todas', ...new Set(data.map(p => p.categoria))];
      setCategorias(categoriasUnicas);

      if (categoriaId) {
        setCategoriaSeleccionada(categoriaId);
        setProductosFiltrados(data.filter(p => p.categoria === categoriaId));
      } else {
        setProductosFiltrados(data);
      }
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    } finally {
      setLoading(false);
    }
  };

  obtenerProductos();
}, [categoriaId]);

  const filtrarProductos = (categoria = categoriaSeleccionada, textoBusqueda = busqueda) => {
    let filtrados = productos;

    if (categoria !== 'todas') {
      filtrados = filtrados.filter(p => p.categoria === categoria);
    }

    if (textoBusqueda.trim() !== '') {
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase())
      );
    }

    setProductosFiltrados(filtrados);
  };

  const filtrarPorCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    filtrarProductos(categoria, busqueda);

    if (categoria === 'todas') {
      navigate('/');
    } else {
      navigate(`/categoria/${categoria}`);
    }
  };

  const manejarBusqueda = (e) => {
    const textoBusqueda = e.target.value;
    setBusqueda(e.target.value);
    filtrarProductos(categoriaSeleccionada, e.target.value);
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="productos">
      <h2>{mensaje}</h2>

      {/* Barra de búsqueda */}
      <div className="buscador-container">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={manejarBusqueda}
          className="buscador-input"
        />
      </div>

      {/* Categorías */}
      <Categorias 
        categorias={categorias} 
        categoriaSeleccionada={categoriaSeleccionada} 
        onSelectCategoria={filtrarPorCategoria} 
      />

      {/* Lista de productos */}
      <ListaProductos 
        productos={productosFiltrados} 
        onVerDetalle={verDetalleProducto} 
      />
    </div>
  );
}

export default ItemListContainer;

