export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
    return (
        <li className="group flex items-start gap-3 bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task)}
                className="mt-1 h-5 w-5 accent-slate-800 cursor-pointer"
                aria-label={`Mark "${task.title}" as ${task.completed ? 'active' : 'completed'}`}
            />
            <div className="flex-1 min-w-0">
                <p
                    className={`text-slate-800 break-words ${
                        task.completed ? 'line-through text-slate-400' : ''
                    }`}
                >
                    {task.title}
                </p>
                {task.description && (
                    <p
                        className={`text-sm text-slate-500 break-words mt-0.5 ${
                            task.completed ? 'line-through text-slate-400' : ''
                        }`}
                    >
                        {task.description}
                    </p>
                )}
                <p className="text-xs text-slate-400 mt-1">
                    {new Date(task.createdAt).toLocaleString()}
                </p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                    onClick={() => onEdit(task)}
                    className="text-slate-500 hover:text-slate-800 cursor-pointer"
                    aria-label={`Edit ${task.title}`}
                    title="Edit"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                    aria-label={`Delete ${task.title}`}
                    title="Delete"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </li>
    );
}