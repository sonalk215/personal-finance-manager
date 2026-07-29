import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../css/AddTransaction.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const AddTransaction = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    type: 'Expense',
    notes: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category' && value === 'create-category') {
      navigate('/add-category'); // Adjust route to '/categories' if needed
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    await axios.post(`${API_BASE_URL}/api/transactions`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    navigate('/dashboard');
  };

  return (
    <div className="transaction-container">
      <div className="transaction-card">
        <form className="transaction-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            name="amount"
            placeholder="Amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="create-category">Create Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>

          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />

          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Expense">Expense</option>

            <option value="Income">Income</option>
          </select>

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <button className="submit-btn" type="submit">
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
