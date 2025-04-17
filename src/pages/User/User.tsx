import { useEffect, useState } from "react";
import crudService from "../../services/CrudService";
import DataGrid from "../../components/datagrid/Datagrid";

type Column<T> = {
  key: keyof T;
  label: string;
};

type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

const UserComponent = () => {
  const [usuarios, setUsuarios] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState<UserData>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token no encontrado");

        const data = await crudService.getUsers(token);

        // Asegúrate de que 'data' sea un array de usuarios
        if (Array.isArray(data)) {
          setUsuarios(
            data.map((item) => ({
              id: item.id ?? 0, // Asegurarse de que 'id' no sea undefined
              first_name: item.first_name || "", // Asegurar que 'first_name' sea un string
              last_name: item.last_name || "", // Asegurar que 'last_name' sea un string
              email: item.email || "", // Asegurar que 'email' sea un string
              role: item.role || "", // Asegurar que 'role' sea un string
            }))
          );
        } else {
          setError("Datos de usuarios no válidos");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar usuarios"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const columns: Column<UserData>[] = [
    { key: "first_name", label: "Nombre" },
    { key: "last_name", label: "Apellido" },
    { key: "email", label: "Correo Electrónico" },
    { key: "role", label: "Rol" },
  ];
  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token no encontrado");

      await crudService.registerUser(newUser);
      setShowModal(false);
      setNewUser({ id: 0, first_name: "", last_name: "", email: "", role: "" }); // Reset form

      // Refetch users
      const data = await crudService.getUsers(token);

      // Map the data to ensure type compatibility
      if (Array.isArray(data)) {
        setUsuarios(
          data.map((item) => ({
            id: item.id ?? 0,
            first_name: item.first_name || "",
            last_name: item.last_name || "",
            email: item.email || "",
            role: item.role || "",
          }))
        );
      } else {
        setError("Datos de usuarios no válidos");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear usuario");
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>

      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => setShowModal(true)}>Nuevo</button>
        <span>Usuario</span>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <DataGrid columns={columns} data={usuarios} />
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Crear Nuevo Usuario</h3>
            <label>
              Nombre:
              <input
                type="text"
                value={newUser.first_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, first_name: e.target.value })
                }
              />
            </label>
            <label>
              Apellido:
              <input
                type="text"
                value={newUser.last_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, last_name: e.target.value })
                }
              />
            </label>
            <label>
              Correo Electrónico:
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </label>
            <label>
              Rol:
              <input
                type="text"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              />
            </label>
            <div>
              <button onClick={handleCreateUser}>Guardar</button>
              <button onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
