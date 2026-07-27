import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBudget = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    categoryId: '',
    amount: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('token');

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [categoryResponse, budgetResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/categories', {
            headers,
          }),

          axios.get('http://localhost:8080/api/budgets', {
            headers,
          }),
        ]);

        setCategories(categoryResponse.data);
        const budget = budgetResponse.data.find((item) => item.id === id);

        if (budget) {
          setFormData({
            categoryId: budget.category.id,
            amount: budget.budgetAmount,
            month: budget.month || '',
            year: budget.year || '',
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateBudget = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `http://localhost:8080/api/budgets/${id}`,

        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/budgets');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="budget-container">
      <div className="budget-card">
        <h2>Edit Budget</h2>

        <form onSubmit={updateBudget}>
          <label>Category</label>

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.icon}

                {category.name}
              </option>
            ))}
          </select>

          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <label>Month</label>
          <input
            type="number"
            name="month"
            min="1"
            max="12"
            value={formData.month}
            onChange={handleChange}
          />

          <label>Year</label>

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />

          <button type="submit">Update Budget</button>
          <button type="button" onClick={() => navigate('/budgets')}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBudget;
