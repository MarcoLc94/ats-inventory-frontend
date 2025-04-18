import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import { useEffect, useState } from "react";
import Layout from "./pages/layout/Layout";
import CategoryComponent from "./pages/Category/Category";
import Product from "./pages/Product/Product";
import User from "./pages/User/User";
import Movement from "./pages/Movement/Movement";
import { ToastContainer } from "react-toastify"; // Importa el contenedor
import "react-toastify/dist/ReactToastify.css"; // Asegúrate de importar el CSS aquí

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        {isAuthenticated ? (
          <Route element={<Layout onLogout={handleLogout} />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryComponent />} />
            <Route path="/products" element={<Product />} />{" "}
            {/* Cambié el componente */}
            <Route path="/users" element={<User />} /> {/* Ruta de usuarios */}
            <Route path="/movements" element={<Movement />} />{" "}
            {/* Ruta de movimientos */}
          </Route>
        ) : (
          <Route path="/" element={<Navigate to="/login" replace />} />
        )}
        <Route path="/notFound" element={<NotFound />} />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
