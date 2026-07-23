import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:8080/api/categories',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:8080/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories((prev) => prev.filter((category) => category._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Categories</h1>

        <button
          className="btn btn-primary"
          onClick={() => navigate('/add-category')}
        >
          Add Category
        </button>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Icon</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>

              <td>
                <div
                  className="color-box"
                  style={{ background: category.color }}
                />
              </td>

              <td>{category.icon}</td>

              <td className="actions">
                <button
                  className="btn btn-warning"
                  onClick={() => navigate(`/edit-category/${category._id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteCategory(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
