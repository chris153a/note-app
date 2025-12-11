import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/notes";

export const listNotes = () => axios.get(API_URL);

export const listActiveNotes = () => axios.get(`${API_URL}/active`);

export const listArchivedNotes = () => axios.get(`${API_URL}/archived`);

export const listNotesByCategory = (id) => axios.get(`${API_URL}/category/${id}`);

export const createNote = (note) => axios.post(API_URL, note);

export const updateNote = (id, note) => axios.put(`${API_URL}/${id}`, note);

export const deleteNote = (id) => axios.delete(`${API_URL}/${id}`);