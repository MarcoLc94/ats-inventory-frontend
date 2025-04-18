// components/ThemeToggle.tsx
import { useTheme } from "../../context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "var(--color-text)",
        color: "var(--color-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
      }}
      title={
        theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      }
    >
      <span style={{ fontSize: "24px" }}>{theme === "dark" ? "☀️" : "🌙"}</span>
    </div>
  );
};
