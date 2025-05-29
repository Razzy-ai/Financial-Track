// src/pages/DashboardPage.tsx
import BudgetCard from "@/components/budgets/BudgetCard";
import TransactionForm from "@/components/transaction/TransactionForm";

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Example cards – in real app you’ll fetch budget data */}
        <BudgetCard category="Groceries" amount={2500} />
        <BudgetCard category="Transport" amount={1200} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Add New Transaction</h2>
        <TransactionForm onSuccess={() => console.log("Transaction added")} />
      </section>
    </div>
  );
};

export default DashboardPage;
