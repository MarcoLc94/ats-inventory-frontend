import React, { useState, useRef, useEffect } from "react";
import ProfileCard from "../profileCard/ProfileCard";
import Drawer from "../drawer/Drawer";

interface NavbarProps {
  onLogout: () => void;
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, userName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const userData = {
    name: "Marco",
    email: "marco@mail.com",
    avatar: "",
    role: "admin",
  };

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth <= 700) {
        setMenuVisible(true);
      } else {
        setMenuVisible(false);
      }
    };

    checkWidth(); // Verifica al montar

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

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
    console.log("is working menu");
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenu = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header className="navbar">
      {!menuVisible && <div></div>}
      {menuVisible && (
        <span
          className="material-symbols-outlined span-inside"
          onClick={handleMenu}
        >
          menu
        </span>
      )}

      <Drawer isOpen={drawerOpen} setIsOpen={setDrawerOpen} />
      <div className="user-profile" ref={dropdownRef}>
        <button className="user-button" onClick={toggleDropdown}>
          <img
            src={userData.avatar || "images/default-avatar-white.png"}
            alt="Avatar"
            className="user-avatar-img"
            color="white"
          />
          <span className="user-name">{userName}</span>
          <span className="dropdown-icon">▼</span>
        </button>

        {isDropdownOpen && (
          <ProfileCard
            userData={userData}
            onLogout={onLogout}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
