import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditTransaction = () => {
  const { id } = useParams();
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem('token');

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [categoryResponse, transactionResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/categories', { headers }),
          axios.get('http://localhost:8080/api/transactions', { headers }),
        ]);

        setCategories(categoryResponse.data);

        const transaction = transactionResponse.data.find(
          (item) => item._id === id
        );
        if (transaction) {
          setFormData({
            title: transaction.title,
            amount: transaction.amount,
            //category: transaction.category._id || transaction.category,
            category:
              typeof transaction.category === 'object'
                ? transaction.category._id
                : transaction.category,
            date: transaction.date.substring(0, 10),
            type: transaction.type,
            notes: transaction.notes,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [id]);

  const updateTransaction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:8080/api/transactions/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate('/dashboard');
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2>✏️ Edit Transaction</h2>
        <form className="edit-form" onSubmit={updateTransaction}>
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} />

          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <label>Transaction Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <div className="button-group">
            <button type="submit" className="update-btn">
              💾 Update Transaction
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
