import React, { useEffect, useState } from "react";
import BudgetCard from "../components/budgets/BudgetCard";
import TransactionForm from "../components/transaction/TransactionForm";
import Overview from "../components/dashboard/Overview";
import Chart from "../components/dashboard/Chart";
import Summary from "../components/dashboard/Summary";

import type { Transaction, Category, SummaryItem, Budget, TransactionType } from "@/types";
import { getTransactions } from "../api/transactions";
import { getCategories } from "../api/categories";
import { getBudgets } from "../api/budgets";
import { getTransactionTypes } from "../api/transactionTypes";

const DashboardPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = "demo-user-id"; // 🔁 Replace this with dynamic ID from auth/context

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [txnData, catData, typeData, budgetData] = await Promise.all([
          getTransactions(),
          getCategories(),
          getTransactionTypes(),
          getBudgets(userId),
        ]);

        setTransactions(txnData);
        setCategories(catData);
        setTransactionTypes(typeData);
        setBudgets(budgetData);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalBudgets = budgets.length;
  const totalTransactions = transactions.length;
  const totalAmount = transactions.reduce((sum, txn) => sum + txn.amount, 0);

  // ✅ Summary by Category
  const summaryMap: Record<string, number> = {};
  transactions.forEach((txn) => {
    const category = categories.find((cat) => cat.id === txn.categoryId);
    const categoryName = category ? category.name : "Uncategorized";
    if (!summaryMap[categoryName]) {
      summaryMap[categoryName] = 0;
    }
    summaryMap[categoryName] += txn.amount;
  });

  const summaryItems: SummaryItem[] = Object.entries(summaryMap).map(
    ([category, amount]) => ({ category, amount })
  );

  // ✅ Monthly Chart Data
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(currentYear, i).toLocaleString("default", {
      month: "short",
      year: "numeric",
    })
  );

  const monthlyMap: Record<string, number> = {};
  months.forEach((m) => (monthlyMap[m] = 0));

  transactions.forEach((txn) => {
    const txnDate = new Date(txn.createdAt);
    const monthKey = txnDate.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    if (monthlyMap[monthKey] !== undefined) {
      monthlyMap[monthKey] += txn.amount;
    }
  });

  const monthlyData = months.map((month) => ({
    month,
    amount: monthlyMap[month],
  }));

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Overview
        totalBudgets={totalBudgets}
        totalTransactions={totalTransactions}
        totalAmount={totalAmount}
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {budgets.map((budget) => {
          const category = categories.find((c) => c.id === budget.categoryId);
          return (
            <BudgetCard
              key={budget.id}
              category={category?.name || "Unknown"}
              amount={budget.amount}
            />
          );
        })}
      </section>

      <Chart data={monthlyData} />

      <Summary data={summaryItems} />

      <section>
        <h2 className="text-xl font-semibold mb-2">Add New Transaction</h2>
        <TransactionForm
          categories={categories}
          transactionTypes={transactionTypes}
          onSuccess={async () => {
            setLoading(true);
            try {
              const updated = await getTransactions();
              setTransactions(updated);
            } finally {
              setLoading(false);
            }
          }}
        />
      </section>
    </div>
  );
};

export default DashboardPage;
