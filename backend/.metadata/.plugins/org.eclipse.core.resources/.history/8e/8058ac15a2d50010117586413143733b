package demoapp.com.example.demoapp.controller;

import demoapp.com.example.demoapp.model.Note;
import demoapp.com.example.demoapp.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
@CrossOrigin(origins = "*")
public class NotesController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public List<Note> getAll() {
        return noteService.getAllNotes();
    }

    @GetMapping("/active")
    public List<Note> getActive() {
        return noteService.getNotesByActive(true);
    }

    @GetMapping("/archived")
    public List<Note> getArchived() {
        return noteService.getNotesByActive(false);
    }

    @GetMapping("/category/{id}")
    public List<Note> getByCategory(@PathVariable Long id) {
        return noteService.getNotesByCategory(id);
    }

    @PostMapping
    public Note create(@RequestBody Note note) {
        return noteService.createNote(note);
    }

    @PutMapping("/{id}")
    public Note update(@PathVariable Integer id, @RequestBody Note note) {
        return noteService.updateNote(id, note);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        noteService.deleteNote(id);
    }
}