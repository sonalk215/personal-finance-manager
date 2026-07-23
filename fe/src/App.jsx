import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';

import './App.css';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/edit-transaction/:id" element={<EditTransaction />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
      </Routes>
    </>
  );
}

export default App;
