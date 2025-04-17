// src/services/crudService.ts
const BASE_URL = import.meta.env.VITE_LOCAL_URL;

type Method = "GET" | "POST" | "PUT" | "DELETE";

// First, let's add interfaces for our data structures
interface LoginData {
  email: string;
  password: string;
}

interface UserData {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  role?: string;
}

interface ProductData {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id: number;
}

interface CategoriaData {
  id?: number;
  name: string;
  description?: string;
}

interface MovimientoData {
  id: number;
  amount: number;
  date: string;
  movement_type: string; // Agregado según el modelo
  quantity: number; // Agregado según el modelo
  reason?: string; // Agregado según el modelo
  description?: string; // Agregado si es necesario
}

// Update the request function
async function request<T, D = Record<string, unknown>>(
  endpoint: string,
  method: Method = "GET",
  data?: D,
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error ${response.status}`);
  }

  return response.json();
}

// Update the generic CRUD methods
const crudService = {
  get: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, "GET", undefined, token),
  post: <T, D>(endpoint: string, data: D, token?: string) =>
    request<T, D>(endpoint, "POST", data, token),
  put: <T, D>(endpoint: string, data: D, token?: string) =>
    request<T, D>(endpoint, "PUT", data, token),
  delete: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, "DELETE", undefined, token),

  // Auth endpoints
  login: (data: LoginData) =>
    request<{ token: string }, LoginData>("/login", "POST", data),
  logout: (token: string) => request("/logout", "DELETE", undefined, token),
  refreshToken: () => request<{ token: string }>("/refresh_token", "POST"),

  // User endpoints
  registerUser: (data: UserData) =>
    request<UserData, UserData>("/register", "POST", data),
  getUsers: (token: string) =>
    request<UserData[]>("/users", "GET", undefined, token),
  getUserById: (id: number, token: string) =>
    request<UserData>(`/users/${id}`, "GET", undefined, token),
  updatePassword: (id: number, data: { password: string }, token: string) =>
    request<UserData>(`/users/${id}/update_password`, "PUT", data, token),
  updatePermissions: (id: number, data: { role: string }, token: string) =>
    request<UserData>(`/users/${id}/update_permissions`, "PUT", data, token),

  // Product endpoints
  getProductos: (token: string) =>
    request<ProductData[]>("/products", "GET", undefined, token),
  createProducto: (data: ProductData, token: string) =>
    request<ProductData, ProductData>("/products", "POST", data, token),
  getProductoById: (id: number, token: string) =>
    request<ProductData>(`/products/${id}`, "GET", undefined, token),

  // Category endpoints
  getCategorias: (token: string) =>
    request<CategoriaData[]>("/categories", "GET", undefined, token),
  createCategoria: (data: CategoriaData, token: string) =>
    request<CategoriaData, CategoriaData>("/categories", "POST", data, token),

  // Movement endpoints
  getMovimientos: (productoId: number, token: string) =>
    request<MovimientoData[]>(
      `/products/${productoId}/movements`,
      "GET",
      undefined,
      token
    ),
  createMovimiento: (productoId: number, data: MovimientoData, token: string) =>
    request<MovimientoData, MovimientoData>(
      `/products/${productoId}/movements`,
      "POST",
      data,
      token
    ),
  approveMovimiento: (id: number, token: string) =>
    request<MovimientoData>(`/movements/${id}/approve`, "PUT", {}, token),

  // Report endpoints remain the same
  getInventoryValue: (token: string) =>
    request<Record<string, unknown>>(
      "/reports/inventory_value",
      "GET",
      undefined,
      token
    ),
  getMovementSummary: (token: string) =>
    request<Record<string, unknown>>(
      "/reports/movement_summary",
      "GET",
      undefined,
      token
    ),
  getStockAlerts: (token: string) =>
    request<Record<string, unknown>>(
      "/reports/stock_alerts",
      "GET",
      undefined,
      token
    ),

  healthCheck: () => request<{ status: string }>("/health", "GET"),
};

export default crudService;
