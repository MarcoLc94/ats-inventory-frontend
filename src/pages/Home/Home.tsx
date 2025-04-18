// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dummy data para gráficos (puedes sustituirlo por datos reales de tu API)
const productData = [
  { name: "Enero", quantity: 40 },
  { name: "Febrero", quantity: 35 },
  { name: "Marzo", quantity: 50 },
  { name: "Abril", quantity: 30 },
  { name: "Mayo", quantity: 70 },
];

const Home = () => {
  // const navigate = useNavigate();

  // Estado de la aplicación (puedes sustituir esto con tu lógica o API)
  const [inventoryData, setInventoryData] = useState({
    totalProducts: 120,
    inStock: 85,
    outOfStock: 35,
  });

  // Aquí puedes agregar un useEffect para obtener datos reales de tu API
  useEffect(() => {
    // Simula la carga de datos (puedes sustituirlo por una API real)
    // setInventoryData(...);
    console.log(setInventoryData);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Inicio</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Productos Totales</h3>
          <p>{inventoryData.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Productos en Stock</h3>
          <p>{inventoryData.inStock}</p>
        </div>
        <div className="stat-card">
          <h3>Productos Agotados</h3>
          <p>{inventoryData.outOfStock}</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Indicador Mensual</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;
