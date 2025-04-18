import { useState } from "react";
import "./ProfileCard.css";

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
}

const ProfileCard = ({
  userData,
  onLogout,
  darkMode,
  toggleDarkMode,
}: UserProfileCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`user-profile-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Botón del avatar */}
      <button className="profile-avatar-btn" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={userData.avatar || "/default-avatar.png"}
          alt="User profile"
          className="profile-avatar-img"
        />
      </button>

      {/* Card de perfil */}
      {isOpen && (
        <>
          <div className="profile-card">
            {/* Encabezado con información del usuario */}
            <div className="profile-header">
              <img
                src={userData.avatar || "/default-avatar.png"}
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

            {/* Toggle para dark mode */}
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

            {/* Botón de logout */}
            <button
              className="profile-logout-btn"
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
            >
              <span className="logout-icon">⎋</span>
              Cerrar sesión
            </button>
          </div>

          {/* Overlay para cerrar al hacer click fuera */}
          <div className="profile-overlay" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
};

export default ProfileCard;
