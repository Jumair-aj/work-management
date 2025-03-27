import { useState } from "react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { DndContext } from "@dnd-kit/core";
import Header from "./components/Header";
import { TiThMenuOutline } from "react-icons/ti";
import { MdOutlineInsertChart } from "react-icons/md";
import SearchAndFIlter from "./components/SearchAndFIlter";
import TaskList, { TaskHeader } from "./components/TaskList";
import AddModal from "./components/AddModal";


const columns = ["Todo", "In-Progress", "Completed"];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTab, setSelectedTab] = useState("List");
  const [openAddModal, setOpenAddModal] = useState(false);


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
            <SearchAndFIlter setOpenAddModal={setOpenAddModal} />
            {selectedTab === "List" && <TaskHeader />}
            <div className={`  ${selectedTab === "Board" ? "flex gap-5 w-full lg:w-4/5" : " w-full space-y-10"}`}>
              {columns.map(status => (
                <TaskList key={status} status={status} tasks={tasks} moveTask={moveTask} setEditingTask={setEditingTask} selectedTab={selectedTab} />
              ))}
            </div>

            {editingTask && (
              <EditModal task={editingTask} updateTask={updateTask} close={() => setEditingTask(null)} />
            )}
          </SignedIn>
        </div>
      {openAddModal &&  <AddModal setOpenAddModal={setOpenAddModal} tasks={tasks} setTasks={setTasks} />}
      </DndContext>
    </ClerkProvider>
  );
}
