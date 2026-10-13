import { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, editing, onCancelEdit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editing) {
            setTitle(editing.title || '');
            setDescription(editing.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({ title, description });
        if (!editing) {
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
                rows="2"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
            />
            <button
                type="submit"
                className="w-full bg-slate-800 text-white font-medium rounded-lg px-4 py-2.5 hover:bg-slate-700 transition"
            >
                {editing ? 'Save Changes' : 'Add Task'}
            </button>
            {editing && (
                <button
                    type="button"
                    onClick={onCancelEdit}
                    className="w-full text-slate-500 text-sm py-1 hover:text-slate-700"
                >
                    Cancel editing
                </button>
            )}
        </form>
    );
}