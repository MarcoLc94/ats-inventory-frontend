import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

interface LayoutProps {
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarHide, setSidebarHide] = useState(false);
  const username = "Admin";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setSidebarHide(false);
      } else {
        setSidebarHide(true);
      }
    };

    // Ejecutar al montar el componente
    handleResize();

    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpiar el event listener al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="layout">
      {sidebarHide && (
        <Sidebar
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
      )}
      <div className="main-area">
        <Navbar onLogout={onLogout} userName={username} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
