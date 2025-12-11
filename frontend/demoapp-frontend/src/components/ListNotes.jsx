import React, { useEffect, useState } from "react";
import {
  listNotes,
  listActiveNotes,
  listArchivedNotes,
  listNotesByCategory,
  deleteNote
} from "../services/NoteService";
import { listCategories } from "../services/CategoryService";
import { useNavigate } from "react-router-dom";

const ListNotes = () => {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState("all");
  const [activeFilter, setActiveFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
    loadCategories();
  }, []);

  const fetchAll = () => {
    listNotes().then((r) => {
      setNotes(r.data);
      setAllNotes(r.data);
    });
  };

  const loadCategories = () => listCategories().then((r) => setCategories(r.data));

  const filterActive = () => {
    setFiltered("active");
    setActiveFilter(true);
    const activeNotes = allNotes.filter(note => note.active);
    setNotes(activeNotes);
  };

  const filterArchived = () => {
    setFiltered("archived");
    setActiveFilter(false);
    const archivedNotes = allNotes.filter(note => !note.active);
    setNotes(archivedNotes);
  };

  const filterByCategory = (id) => {
    setFiltered("category");
    let filteredNotes = allNotes.filter(note => note.category && note.category.id === id);

    if (filtered === "active") {
      filteredNotes = filteredNotes.filter(note => note.active); // Filtrar solo las notas activas de esa categoría
    } else if (filtered === "archived") {
      filteredNotes = filteredNotes.filter(note => !note.active); // Filtrar solo las notas archivadas de esa categoría
    }

    setNotes(filteredNotes);
  };

  const filterNoCategory = () => {
    setFiltered("noCategory");
    let noCategoryNotes = allNotes.filter(note => !note.category);

    if (filtered === "archived") {
      // Filtrar solo las notas archivadas sin categoría
      setNotes(noCategoryNotes.filter(note => !note.active));
    } else if (filtered === "active") {
      // Filtrar solo las notas activas sin categoría
      setNotes(noCategoryNotes.filter(note => note.active));
    } else {
      // Si no hay ningún filtro activo, mostrar las notas sin categoría
      setNotes(noCategoryNotes);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Notes</h2>

      <div className="mb-3">
        <button className="btn btn-primary mb-2" onClick={() => navigate("/add-note")}>
          Add Note
        </button>
      </div>

      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={fetchAll}>All</button>
        <button className="btn btn-success me-2" onClick={filterActive}>Active</button>
        <button className="btn btn-secondary me-2" onClick={filterArchived}>Archived</button>
        <button className="btn btn-warning me-2" onClick={() => navigate("/categories")}>Manage Categories</button>
        <button className="btn btn-dark me-2" onClick={filterNoCategory}>No Category</button>

        {categories.map((c) => (
          <button key={c.id} className="btn btn-info me-2" onClick={() => filterByCategory(c.id)}>
            {c.name}
          </button>
        ))}
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr><th>Id</th><th>Message</th><th>Status</th><th>Category</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.message}</td>
              <td>{note.active ? "Active" : "Archived"}</td>
              <td>{note.category?.name || "No Category"}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => navigate(`/edit-note/${note.id}`)}>Edit</button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this note?")) {
                      deleteNote(note.id).then(fetchAll);
                    }
                  }}
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

export default ListNotes;
