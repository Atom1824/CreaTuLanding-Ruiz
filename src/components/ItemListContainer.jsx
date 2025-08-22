import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '/src/productos.css'; 
import {useCart} from './CartContext.jsx';

function Productos({ mensaje }) {
  const navigate = useNavigate();
  const { categoriaId } = useParams();
  
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  const agregarAlCarrito = (producto) =>{
    addItem(producto);
  }
  
  const verDetalleProducto = (producto) => {
    navigate(`/producto/${producto.id}`);
  }

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        const response = await fetch('/productosgamer.json');
        const data = await response.json();
        setProductos(data);
        
       
        const categoriasUnicas = ['todas', ...new Set(data.map(producto => producto.categoria))];
        setCategorias(categoriasUnicas);
        
       
        if (categoriaId) {
          setCategoriaSeleccionada(categoriaId);
          setProductosFiltrados(data.filter(producto => producto.categoria === categoriaId));
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
      filtrados = filtrados.filter(producto => producto.categoria === categoria);
    }
    
   
    if (textoBusqueda.trim() !== '') {
      filtrados = filtrados.filter(producto => 
        producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase())
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
    setBusqueda(textoBusqueda);
    filtrarProductos(categoriaSeleccionada, textoBusqueda);
  };

  if (loading) {
    return <img src="./src/assets/loading3.webp" alt="Cargando..." className="loading" />;
  }

  return (
    <div className='productos'>
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
      
      {/* Selector de categorías */}
      <div className="categorias-container">
        <h3>Filtrar por categoría:</h3>
        <div className="categorias-selector">
          {categorias.map((categoria) => (
            <button 
              key={categoria} 
              className={`categoria-btn ${categoriaSeleccionada === categoria ? 'activa' : ''}`}
              onClick={() => filtrarPorCategoria(categoria)}
            >
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className='product-list' >
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className='product-item' data-aos="fade-up">
            <div className="product-item-content" onClick={() => verDetalleProducto(producto)}>
              <img src={producto.imagen} alt={producto.nombre} width={100} />
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
              <p className="categoria-tag">Categoría: {producto.categoria}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;

