import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/Transactions.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteTransaction = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions((prev) =>
        prev.filter((transaction) => transaction._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${API_BASE_URL}/api/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h1>Transactions</h1>
      </div>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td
                  className={
                    transaction.type === 'Income' ? 'income' : 'expense'
                  }
                >
                  {transaction.type === 'Income'
                    ? `+$${transaction.amount}`
                    : `-$${transaction.amount}`}
                </td>
                <td>
                  {transaction.category?.icon} {transaction.category?.name}
                </td>

                <td>{transaction.type}</td>

                <td>{new Date(transaction.date).toLocaleDateString()}</td>

                <td>{transaction.notes}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/edit-transaction/${transaction._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button onClick={() => deleteTransaction(transaction._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
