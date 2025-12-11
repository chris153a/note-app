import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../services/NoteService";
import { listCategories } from "../services/CategoryService";

const CreateNote = () => {
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listCategories().then(res => setCategories(res.data));
  }, []);

  const saveNote = (e) => {
    e.preventDefault();
    const note = { message, active, category: categoryId ? { id: Number(categoryId) } : null };
    createNote(note).then(() => navigate("/notes"));
  };

  return (
    <div className="container">
      <div className="card col-md-6 offset-md-3 p-4 mt-3">
        <h2 className="text-center">Add Note</h2>
        <form>
          <label>Message:</label>
          <input className="form-control mb-3" value={message} onChange={(e) => setMessage(e.target.value)} />
          <label>Status:</label>
          <select className="form-control mb-3" value={active} onChange={(e) => setActive(e.target.value === "true")}>
            <option value={true}>Active</option>
            <option value={false}>Archived</option>
          </select>
          <label>Category:</label>
          <select className="form-control mb-3" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">No category</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <button className="btn btn-success me-2" onClick={saveNote}>Save</button>
          {/* Botón de regresar */}
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/notes")}>Back to Notes</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;