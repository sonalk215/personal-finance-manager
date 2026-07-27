import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBudget = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: '',
    amount: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitBudget = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/budgets', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/budgets');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:8080/api/categories',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="budget-container">
      <div className="budget-card">
        <h2>Add Monthly Budget</h2>

        <form onSubmit={submitBudget}>
          <label>Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>

          <label>Amount</label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Budget amount"
          />

          <label>Month</label>

          <input
            type="number"
            min="1"
            max="12"
            name="month"
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
          <button>Save Budget</button>
        </form>
      </div>
    </div>
  );
};

export default AddBudget;
