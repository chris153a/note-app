package demoapp.com.example.demoapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import demoapp.com.example.demoapp.dao.CategoryDao;
import demoapp.com.example.demoapp.dao.NotesDao;
import demoapp.com.example.demoapp.model.Category;
import demoapp.com.example.demoapp.model.Note;

@Service
public class NoteServiceImpl implements NoteService {

    @Autowired
    private NotesDao notesDao;

    @Autowired
    private CategoryDao categoryDao;

    @Override
    public Note createNote(Note note) {

        if (note.getCategory() != null && note.getCategory().getId() != null) {
            Category c = categoryDao.findById(note.getCategory().getId()).orElse(null);
            note.setCategory(c);
        }

        return notesDao.save(note);
    }

    @Override
    public List<Note> getAllNotes() {
        return notesDao.findAll();
    }

    @Override
    public Note updateNote(Integer id, Note note) {

        Note n = notesDao.findById(id).orElse(null);

        if (n == null) return null;

        n.setActive(note.isActive());
        n.setMessage(note.getMessage());

        if (note.getCategory() != null && note.getCategory().getId() != null) {
            Category c = categoryDao.findById(note.getCategory().getId()).orElse(null);
            n.setCategory(c);
        } else {
            n.setCategory(null);
        }

        return notesDao.save(n);
    }

    @Override
    public void deleteNote(Integer id) {
        notesDao.deleteById(id);
    }

    @Override
    public List<Note> getNotesByActive(boolean active) {
        return notesDao.findByActive(active);
    }

    @Override
    public List<Note> getNotesByCategory(Long categoryId) {
        return notesDao.findByCategory_Id(categoryId);
    }
}