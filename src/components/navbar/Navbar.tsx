import React, { useState, useRef, useEffect } from "react";
import ProfileCard from "../profileCard/ProfileCard";

interface NavbarProps {
  onLogout: () => void;
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, userName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(false);

  const userData = {
    name: "Marco",
    email: "marco@mail.com",
    avatar: "",
    role: "admin",
  };

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

  return (
    <header className="navbar">
      <div></div>
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
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode(!darkMode)}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
