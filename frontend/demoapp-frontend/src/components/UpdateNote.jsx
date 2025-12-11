import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateNote, listNotes } from "../services/NoteService";
import { listCategories } from "../services/CategoryService";

const UpdateNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    listCategories().then(res => setCategories(res.data));
    listNotes().then((response) => {
      const note = response.data.find((n) => n.id == id);
      setMessage(note.message);
      setActive(note.active);
      setCategoryId(note.category ? note.category.id : "");
    });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedNote = { message, active, category: categoryId ? { id: Number(categoryId) } : null };
    updateNote(id, updatedNote).then(() => navigate("/notes"));
  };

  return (
    <div className="container">
      <h2 className="text-center mt-3">Edit Note</h2>
      <form className="card p-4">
        <label className="form-label">Message</label>
        <input className="form-control mb-3" value={message} onChange={(e) => setMessage(e.target.value)} />
        <label className="form-label">Status</label>
        <select className="form-control mb-3" value={active} onChange={(e) => setActive(e.target.value === "true")}>
          <option value={true}>Active</option>
          <option value={false}>Archived</option>
        </select>
        <label className="form-label">Category</label>
        <select className="form-control mb-3" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Sin categoría</option>
          {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};
export default UpdateNote;