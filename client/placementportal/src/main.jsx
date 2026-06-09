
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import {Provider} from 'react-redux'
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import store from './redux/store';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import CompanyManagement from './pages/admin/CompanyManagement';
import StudentApplicationManagement from './pages/admin/StudentApplicationManagement';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path:'/login',
        element: <Login/>,
      },
      {
        path:'/register',
        element: <Register/>,
      },
      {
        path:'/admin/dashboard',
        element: <AdminDashboard/>,
      },
    
      {
        path:'/student/dashboard',
        element: <StudentDashboard/>,
      },
      {
        path:'/admin/companies',
        element: <CompanyManagement/>,
      },
      {
        path:'/admin/students',
        element:<StudentApplicationManagement/>

      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
   <RouterProvider router={router} />
 </Provider>
  
  
)
