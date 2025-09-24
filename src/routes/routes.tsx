import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App"; 

// Importa as Páginas
import Dashboard from "../pages/dashboard/DashboardPage";
import { LoginPage } from "../pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login", 
    element: <LoginPage />,
  }
]);