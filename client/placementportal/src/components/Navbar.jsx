import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { GraduationCap, Menu, X, Bell, User, LogOut, ChevronDown } from "lucide-react";


import { useSelector  , useDispatch} from "react-redux";
import { logout } from "../redux/slices/authSlice.js";
export function Navbar() {
    const dispatch = useDispatch();
  const {user , isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
        dispatch(logout())
    navigate("/");
  };

  const isLanding = location.pathname === "/";

  const studentLinks = [
    { to: "/student/dashboard", label: "Dashboard" },
    { to: "/student/companies", label: "Companies" },
    { to: "/student/applications", label: "Applications" },
    { to: "/student/profile", label: "Profile" },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/companies", label: "Companies" },
    { to: "/admin/students", label: "Students" },
  ];

  const links = user?.role === "admin" ? adminLinks : user?.role === "student" ? studentLinks : [];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={user ? (user.role === "admin" ? "/admin/dashboard" : "/student/dashboard") : "/"} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-blue-900 font-bold text-base">College Portal</span>
              <span className="text-gray-400 text-xs block -mt-1">Placement Cell</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    location.pathname === link.to
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:text-blue-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button className="relative p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-sm font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-800 leading-tight">{user.name.split(" ")[0]}</p>
                      <p className="text-xs text-gray-500 leading-tight capitalize">{user.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      {user.role === "student" && (
                        <Link
                          to="/student/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <User className="w-4 h-4" /> My Profile
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : isLanding ? (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
                  Register
                </Link>
              </div>
            ) : null}

            {/* Mobile menu button */}
            {user && (
              <button
                className="md:hidden p-2 text-gray-600 hover:text-blue-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && user && (
          <div className="md:hidden border-t border-gray-100 py-2 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  location.pathname === link.to
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 w-full text-left rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
