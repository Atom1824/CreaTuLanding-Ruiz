function Categorias({ categorias, categoriaSeleccionada, onSelectCategoria }) {
  return (
    <div className="categorias-container">
      <h3>Filtrar por categoría:</h3>
      <div className="categorias-selector">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={`categoria-btn ${categoriaSeleccionada === categoria ? 'activa' : ''}`}
            onClick={() => onSelectCategoria(categoria)}
          >
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categorias;
