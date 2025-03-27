import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import { PiDotsSixVertical } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import StatusChange from './StatusChange';

export default function Task({ task, moveTask, setEditingTask, selectedTab }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

    // Function to handle status change
    const handleStatusChange = (newStatus) => {
        moveTask(task.id, newStatus);
    };

    if (selectedTab === "List") {
        return (
            <div
                className="p-3 bg-white shadow mb-2 w-full h-fit grid grid-cols-4 gap-2 items-center text-sm"
                style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "" }}
            >
                <div className="flex gap-1 items-center">
                    <input type="checkbox" />
                    <div className="cursor-move" ref={setNodeRef} {...listeners} {...attributes}>
                        <PiDotsSixVertical />
                    </div>
                    <FaCircleCheck color={task.status === "Completed" ? '#1B8D17' : '#A7A7A7'} />
                    <p className={`mulish-medium font-medium ${task.status === "Completed" ? "line-through" : ""}`}>
                        {task.title}
                    </p>
                </div>
                <p className="mulish-medium font-medium">{task.dueDate}</p>
                <StatusChange
                    status={task.status}
                    statusList={["Todo", "In-Progress", "Completed"]}
                    onChange={handleStatusChange} // Pass the function
                />
                <p className="mulish-medium font-medium">{task.category}</p>
            </div>
        );
    }

    return (
        <div
            className="p-3 bg-white shadow mb-2 w-full h-fit flex flex-col gap-2 min-h-36 justify-between cursor-move"
            style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "" }}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            <div className="flex justify-between items-center">
                <p className={`mulish-bold font-bold ${task.status === "Completed" ? "line-through" : ""}`}>
                    {task.title}
                </p>
                <button>
                    <BsThreeDots />
                </button>
            </div>
            <div className="flex justify-between text-[10px] text-[#00000085] mulish-semibold">
                <p className="mulish-medium font-medium">{task.category}</p>
                <p className="mulish-medium font-medium">{task.dueDate}</p>
            </div>

            {/* Updated StatusChange component */}
            <StatusChange
                status={task.status}
                statusList={["Todo", "In-Progress", "Completed"]}
                onChange={handleStatusChange}
            />
        </div>
    );
}
