import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Budgets = () => {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:8080/api/budgets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBudgets(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBudgets();
  }, []);

  const deleteBudget = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:8080/api/budgets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBudgets((prev) => prev.filter((budget) => budget.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="budgets-container">
      <div className="budget-header">
        <h1>Monthly Budgets</h1>

        <button onClick={() => navigate('/add-budget')}>Add Budget</button>
      </div>

      {budgets.map((budget) => (
        <div className="budget-card" key={budget.id}>
          <h2>
            {budget.category.icon}
            {budget.category.name}
          </h2>

          <p>
            Budget:
            <strong>${budget.budgetAmount}</strong>
          </p>

          <p>
            Spent:
            <strong>${budget.spent}</strong>
          </p>

          <p>
            Remaining:
            <strong>${budget.remaining}</strong>
          </p>

          {budget.exceeded && (
            <p className="warning">
              ⚠️ Budget exceeded by ${Math.abs(budget.remaining)}
            </p>
          )}

          <div className="budget-actions">
            <button onClick={() => navigate(`/edit-budget/${budget.id}`)}>
              Edit
            </button>

            <button onClick={() => deleteBudget(budget.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Budgets;
