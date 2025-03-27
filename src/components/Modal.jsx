import React from 'react';
import { IoCloseOutline } from "react-icons/io5";

function Modal({ children }) {
  return (
    <div className='absolute left-0 top-0 inset-0  bg-black/20 flex items-center justify-center z-10  '>
      <div className="bg-white w-[700px] rounded-xl shadow-lg">
        {children}
      </div>
    </div>
  );
}

function Header({ title, onClose }) {
  return (
    <div className="flex justify-between items-center p-4 ">
      <p className='mulish-semibold text-xl'>{title}</p>
      <IoCloseOutline onClick={onClose} className="text-2xl cursor-pointer" />
    </div>
  );
}

function Body({ children }) {
  return (
    <div className="p-4 border-y border-[#0000001A]">
      {children}
    </div>
  );
}

function Footer({ onClose, onCreate }) {
  return (
    <div className="p-3 flex items-center justify-end gap-4 text-sm bg-[#F1F1F1] rounded-b-xl">
      <button onClick={onClose} className='rounded-full border hover:bg-[#7B1984]/75 hover:text-white transition-all duration-300 border-[#0000006B] px-4 py-2'>CANCEL</button>
      <button onClick={onCreate} className='rounded-full  hover:bg-transparent hover:text-black transition-all duration-300 bg-[#7B1984]/50 text-white px-4 py-2'>CREATE</button>
    </div>
  );
}

// Attach Header as a static property
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
