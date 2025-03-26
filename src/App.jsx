import { useState } from "react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import Modal from "./components/Modal";
import Header from "./components/Header";
import { TiThMenuOutline } from "react-icons/ti";
import { MdOutlineInsertChart } from "react-icons/md";
import SearchAndFIlter from "./components/SearchAndFIlter";
import TaskList, { TaskHeader } from "./components/TaskList";


const columns = ["Todo", "In-Progress", "Completed"];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTab, setSelectedTab] = useState("List");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: uuidv4(), title: newTask, status: "Todo" }]);
    setNewTask("");
  };

  const updateTask = (id, title) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, title } : task)));
    setEditingTask(null);
  };

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active) {
      moveTask(active.id, over.id);
    }
  };

  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="p-5 relative bg-[#ffe]">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <Header />
            <div className="px-5 flex gap-5">
              <div className={"flex gap-1 items-center cursor-pointer " + (selectedTab === "List" ? "border-b-2 border-[#231F20D1] text-black" : "")} onClick={() => setSelectedTab("List")}>
                <TiThMenuOutline className="text-sm text-[#231F20D1] " /> <span className={"text-[#231F20D1] text-lg " + (selectedTab === "List" ? "text-black" : "")}>List</span>
              </div>
              <div className={"flex gap-1 items-center cursor-pointer " + (selectedTab === "Board" ? "border-b-2 border-[#231F20D1]" : "")} onClick={() => setSelectedTab("Board")}>
                <MdOutlineInsertChart className="text-md text-[#231F20D1] " /> <span className={"text-[#231F20D1] text-lg " + (selectedTab === "Board" ? "text-black" : "")}>Board</span>
              </div>
            </div>
            <SearchAndFIlter />
           { selectedTab === "List" && <TaskHeader />}
            <div className={`  ${selectedTab === "Board" ? "flex gap-5" : "w-full space-y-10"}`}>
              {columns.map(status => (
                <TaskList key={status} status={status} tasks={tasks} moveTask={moveTask} setEditingTask={setEditingTask} selectedTab={selectedTab} />
              ))}
            </div>

            <div className="mt-5">
              <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="New Task"
                className="border p-2 mr-2"
              />
              <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2">Add Task</button>
            </div>
            {editingTask && (
              <EditModal task={editingTask} updateTask={updateTask} close={() => setEditingTask(null)} />
            )}
          </SignedIn>
        </div>
      </DndContext>
    </ClerkProvider>
  );
}

function Column({ status, tasks, moveTask, setEditingTask }) {
  const { isOver, setNodeRef } = useDroppable({ id: status });
  return (
    <div ref={setNodeRef} className={`w-1/3 p-4 border ${isOver ? "bg-gray-200" : "bg-gray-100"}`}>
      <h2 className="font-bold mb-3">{status}</h2>
      {tasks.filter(task => task.status === status).map(task => (
        <Task key={task.id} task={task} moveTask={moveTask} setEditingTask={setEditingTask} />
      ))}
    </div>
  );
}
function Task({ task, moveTask, setEditingTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });
  const [openTask, setOpenTask] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    // Also prevent any default behavior
    e.preventDefault();
    setEditingTask(task);
  };

  const handleSelectChange = (e) => {
    e.stopPropagation();
    moveTask(task.id, e.target.value);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="p-3 bg-white shadow mb-2 cursor-move"
        style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "" }}
        onClick={(e) => { e.stopPropagation(); console.log(task) }}
      >
        <p>{task.title}</p>
        <div className="flex justify-between">
          <select
            onChange={handleSelectChange}
            value={task.status}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()} // Add this to prevent drag start
          >
            {columns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
          <button
            onClick={handleEditClick}
            onMouseDown={(e) => e.stopPropagation()} // Add this to prevent drag start
            type="button"
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
}


function EditModal({ task, updateTask, close }) {
  const [newTitle, setNewTitle] = useState(task.title);
  return (
    <Modal>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-5">
          <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="border p-2" />
          <button onClick={() => updateTask(task.id, newTitle)} className="bg-green-500 text-white p-2">Save</button>
          <button onClick={close} className="ml-2 bg-red-500 text-white p-2">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}
