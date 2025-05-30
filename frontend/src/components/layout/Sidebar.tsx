import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  List,
  Layers,
  Repeat,
  Settings,
  Menu,
  X,
} from "lucide-react";


const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: Wallet },
  { to: "/budgets", label: "Budgets", icon: List },
  { to: "/categories", label: "Categories", icon: Layers },
  { to: "/recurring", label: "Recurring", icon: Repeat },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden p-4">
        <button
          onClick={toggleMobile}
          className="text-gray-700 dark:text-white"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileOpen
            ? "block absolute z-50 bg-white dark:bg-gray-900"
            : "hidden"
        } md:block h-screen w-${collapsed ? "20" : "64"} 
        border-r border-gray-200 dark:border-gray-800 shadow-md p-4 fixed top-0 left-0 transition-all duration-300`}
      >
        {/* Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className="mb-6 p-2 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {collapsed ? "»" : "«"}
        </button>

        {/* Nav Links */}
        <ul className="space-y-4">
          {links.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                <Icon size={20} />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Spacer so content shifts right */}
      <div className={`hidden md:block w-${collapsed ? "20" : "64"}`} />
    </>
  );
};

export default Sidebar;
