import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Finance Dashboard</div>
      <div>
        <button className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-900">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
