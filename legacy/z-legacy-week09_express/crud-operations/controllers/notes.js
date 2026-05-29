// controllers/notes.js
// Import our Note model
import Note from '../models/Note.js';
import User from '../models/User.js';

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.findAll({ include: User });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createNote = async (req, res) => {
    try {
        const {
            body: { UserId, content },
        } = req;
        if (!UserId || !content)
            return res
                .status(400)
                .json({ error: 'userId and content are required' });
        const note = await Note.create(req.body);
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const note = await Note.findByPk(id, { include: User });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const {
            body: { content },
            params: { id },
        } = req;
        if (!content)
            return res.status(400).json({ error: 'content required' });
        const note = await Note.findByPk(id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        await note.update(req.body);
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const note = await Note.findByPk(id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        await note.destroy();
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
