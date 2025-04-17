import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ← Para leer el productId desde la URL
import crudService from "../../services/CrudService";
import DataGrid from "../../components/datagrid/Datagrid";

type Column<T> = {
  key: keyof T;
  label: string;
};

type Movimiento = {
  id: number;
  amount: number;
  date: string;
  movement_type: string; // Agregado según el modelo
  quantity: number; // Agregado según el modelo
  reason?: string; // Agregado según el modelo
  description?: string; // Agregado si es necesario
};

const Movement = () => {
  const { productId } = useParams<{ productId: string }>();
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovimientos = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token no encontrado");
        if (!productId) throw new Error("ID del producto no encontrado");

        const data = await crudService.getMovimientos(
          parseInt(productId),
          token
        );

        setMovimientos(
          data.map((item) => ({
            id: item.id ?? 0,
            amount: item.amount,
            date: item.date,
            movement_type: item.movement_type, // Asegúrate de que este campo esté presente
            quantity: item.quantity, // Asegúrate de que este campo esté presente
            reason: item.reason, // Agregado si es necesario
            description: item.description,
          }))
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar movimientos"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovimientos();
  }, [productId]);

  const columns: Column<Movimiento>[] = [
    { key: "id", label: "ID" },
    { key: "amount", label: "Monto" },
    { key: "date", label: "Fecha" },
    { key: "movement_type", label: "Tipo de Movimiento" }, // Agregado para mostrar tipo de movimiento
    { key: "quantity", label: "Cantidad" }, // Agregado para mostrar cantidad
    { key: "reason", label: "Razón" }, // Agregado si es necesario
    { key: "description", label: "Descripción" },
  ];

  return (
    <div>
      <h2>Movimientos del producto #{productId}</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <DataGrid columns={columns} data={movimientos} />
      )}
    </div>
  );
};

export default Movement;
