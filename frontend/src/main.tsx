import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Habits from "./pages/Habits";
import Settings from "./pages/Settings";
import LogIn from "./pages/LogIn";
import About from "./pages/About";

const router = createBrowserRouter([
  // Publik route (endast login)
  { path: "/login", element: <LogIn /> },

  // Skyddade routes
  {
    path: "/",
    element: <ProtectedRoute />, // kollar auth först
    children: [
      {
        element: <Layout />, // visas bara om auth OK
        children: [
          { index: true, element: <Home /> },
          { path: "habits", element: <Habits /> },
          { path: "settings", element: <Settings /> },
          { path: "about", element: <About /> },
        ],
      },
    ],
  },

  { path: "*", element: <div>404 Not Found</div> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
