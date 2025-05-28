import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/transactions", label: "Transactions" },
    { path: "/budgets", label: "Budgets" },
    { path: "/categories", label: "Categories" },
    { path: "/recurring", label: "Recurring" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <aside className="w-56 bg-gray-100 h-screen p-4 sticky top-0">
      <ul className="space-y-3">
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded hover:bg-gray-300 ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-700"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
