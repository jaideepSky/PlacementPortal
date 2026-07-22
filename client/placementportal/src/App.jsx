import { Outlet } from "react-router"

import { Toaster } from "react-hot-toast";
import { useCurrentUser } from "./hooks/useAuth.js";
import { Navbar } from "./components/Navbar.jsx";

function App() {

     useCurrentUser();
  return (
    <>
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,

    success: {
      className:
        "bg-green-600 text-white rounded-lg shadow-lg px-4 py-3",
    },

    error: {
      className:
        "bg-red-600 text-white rounded-lg shadow-lg px-4 py-3",
    },
  }}
/>    
      <Outlet/>
    </>
  )
}

export default App
