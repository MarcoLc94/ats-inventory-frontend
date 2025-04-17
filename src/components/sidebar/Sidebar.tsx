import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  sidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarVisible,
  setSidebarVisible,
}) => {
  const onClickIcon = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <aside
      className="sidebar"
      style={{
        width: sidebarVisible ? "140px" : "50px",
        transition: "width ease-in-out 0.2s", // Condición para mostrar u ocultar
      }}
    >
      <nav>
        <img
          src="/images/ats-logo-white.png"
          alt=""
          style={{
            width: sidebarVisible ? "70px" : "60px",
            transition: "width 0.5s ease",
            marginBottom: "10px",
          }}
          onClick={onClickIcon}
        />
        <ul>
          <li className="icon-menu">
            <Link to="/">
              {sidebarVisible ? (
                <div className="icon-inside">
                  <span className="material-symbols-outlined">home</span>
                  <span>Inicio</span>
                </div>
              ) : (
                <span className="material-symbols-outlined">home</span>
              )}
            </Link>
          </li>

          <li className="icon-menu">
            <Link to="/categories">
              {sidebarVisible ? (
                <div className="icon-inside">
                  <span className="material-symbols-outlined">category</span>
                  <span>Categorías</span>
                </div>
              ) : (
                <span className="material-symbols-outlined">category</span>
              )}
            </Link>
          </li>

          <li className="icon-menu">
            <Link to="/products">
              {sidebarVisible ? (
                <div className="icon-inside">
                  <span className="material-symbols-outlined">inventory_2</span>
                  <span>Productos</span>
                </div>
              ) : (
                <span className="material-symbols-outlined">inventory_2</span>
              )}
            </Link>
          </li>

          <li className="icon-menu">
            <Link to="/users">
              {sidebarVisible ? (
                <div className="icon-inside">
                  <span className="material-symbols-outlined">group</span>
                  <span>Usuarios</span>
                </div>
              ) : (
                <span className="material-symbols-outlined">group</span>
              )}
            </Link>
          </li>

          <li className="icon-menu">
            <Link to="/movements">
              {sidebarVisible ? (
                <div className="icon-inside">
                  <span className="material-symbols-outlined">swap_horiz</span>
                  <span>Movimientos</span>
                </div>
              ) : (
                <span className="material-symbols-outlined">swap_horiz</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
