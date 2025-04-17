import { ReactNode } from "react";
import "./DataGrid.css";

// Columnas tipadas
type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

// Props del componente
type DataGridProps<T> = {
  columns: Column<T>[];
  data: T[];
};

// Componente genérico
function DataGrid<T extends Record<string, unknown>>({
  columns,
  data,
}: DataGridProps<T>) {
  return (
    <div className="data-grid">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No hay datos
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((col) => {
                  const value = item[col.key];
                  return (
                    <td key={String(col.key)}>
                      {col.render ? col.render(value, item) : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataGrid;
