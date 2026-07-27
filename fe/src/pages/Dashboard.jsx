import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/Dashboard.css';

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

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    savingRate: 0,

    expenseByCategory: [],
    recentTransactions: [],
  });

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

        const [userResponse, summaryResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/auth/me', { headers }),

          axios.get('http://localhost:8080/api/dashboard/summary', { headers }),
        ]);

        setUser(userResponse.data);

        setSummary(summaryResponse.data);
      } catch (error) {
        console.log(error);

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

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/');
  };

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

  return (
    <div className="dashboard-container">
      {/* =====================USER HEADER===================== */}

      <div className="dashboard-profile">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-content">
          <h1>Hello, {user?.name} 👋</h1>

          <p>Welcome back to your finance dashboard</p>
          <span>✉️ {user?.email}</span>
        </div>
      </div>

      <div className="summary-container">
        <div className="summary-card">
          <h3>Total Income</h3>

          <h2>${summary.totalIncome}</h2>
        </div>

        <div className="summary-card">
          <h3>Total Expense</h3>

          <h2>${summary.totalExpense}</h2>
        </div>

        <div className="summary-card">
          <h3>Balance</h3>

          <h2>${summary.balance}</h2>
        </div>

        <div className="summary-card">
          <h3>Savings Rate</h3>

          <h2>{summary.savingRate}%</h2>
        </div>
      </div>

      {/* =====================
 CHARTS
===================== */}

      <div className="charts-grid">
        <div className="chart-card">
          <h2>Expense Distribution</h2>

          <PieChart width={400} height={300}>
            <Pie
              data={summary.expenseByCategory}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {summary.expenseByCategory.map((item, index) => (
                <Cell key={index} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </div>

        <div className="chart-card">
          <h2>Income vs Expense</h2>

          <BarChart width={500} height={300} data={barData}>
            <CartesianGrid />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="Income" />

            <Bar dataKey="Expense" />
          </BarChart>
        </div>

        <div className="chart-card">
          <h2>Savings Trend</h2>

          <LineChart width={500} height={300} data={savingsData}>
            <CartesianGrid />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="savings" />
          </LineChart>
        </div>
      </div>

      {/* =====================
 RECENT TRANSACTIONS
===================== */}

      <div className="recent-section">
        <h2>Recent Transactions</h2>

        <table>
          <thead>
            <tr>
              <th>Title</th>

              <th>Amount</th>

              <th>Category</th>

              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {summary.recentTransactions.map((transaction) => (
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
      </div>
    </div>
  );
};

export default Dashboard;
