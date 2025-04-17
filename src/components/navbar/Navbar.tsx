import React, { useState, useRef, useEffect } from "react";

interface NavbarProps {
  onLogout: () => void;
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, userName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="navbar">
      <div></div>
      <div className="user-profile" ref={dropdownRef}>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={onLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
        <button className="user-button" onClick={toggleDropdown}>
          <div className="user-avatar">
            <div className="avatar-dummy"></div>
          </div>
          <span className="user-name">{userName}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
