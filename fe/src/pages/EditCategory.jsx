import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    color: '#2196F3',
    icon: '📁',
  });

  useEffect(() => {
    const fetchCategory = async () => {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:8080/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const category = response.data.find((c) => c._id === id);

      if (category) {
        setFormData(category);
      }
    };

    fetchCategory();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateCategory = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    await axios.put(`http://localhost:8080/api/categories/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    navigate('/categories');
  };

  return (
    <div className="category-form-container">
      <div className="category-card">
        <h2>Edit Category</h2>

        <form className="category-form" onSubmit={updateCategory}>
          <h2>Edit Category</h2>

          <input name="name" value={formData.name} onChange={handleChange} />

          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />

          <input name="icon" value={formData.icon} onChange={handleChange} />

          <button type="submit">Update Category</button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
