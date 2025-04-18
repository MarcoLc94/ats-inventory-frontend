import { useState } from "react";
import { useNavigate } from "react-router-dom";
import crudService from "../../services/CrudService";
import "./Login.css";
import ToastService from "../../services/toast/ToastService";

type LoginProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const Login = ({ setIsAuthenticated }: LoginProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await crudService.login(formData);
      localStorage.setItem("authToken", response.token);
      setIsAuthenticated(true);
      navigate("/");
      ToastService.success("¡Inicio de sesión exitoso!"); // Opcional: mensaje de éxito
    } catch (err) {
      // Extrae el mensaje de error de la respuesta
      if (err instanceof Error) {
        try {
          // Si el error es un objeto JSON (como {"error":"Invalid email or password"})
          const errorData = JSON.parse(err.message);
          ToastService.error(errorData.error); // Muestra el mensaje del servidor
        } catch (parseError) {
          console.log(parseError);
          // Si no es JSON, muestra el mensaje genérico
          ToastService.error("Credenciales incorrectas");
        }
      } else {
        ToastService.error("Error desconocido");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleLogin}>
          <div className="img-container">
            <img src="/images/ats-logo.jpg" alt="" width={"200px"} />
          </div>
          <h2 className="login-title">Iniciar Sesión</h2>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
