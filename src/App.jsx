// src/App.jsx
import Navbar from './components/Navbar.jsx';
import Productos from './components/ItemListContainer.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Productos mensaje="Bienvenido a nuestra tienda" />
    </>

  );
}

export default App;