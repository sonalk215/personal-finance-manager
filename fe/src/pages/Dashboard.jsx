import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [userResponse, transactionResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/auth/me', { headers }),
          axios.get('http://localhost:8080/api/transactions', { headers }),
        ]);
        setUser(userResponse.data);
        setTransactions(transactionResponse.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, [navigate]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const balance = totalIncome - totalExpense;

  const savingRate = totalIncome
    ? ((balance / totalIncome) * 100).toFixed(0)
    : 0;

  const expenseData = [];

  transactions
    .filter((transaction) => transaction.type === 'Expense')
    .forEach((transaction) => {
      const categoryName = transaction.category?.name;
      const existing = expenseData.find((item) => item.name === categoryName);
      if (existing) {
        existing.value += Number(transaction.amount);
      } else {
        expenseData.push({
          name: categoryName,
          value: Number(transaction.amount),
        });
      }
    });

  const barData = [
    {
      month: 'January',
      Income: 4000,
      Expense: 2000,
    },
    {
      month: 'February',
      Income: 5000,
      Expense: 2500,
    },
    {
      month: 'March',
      Income: 6000,
      Expense: 3000,
    },
  ];

  const savingsData = [
    {
      month: 'Jan',
      savings: 2000,
    },

    {
      month: 'Feb',
      savings: 3000,
    },

    {
      month: 'Mar',
      savings: 4500,
    },
  ];

  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Deleting transaction with id: ', id);
      await axios.delete(`http://localhost:8080/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions((prev) =>
        prev.filter((transaction) => transaction._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    navigate('/');
  };

  const navigateToAddTransaction = () => {
    navigate('/add-transaction');
  };

  return (
    <div className="dashboard-container">
      <h1>Personal Finance Manager</h1>

      <button onClick={navigateToAddTransaction}>Add Transaction</button>
      <button onClick={() => navigate('/categories')}>Manage Categories</button>

      <div className="summary-container">
        <div className="summary-card">
          <h3>Total Income</h3>
          <h2>${totalIncome}</h2>
        </div>
        <div className="summary-card">
          <h3>Total Expense</h3>
          <h2>${totalExpense}</h2>
        </div>
        <div className="summary-card">
          <h3>Balance</h3>
          <h2>${balance}</h2>
        </div>

        <div className="summary-card">
          <h3>Savings Rate</h3>
          <h2>{savingRate}%</h2>
        </div>
      </div>

      <h2>Recent Transactions</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>

            <th>Amount</th>

            <th>Category</th>

            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.slice(0, 5).map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>
                {transaction.type === 'Income'
                  ? `+$${transaction.amount}`
                  : `-$${transaction.amount}`}
              </td>
              <td>
                {transaction.category?.icon} {transaction.category?.name}
              </td>

              <td>{transaction.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Expense Distribution</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={expenseData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
        >
          {expenseData.map((item, index) => (
            <Cell key={index} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h2>Income vs Expense</h2>
      <BarChart width={600} height={300} data={barData}>
        <CartesianGrid />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar dataKey="Income" />

        <Bar dataKey="Expense" />
      </BarChart>

      <h2>Savings Trend</h2>
      <LineChart width={600} height={300} data={savingsData}>
        <CartesianGrid />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line type="monotone" dataKey="savings" />
      </LineChart>

      <div className="dashboard-card">
        <h2>Welcome {user?.name} 👋</h2>

        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td>{transaction.amount}</td>
                <td>
                  {transaction.category?.icon} {transaction.category?.name}
                </td>
                <td>{transaction.type}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
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

export default Dashboard;
