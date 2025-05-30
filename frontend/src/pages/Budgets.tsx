import { useEffect, useState, useCallback } from "react";
import BudgetForm from "../components/budgets/BudgetForm";
import BudgetCard from "../components/budgets/BudgetCard";
import { getBudgets } from "../api/budgets";
import type { CreateBudgetInput } from "finance-common";
import { useAuth } from "../hooks/useAuth";

const BudgetsPage = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const [budgets, setBudgets] = useState<CreateBudgetInput[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = useCallback(async () => {
    if (!userId) {
      setBudgets([]);
      setError("Please login to see your budgets.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getBudgets(userId);
      setBudgets(data);
    } catch (err) {
      console.error("Failed to load budgets", err);
      setError("Failed to load budgets. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  if (!userId) {
    return <p className="text-center mt-10">Please login to view budgets.</p>;
  }

  return (
    <main className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900">Budgets</h1>

      <section aria-label="Add new budget">
        <BudgetForm userId={userId} onSuccess={fetchBudgets} />
      </section>

      <section aria-label="List of budgets">
        {loading && (
          <p role="status" aria-live="polite" className="text-center text-gray-500">
            Loading budgets...
          </p>
        )}

        {error && (
          <p role="alert" className="text-center text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && budgets.length === 0 && (
          <p className="text-center text-gray-500">No budgets found. Add one above.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.category} // Ideally use budget.id if you have it
              category={budget.category}
              amount={budget.amount}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default BudgetsPage;
