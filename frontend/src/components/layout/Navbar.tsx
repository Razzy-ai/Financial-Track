import React from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMobileMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMobileMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Example: Clear localStorage or auth token if needed
    localStorage.removeItem("authToken");

    // Redirect to login page
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-40">
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={onMobileMenuClick}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">Finance Dashboard</div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
