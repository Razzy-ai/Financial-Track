import React, { useEffect, useState } from "react";
import Overview from "../components/dashboard/Overview";
import Chart from "../components/dashboard/Chart";
import Summary from "../components/dashboard/Summary";
import { getTransactions } from "../api/transactions";
import { getBudgets } from "../api/budgets";
import { getCategories } from "../api/categories";
import Loader  from "../components/common/Loader";
import { useAuth } from "../hooks/useAuth";
import type { Transaction, Budget, Category } from "@/types";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [txns, bdgts, cats] = await Promise.all([
          getTransactions().catch((err) => {
        console.error("❌ getTransactions error:", err);
        return [];
      }),
      getBudgets(userId).catch((err) => {
        console.error("❌ getBudgets error:", err);
        return [];
      }),
      getCategories().catch((err) => {
        console.error("❌ getCategories error:", err);
        return [];
         }),

        ]);
        setTransactions(txns);
        setBudgets(bdgts);
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <Loader />;

  // === Overview Data ===
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  // === Chart Data: Monthly Aggregation ===
  const monthlyData = transactions.reduce((acc: Record<string, number>, t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short", year: "numeric" });
    acc[month] = (acc[month] || 0) + t.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount: Number(amount),
  }));

  // === Summary Data: Category-wise Spend ===
  const categoryMap = new Map(categories.map((cat) => [cat.id, cat.name]));
  const summaryData = transactions.reduce((acc: Record<string, number>, txn) => {
    const catName = categoryMap.get(txn.categoryId) || "Uncategorized";
    acc[catName] = (acc[catName] || 0) + txn.amount;
    return acc;
  }, {});

  const summaryArray = Object.entries(summaryData).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div className="p-4 space-y-6">
      <Overview
        totalBudgets={budgets.length}
        totalTransactions={transactions.length}
        totalAmount={totalAmount}
      />
      <Chart data={chartData} />
      <Summary data={summaryArray} />
    </div>
  );
};

export default Dashboard;
