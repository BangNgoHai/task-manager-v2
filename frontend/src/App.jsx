import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { getTasks, createTask, updateTask, deleteTask } from './api.js';

const FILTERS = ['all', 'active', 'completed'];

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getTasks()
            .then((res) => setTasks(res.data))
            .catch(() => setError('Failed to load tasks'))
            .finally(() => setLoading(false));
    }, []);

    const handleAdd = async (data) => {
        try {
            const res = await createTask(data);
            setTasks((prev) => [res.data, ...prev]);
            setError('');
        } catch (e) {
            setError(e.response?.data?.error || 'Failed to add task');
        }
    };

    const handleUpdate = async (id, data) => {
        try {
            const res = await updateTask(id, data);
            setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
            setEditing(null);
            setError('');
        } catch (e) {
            setError(e.response?.data?.error || 'Failed to update task');
        }
    };

    const handleToggle = async (task) => {
        await handleUpdate(task.id, { completed: !task.completed });
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
            if (editing?.id === id) setEditing(null);
        } catch (e) {
            setError('Failed to delete task');
        }
    };

    const visibleTasks = tasks.filter((t) => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    const remaining = tasks.filter((t) => !t.completed).length;

    return (
        <div className="min-h-screen bg-slate-100 flex items-start justify-center px-4 py-10">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">Task Manager</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {remaining} of {tasks.length} tasks remaining
                    </p>
                </header>

                {error && (
                    <div className="mb-4 bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3">
                        {error}
                    </div>
                )}

                <TaskForm
                    onSubmit={editing ? (data) => handleUpdate(editing.id, data) : handleAdd}
                    editing={editing}
                    onCancelEdit={() => setEditing(null)}
                />

                <div className="flex gap-2 my-5" role="tablist" aria-label="Filter tasks">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition ${
                                filter === f
                                    ? 'bg-slate-800 text-white'
                                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p className="text-slate-500 text-center py-8">Loading tasks...</p>
                ) : visibleTasks.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">
                        No tasks here yet. Add one above!
                    </p>
                ) : (
                    <TaskList
                        tasks={visibleTasks}
                        onToggle={handleToggle}
                        onEdit={setEditing}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    );
}