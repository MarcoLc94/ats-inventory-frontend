import { Dispatch, SetStateAction } from "react";
import "./ProfileCard.css";
import { useEffect, useRef } from "react";

interface UserData {
  name: string;
  email: string;
  avatar: string;
  role?: string;
}

interface UserProfileCardProps {
  userData: UserData;
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

const ProfileCard = ({
  userData,
  onLogout,
  darkMode,
  toggleDarkMode,
  setIsDropdownOpen,
  isDropdownOpen,
}: UserProfileCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Cierra el dropdown
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, setIsDropdownOpen]);

  return (
    <div className="user-profile-container">
      <div className="profile-card" ref={cardRef}>
        <div className="profile-header">
          <img
            src={userData.avatar || "images/default-avatar.png"}
            alt="Profile"
            className="profile-header-avatar"
          />
          <div className="profile-info">
            <h3 className="profile-name">{userData.name}</h3>
            <p className="profile-email">{userData.email}</p>
            {userData.role && (
              <span className="profile-role">{userData.role}</span>
            )}
          </div>
        </div>

        <div className="profile-darkmode-toggle">
          <span>Modo oscuro</span>
          <label className="darkmode-switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="darkmode-slider"></span>
          </label>
        </div>

        <button className="profile-logout-btn" onClick={onLogout}>
          <span className="logout-icon">⎋</span>
          Cerrar sesión
        </button>
      </div>

      {/* Overlay para cerrar al hacer click fuera */}
      <div className="profile-overlay" />
    </div>
  );
};

export default ProfileCard;
