import React, { useState } from 'react';

export default function StatusChange({ status, statusList, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleStatusClick = (newStatus) => {
        onChange(newStatus); // Call the passed function to update the status
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <p onClick={() => setIsOpen(!isOpen)} className="capitalize cursor-pointer bg-[#DDDADD] w-fit px-1.5 py-0.5 rounded mulish-medium font-medium">
                {status}
            </p>
            {isOpen && (
                <div className="w-full bg-[#F1F1F1] p-3 shadow absolute z-10 top-8 left-0 rounded-md flex flex-col gap-1">
                    {statusList.map((item) => (
                        <p
                            key={item}
                            onClick={() => handleStatusClick(item)}
                            className="capitalize text-md w-full cursor-pointer px-1.5 py-0.5 mulish-medium font-medium hover:bg-white"
                        >
                            {item}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
