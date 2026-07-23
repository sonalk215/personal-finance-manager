import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    color: '#2196F3',
    icon: '📁',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    await axios.post('http://localhost:8080/api/categories', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    navigate('/categories');
  };

  return (
    <div className="category-form-container">
      <div className="category-card">
        <h2>Add Category</h2>

        <form className="category-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />

          <input
            name="icon"
            placeholder="📁"
            value={formData.icon}
            onChange={handleChange}
          />

          <button type="submit">Save Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
