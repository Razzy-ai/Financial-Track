import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">Finance Dashboard</div>
      <div className="flex items-center space-x-4">
        {/* Future: Add notifications, avatar, etc. */}
        <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
