import { useDraggable } from '@dnd-kit/core';
import React from 'react';

export default function Task({ task, moveTask, setEditingTask }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });
    const columns = ["Todo", "In-Progress", "Completed"];

    const handleEditClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setEditingTask(task);
    };

    const handleSelectChange = (e) => {
        e.stopPropagation();
        moveTask(task.id, e.target.value);
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="p-3 bg-white shadow mb-2 cursor-move w-full h-fit"
            style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "" }}
        >
            <p>{task.title}</p>
            <p>{task.dueOn}</p>
            <p>{task.status}</p>
            <p>{task.category}</p>
            <div className="flex justify-between">
                <select
                    onChange={handleSelectChange}
                    value={task.status}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {columns.map((col) => (
                        <option key={col} value={col}>
                            {col}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleEditClick}
                    onMouseDown={(e) => e.stopPropagation()}
                    type="button"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}
