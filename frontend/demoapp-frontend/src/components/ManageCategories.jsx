import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const API = "http://localhost:8080/api/v1";

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(`${API}/categories`);
    setCategories(res.data);
  };

  const addCategory = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/categories`, { name });
    setName("");
    load();
  };

  const deleteCategory = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
      await axios.delete(`${API}/categories/${id}`);
      load();
    }
  };

  return (
    <div className="container">
      <h2>Manage Categories</h2>

      {/* Botón de regresar */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/notes")}>Back to Notes</button>

      <form onSubmit={addCategory} className="mb-3">
        <input
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">Add</button>
      </form>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>
                <button 
                  className="btn btn-danger"
                  onClick={() => deleteCategory(c.id, c.name)}
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
}

export default ManageCategories;
