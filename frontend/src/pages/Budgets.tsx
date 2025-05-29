import { useEffect, useState } from "react";
import BudgetForm from "@/components/budgets/BudgetForm";
import BudgetCard from "@/components/budgets/BudgetCard";
import { getBudgets } from "@/api/budgets";
import type { CreateBudgetInput } from "finance-common";

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState<CreateBudgetInput[]>([]);
  const userId = "demo-user-id"; // replace with actual user ID

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (err) {
      console.error("Failed to load budgets", err);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Budgets</h1>

      <BudgetForm userId={userId} onSuccess={fetchBudgets} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {budgets.map((budget, idx) => (
          <BudgetCard key={idx} category={budget.category} amount={budget.amount} />
        ))}
      </div>
    </div>
  );
};

export default BudgetsPage;
