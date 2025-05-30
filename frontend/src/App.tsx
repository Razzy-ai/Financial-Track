import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Login from "./pages/Login";
import Recurring from "./pages/Recurring";
import Settings from "./pages/Settings";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes inside Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/recurring" element={<Recurring />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Fallback for any undefined route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
