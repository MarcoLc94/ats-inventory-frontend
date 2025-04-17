import { useEffect, useState } from "react";
import crudService from "../../services/CrudService";
import DataGrid from "../../components/datagrid/Datagrid";
import "./Category.css";

type Column<T> = {
  key: keyof T;
  label: string;
};

type Categoria = {
  name: string;
  description?: string;
};

const CategoryComponent = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState<Categoria>({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token no encontrado");

        const data = await crudService.getCategorias(token);

        // Verificar que data sea un array de Categorias
        if (Array.isArray(data)) {
          // Asegúrate de que 'id' siempre sea un número
          setCategorias(
            data.map((item) => ({
              name: item.name,
              description: item.description,
            }))
          );
        } else {
          setError("Datos de categorías no válidos");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar categorías"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  const columns: Column<Categoria>[] = [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
  ];

  const handleCreateCategory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token no encontrado");

      await crudService.createCategoria(newCategory, token);
      setShowModal(false);
      setNewCategory({ name: "", description: "" }); // Reset form
      // Refetch categories
      const data = (await crudService.getCategorias(token)) as Categoria[];

      setCategorias(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear categoría");
    }
  };

  return (
    <div>
      <h2>Categorías</h2>

      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => setShowModal(true)}>Nuevo</button>
        <span>Categoria</span>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <DataGrid columns={columns} data={categorias} />
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Crear Nueva Categoría</h3>
            <label>
              Nombre:
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </label>
            <label>
              Descripción:
              <textarea
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
            </label>
            <div>
              <button onClick={handleCreateCategory}>Guardar</button>
              <button onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryComponent;
