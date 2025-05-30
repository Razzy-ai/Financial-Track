import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  List,
  Layers,
  Repeat,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCollapseToggle: () => void;
  onMobileToggle: () => void;
}

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: Wallet },
  { to: "/budgets", label: "Budgets", icon: List },
  { to: "/categories", label: "Categories", icon: Layers },
  { to: "/recurring", label: "Recurring", icon: Repeat },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  mobileOpen,
  onCollapseToggle,
  onMobileToggle,
}) => {
  return (
    <>
      <aside
        className={`
          ${mobileOpen ? "block" : "hidden"} md:block
          fixed top-0 left-0 z-40 h-full 
          bg-gray-900 text-white shadow-md border-r border-gray-800
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Collapse Button */}
        <div className="flex justify-end p-2">
          <button
            onClick={onCollapseToggle}
            className="text-gray-400 hover:text-white p-1 rounded"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="px-2 space-y-2 mt-4">
          {links.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onMobileToggle}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-3 py-2 rounded-lg transition-colors
                  ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"}`
                }
              >
                <Icon size={20} />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Spacer for layout alignment */}
      <div className={`hidden md:block ${collapsed ? "w-20" : "w-64"}`} />
    </>
  );
};

export default Sidebar;
