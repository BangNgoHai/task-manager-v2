const express = require('express');
const db = require('../db');

const router = express.Router();

const mapRow = (row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    completed: !!row.completed,
    createdAt: row.created_at,
    updatedAt: row.updated_at
});

router.get('/', (req, res) => {
    const rows = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all();
    res.json(rows.map(mapRow));
});

router.get('/:id', (req, res) => {
    const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Task not found' });
    res.json(mapRow(row));
});

router.post('/', (req, res) => {
    const { title, description = '' } = req.body;
    if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const result = db
        .prepare('INSERT INTO tasks (title, description) VALUES (?, ?)')
        .run(title.trim(), description);
    const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(mapRow(row));
});

router.put('/:id', (req, res) => {
    const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Task not found' });

    const { title, description, completed } = req.body;
    const newTitle = title !== undefined ? String(title).trim() : row.title;
    const newDescription = description !== undefined ? String(description) : row.description;
    const newCompleted = completed !== undefined ? (completed ? 1 : 0) : row.completed;

    if (!newTitle) return res.status(400).json({ error: 'Title cannot be empty' });

    db.prepare(
        `UPDATE tasks
         SET title = ?, description = ?, completed = ?, updated_at = datetime('now')
         WHERE id = ?`
    ).run(newTitle, newDescription, newCompleted, req.params.id);

    const updated = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    res.json(mapRow(updated));
});

router.delete('/:id', (req, res) => {
    const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
});

module.exports = router;