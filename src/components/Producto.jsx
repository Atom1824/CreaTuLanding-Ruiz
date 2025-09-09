// src/components/Producto.jsx
function Producto({ producto, onVerDetalle }) {
  return (
    <div className="product-item" data-aos="fade-up">
      <div className="product-item-content" onClick={() => onVerDetalle(producto)}>
        <img src={producto.imagen} alt={producto.nombre} width={100} />
        <h3>{producto.nombre}</h3>
        <p>Precio: ${producto.precio}</p>
        <p className="categoria-tag">Categoría: {producto.categoria}</p>
      </div>
    </div>
  );
}

export default Producto;
