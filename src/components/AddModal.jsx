import React from "react";
import Modal from "./Modal";
import { v4 as uuidv4 } from "uuid";
import TextEditor from "./TextEditor";
import { useForm } from "react-hook-form";

export default function AddModal({ setOpenAddModal, setTasks, tasks }) {
  const { register, handleSubmit, watch, reset } = useForm();

  const onSubmit = (data) => {
    const newTask = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      category: data.option,
      dueDate: data.dueDate,
      status: data.status,
    };

    setTasks([...tasks, newTask]);
    setOpenAddModal(false);
    reset(); // Clear form after submission
    console.log("New Task:", newTask);
  };

  const selectedOption = watch("option");

  return (
    <Modal>
      <Modal.Header title="Create Task" onClose={() => setOpenAddModal(false)} />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="p-4 flex flex-col gap-4">

            {/* Task Title */}
            <input
              type="text"
              placeholder="Task Title"
              {...register("title", { required: true })}
              className="p-2 border border-gray-300 rounded-md placeholder:text-[#1E212A]/40 bg-[#F1F1F15C]"
            />

            {/* Task Description (Text Editor Output) */}
            <TextEditor {...register("description")} />

            {/* Task Options */}
            <div className="flex gap-4">
              {/* Task Category */}
              <div className="flex flex-col gap-2 w-1/3 text-sm">
                <span className="text-[#00000099]">Task Category*</span>
                <div className="flex gap-4">
                  {["Work", "Personal"].map((label) => (
                    <label
                      key={label}
                      className={`cursor-pointer px-4 py-2 rounded-full border transition-all duration-300 ${
                        selectedOption === label
                          ? "bg-[#7B1984] text-white"
                          : "bg-white text-black border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        value={label}
                        {...register("option", { required: true })}
                        className="hidden"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Due Date */}
              <div className="flex flex-col gap-2 w-1/3 text-sm">
                <span className="text-[#00000099]">Due on*</span>
                <input
                  type="date"
                  {...register("dueDate", { required: true })}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Task Status */}
              <div className="flex flex-col gap-2 w-1/3 text-sm">
                <span className="text-[#00000099]">Task Status*</span>
                <select
                  {...register("status", { required: true })}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="">Choose</option>
                  <option value="Todo">Todo</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

          </div>
        </Modal.Body>

        <Modal.Footer onClose={() => setOpenAddModal(false)}>
          <button
            type="submit"
            className="bg-[#7B1984] text-white px-4 py-2 rounded-md"
          >
            Create Task
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
