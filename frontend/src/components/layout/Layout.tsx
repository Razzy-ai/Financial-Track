import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapse = () => setCollapsed(prev => !prev);
  const toggleMobile = () => setMobileOpen(prev => !prev);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapseToggle={toggleCollapse}
        onMobileToggle={toggleMobile}
      />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar onMobileMenuClick={toggleMobile} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
