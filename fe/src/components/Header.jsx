import { useNavigate } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/dashboard')}>
        💰 Personal Finance Manager
      </div>

      <nav className="nav-links">
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button onClick={() => navigate('/transactions')}>Transactions</button>
        <button onClick={() => navigate('/add-transaction')}>
          Add Transaction
        </button>

        <button onClick={() => navigate('/categories')}>Categories</button>

        <button onClick={() => navigate('/budgets')}>Budgets</button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
