import React from 'react'
import Modal from './Modal'
import { IoCloseOutline } from "react-icons/io5";


export default function AddModal() {
  return (
    <Modal>
      <Modal.Header title="Add New Task" onClose={() => console.log('close')} />
      <div className="p-4">
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Title" className="p-2 border border-gray-300 rounded-md" />
          <textarea placeholder="Description" className="p-2 border border-gray-300 rounded-md" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Add Task</button>
        </form>
      </div>
    </Modal>
  )
}
