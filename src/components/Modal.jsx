import React from 'react';
import { IoCloseOutline } from "react-icons/io5";

function Modal({ children }) {
  return (
    <div className='absolute left-0 top-0 inset-0 bg-opacity-50 flex items-center justify-center z-10 bg-white rounded-3xl'>
      {children}
    </div>
  );
}

function Header({ title, onClose }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <p>{title}</p>
      <IoCloseOutline onClick={onClose} className="text-2xl cursor-pointer" />
    </div>
  );
}

function Body({ children }) {
  return (
    <div className="p-4">
      {children}
    </div>
  );
}

function Footer({ onClose, onCreate }) {
  return (
    <div className="p-4 border-t">
      <button onClick={onClose} className=''>Cancel</button>
      <button onClick={onCreate}>Create</button>
    </div>
  );
}

// Attach Header as a static property
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
