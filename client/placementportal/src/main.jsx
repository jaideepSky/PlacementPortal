import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Provider } from "react-redux";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import store from "./redux/store";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import CompanyManagement from "./pages/admin/CompanyManagement";
import StudentApplicationManagement from "./pages/admin/StudentApplicationManagement";
import StudentProfile from "./pages/student/StudentProfile";
import Student from "./pages/student/Student";
import Admin from "./pages/admin/Admin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
        path: "dashboard",
        element: <AdminDashboard />,
      },

      {
        path: "companies",
        element: <CompanyManagement />,
      },
      {
        path: "students",
        element: <StudentApplicationManagement />,
      },
        ]
        
      },

      {
        path : '/student',
        element : <Student/>,
        children : [
            {
        path: "dashboard",
        element: <StudentDashboard />,
      },
     
      {
        path: "profile",
        element: <StudentProfile />,
      },
        ]
      },

    
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
