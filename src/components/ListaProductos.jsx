import Producto from "./Producto";

function ListaProductos({ productos, onVerDetalle }) {
  return (
    <div className="product-list">
      {productos.map((producto) => (
        <Producto 
          key={producto.id} 
          producto={producto} 
          onVerDetalle={onVerDetalle} 
        />
      ))}
    </div>
  );
}

export default ListaProductos;
