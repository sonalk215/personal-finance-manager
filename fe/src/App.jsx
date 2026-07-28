import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';

import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import AddBudget from './pages/AddBudget';
import EditBudget from './pages/EditBudget';

function App() {
  const location = useLocation();

  const hideHeader = location.pathname === '/';
  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/transactions" element={<Transactions />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/edit-transaction/:id" element={<EditTransaction />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/add-budget" element={<AddBudget />} />
        <Route path="/edit-budget/:id" element={<EditBudget />} />
      </Routes>
    </>
  );
}

export default App;
