import { useEffect, useState } from "react";
import crudService from "../../services/CrudService";
import DataGrid from "../../components/datagrid/Datagrid";

type Column<T> = {
  key: keyof T;
  label: string;
};

type Producto = {
  id: number;
  name: string;
  description?: string;
  stock: number;
  price: number; // Add this property
  category_id: number; // Add this property
};

const ProductComponent = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Producto>({
    id: 0,
    name: "",
    description: "",
    stock: 0,
    price: 0, // Add default value
    category_id: 0, // Add default value
  });

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token no encontrado");

        const data = await crudService.getProductos(token);

        // Asegurarse de que 'data' sea un array de productos
        if (Array.isArray(data)) {
          setProductos(
            data.map((item) => ({
              id: item.id || 0, // Asegurarse de que el id no sea undefined
              name: item.name,
              description: item.description,
              stock: item.stock || 0, // Asegurarse de que stock no sea undefined
              price: item.price,
              category_id: item.category_id,
            }))
          );
        } else {
          setError("Datos de productos no válidos");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar productos"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const columns: Column<Producto>[] = [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    { key: "stock", label: "Stock" },
    { key: "price", label: "price" },
    { key: "category_id", label: "category_id" },
  ];

  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token no encontrado");

      await crudService.createProducto(newProduct, token);
      setShowModal(false);
      setNewProduct({
        id: 0,
        name: "",
        description: "",
        stock: 0,
        price: 0,
        category_id: 0,
      }); // Reset form
      // Refetch products
      const data = (await crudService.getProductos(token)) as Producto[];

      setProductos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear producto");
    }
  };

  return (
    <div>
      <h2>Productos</h2>

      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => setShowModal(true)}>Nuevo</button>
        <span>Producto</span>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <DataGrid columns={columns} data={productos} />
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Crear Nuevo Producto</h3>
            <label>
              Nombre:
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </label>
            <label>
              Descripción:
              <textarea
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Stock:
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: +e.target.value })
                }
              />
            </label>
            <div>
              <button onClick={handleCreateProduct}>Guardar</button>
              <button onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComponent;
