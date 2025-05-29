import { useEffect, useState } from "react";
import { getCategories } from "@/api/categories";
import type { Category } from "@/types"; // or './types' if local

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Categories</h1>

      <ul className="space-y-3">
        {categories.map((cat, idx) => (
          <li key={idx} className="p-4 border rounded shadow">
            <p><strong>Name:</strong> {cat.name}</p>
            <p><strong>Type ID:</strong> {cat.transactionTypeId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage