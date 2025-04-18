import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Drawer.css";

interface DrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, setIsOpen }) => {
  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(true);

  useEffect(() => {
    const checkWidth = () => {
      setShouldRenderDrawer(window.innerWidth > 500);
    };

    checkWidth(); // Verifica al montar

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (!shouldRenderDrawer) {
    return null;
  }

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <div className={`drawer-overlay ${isOpen ? "open" : ""}`}>
      <div className="drawer-content">
        <img
          src="/images/ats-logo-white.png"
          alt="Logo"
          className="drawer-logo"
          onClick={closeDrawer}
        />
        <ul className="drawer-menu">
          <li>
            <Link to="/" onClick={closeDrawer}>
              <span className="material-symbols-outlined">home</span>
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/categories" onClick={closeDrawer}>
              <span className="material-symbols-outlined">category</span>
              <span>Categorías</span>
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={closeDrawer}>
              <span className="material-symbols-outlined">inventory_2</span>
              <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link to="/users" onClick={closeDrawer}>
              <span className="material-symbols-outlined">group</span>
              <span>Usuarios</span>
            </Link>
          </li>
          <li>
            <Link to="/movements" onClick={closeDrawer}>
              <span className="material-symbols-outlined">swap_horiz</span>
              <span>Movimientos</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
