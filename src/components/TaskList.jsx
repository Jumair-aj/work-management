import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import Task from './Task';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

export default function TaskList({ status, tasks = [], moveTask, setEditingTask, selectedTab }) {
    const { isOver, setNodeRef } = useDroppable({ id: status });

    const filteredTasks = useMemo(() => tasks.filter((task) => task.status === status), [tasks, status]);

    return (
        <div className={`${selectedTab === "Board" ? "w-1/3" : "rounded-b-xl w-full space-y-10"}`}>
            <div ref={setNodeRef}
                className={`${isOver ? "bg-gray-200" : "bg-gray-100"} bg-[#F1F1F1] h-full ${selectedTab === "Board" ? "border border-[#58575112] rounded-xl bg-[#58575112] min-h-96 p-3 space-y-3" : "rounded-b-xl min-h-48"}`}
            >
                {/* Status Header */}
                <div
                    className={`mulish-semibold ${status === "Todo"
                        ? "bg-[#FAC3FF]"
                        : status === "In-Progress"
                            ? "bg-[#85D9F1]"
                            : "bg-[#CEFFCC]"
                        } ${selectedTab === "Board" ? "flex w-fit px-1 py-0.5 rounded-md text-[14px]" : "text-[15px] px-3 py-2 rounded-t-2xl h-fit"}`}
                >
                    <span>{status} ({filteredTasks.length})</span>
                </div>

                {/* Task List with Animation */}
                <div className="flex flex-col w-full h-full rounded-b-xl min-h-[inherit]">
                    <AnimatePresence>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <motion.div
                                    // key={`${task.id}-${status}`} // Ensures uniqueness across statuses
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15}}
                                >
                                    <Task
                                        task={task}
                                        moveTask={moveTask}
                                        setEditingTask={setEditingTask}
                                        selectedTab={selectedTab}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="m-auto flex justify-center items-center min-h-max"
                            >
                                No Tasks in {status}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}


export function TaskHeader() {
    return (
        <div className="grid text-[#00000099] grid-cols-4 gap-5 text-sm px-3 py-2">
            <p>Task name</p>
            <p>Due on</p>
            <p>Task Status</p>
            <p>Task Category</p>
        </div>
    );
}
