import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import GuestLayout from "./components/GuestLayout";
import DefLayout from "./components/DefLayout";
import Technicien from "./views/Technicien/Technicien";
import AddTechnicien from "./views/Technicien/AddTechnicien";
import EditTechnicien from "./views/Technicien/EditTechnicien";
import Reports from "./views/Reports/Reports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/" />,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/technicien",
        element: <Technicien />,
      },
      {
        path: "/technicien/create",
        element: <AddTechnicien />,
      },
      {
        path: "/technicien/update/:id",
        element: <EditTechnicien />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
export default router;
